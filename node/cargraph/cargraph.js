/**
 * The constructor for the carGraph object that we use to perform rendering
 * and logic in a carGraph step
 * @constructor
 * @param node the step we are on
 * @param view the vle view
 */
function CARGRAPH(node) {
	//the step we are on
	this.node = node;
	
	//get the view from the node
	this.view = this.node.view;
	
	//the content for the step
	this.content = node.getContent().getContentJSON();
	
	// current dynamic image that is being graphed.
	this.currentDynamicImageId = null;
	
	/*
	 * a timestamp used for calculating the amount of time the carGraph has
	 * been collecting data. this is only updated in startCollecting() and
	 * dataReceived()
	 */
	this.timeCheck = null;
	
	/*
	 * the amount of time that the carGraph has been collecting data. this
	 * will be used as the x value (time) for the carGraph data.
	 */
	this.elapsedTime = 0;
	
	//the default 
	this.lockPredictionOnCollectionStart = false;
	
	if(node.studentWork != null) {
		//the student has work from previous visits to this step
		this.states = node.studentWork; 
	} else {
		//the student does not have any previous work for this step
		this.states = [];  
	};
	
	//the carGraph state that will contain the student work
	this.carGraphState = new CARGRAPHSTATE();
	
	// if there is a state from before, use that
	if(this.states != null && this.states.length > 0) {
		//get the last state in the states array
		this.carGraphState = this.states[this.states.length - 1];
	} 
	
	//flag to keep track of whether the student has change any axis range value this visit
	this.axisRangeChanged = false;
	
	if(this.content != null) {
		//get the graph parameters for displaying the data to the student
		this.graphParams = this.parseGraphParams(this.content.graphParams);
				
		if(this.content.lockPredictionOnCollectionStart != null) {
			//get whether to lock the prediction when the student starts collecting data
			this.lockPredictionOnCollectionStart = this.content.lockPredictionOnCollectionStart;			
		}
	}
	
	/*
	 * flag to keep track of whether the student has modified the graph
	 * by retrieving data from the carGraph
	 */
	this.graphChanged = false;
	
	/*
	 * used to store the plot variable returne from $.plot() so that we can access
	 * it from other functions
	 */
	this.globalPlot = null;
	
	/*
	 * flag to determine whether we need to clear the graph data when the student
	 * clicks the Start button. we want to clear the graph when they click the
	 * Start button the first time for each new visit of the step. subsequent
	 * clicks of the Start button during the same visit will cause the graph 
	 * data to append to the existing graph data.
	 */
	this.clearDataOnStart = true;
	
	//get the prediction from the previous step if there is a prevWorkNodeIds
	this.getPreviousPrediction();
	
	//default ids for our graph and graph checkboxes divs
	this.graphDivId = "graphDiv";
	this.graphCheckBoxesDivId = "graphCheckBoxesDiv";
	
	this.predictionLocked = false;
	
	if(this.carGraphState.predictionLocked) {
		//the prediction should be locked
		this.predictionLocked = true;
	}
	
	//the last point the student has clicked on
	this.lastPointClicked = null;
	
	//whether we want to show the correct graph
	this.showCorrectGraph = false;
};

/**
 * Render the carGraph step
 */
CARGRAPH.prototype.render = function() {
	// clear animation div and any dynamic Image radio that was rendered already
	$('#animationDiv').html("");
	
	$("#dynamicImageRadioDiv").html("");

	//set the prompt into the step
	$('#promptDiv').html(this.content.prompt);

	//set the graph title
	$('#graphTitle').html(this.content.graphTitle);

	//plot the carGraph data from the student's previous visit, if any
	this.plotData();

	//add the graph labels
	this.setupGraphLabels();

	//set the axis values
	this.setupAxisValues();

	//show the graph options if necessary
	this.showGraphOptions();

	//display the annotations, if any
	this.setupAnnotations();

	/*
	 * get the student's previous response, if any, and re-populate
	 * the response textarea with it
	 */
	var response = this.getResponseFromState();
	$("#responseTextArea").val(response);

	//set the size of the text area
	$("#responseTextArea").attr('rows', this.content.expectedLines);
	$("#responseTextArea").attr('cols', 80);
	
	if(this.predictionLocked) {
		//disable the prediction buttons
		this.disablePredictionButtons();
	}

	//display the starter sentence button if necessary
	this.displayStarterSentenceButton();

	/*
	 * used to determine if the student is click dragging on the graph
	 * for use when they are creating a prediction
	 */
	this.mouseDown = false;
	$("#" + this.graphDivId).bind('mousedown', {thisCarGraph:this}, (function(event) {
		event.data.thisCarGraph.mouseDown = true;
	}));
	$("#" + this.graphDivId).bind('mouseup', {thisCarGraph:this}, (function(event) {
		event.data.thisCarGraph.mouseDown = false;
	}));

	//listen for the keydown event
	$(window).bind("keydown", {thisCarGraph:this}, function(event) {
	    event.data.thisCarGraph.handleKeyDown(event);
	});
	
	//listen for the click event
	$(window).bind("click", {thisCarGraph:this}, function(event) {
		//check if the mouse is inside the graph div
	    if(!event.data.thisCarGraph.mouseInsideGraphDiv) {
	    	/*
	    	 * the mouse is outside the graph div so we will
	    	 * set the lastPointClicked to null. we need to do
	    	 * this because if the student clicked on a point
	    	 * on the graph and then decided to start typing
	    	 * their response and typed backspace while typing
	    	 * their response, it would delete the 
	    	 * lastPointClicked point. so now whenever the
	    	 * student clicks outside of the graph div we
	    	 * just clear the lastPointClicked so they won't
	    	 * accidentally delete a point on the graph.
	    	 */
	    	event.data.thisCarGraph.lastPointClicked = null;
	    }
	});
	
	//listen for the mouse enter event on the graphDiv
	$("#" + this.graphDivId).bind("mouseenter", {thisCarGraph:this}, function(event) {
		event.data.thisCarGraph.mouseInsideGraphDiv = true;
	});
	
	//listen for the mouse leave event on the graphDiv
	$("#" + this.graphDivId).bind("mouseleave", {thisCarGraph:this}, function(event) {
		event.data.thisCarGraph.mouseInsideGraphDiv = false;
	});
	
	/*
	 * used to hide or show the annotation tool tips. if the student has
	 * their mouse in the graph div we will hide the annotation tool tips
	 * so that they don't block them from clicking on the plot points.
	 * when the mouse cursor is outside of the graph div we will show the
	 * annotation tool tips for them to view.
	 */
	$("#" + this.graphDivId).bind('mouseover', (function(event) {
		$(".activeAnnotationToolTip").hide();
	}));
	$("#" + this.graphDivId).bind('mouseleave', (function(event) {
		$(".activeAnnotationToolTip").show();
	}));
	
	$("#" + this.graphDivId).bind("plothover", (function (event, pos) {
				$("#x").text(pos.x.toFixed(2));
				$("#y").text(pos.y.toFixed(2)); 
	}));

	// calculate how many pixels there are between the y ticks in the animation div
	this.yTickSize = 800 / this.content.graphParams.ymax;  

	//find the position of the graph div so we can display the message in the center of it
	var animationDivPosition = $('#animationDiv').position();
	
	//get the position that will show the message in the center of the graph div
	var animationDivTop = animationDivPosition.top;
	var animationDivLeft = animationDivPosition.left;
	
	// display the static images (e.g. houses and schools)
	for (var i=0; i < this.content.staticImages.length; i++) {
		var staticImage = this.content.staticImages[i];		
		var left = staticImage.tickIndex*this.yTickSize;
		$("#animationDiv").append("<img class='staticImage' style='left:"+left+"' src='"+staticImage.img+"'></img>" +
                "<span class='staticImageLabel' style='left: "+left+"'>"+staticImage.label+"</span>");
	}		
	
	// display the ticks in the animationDiv
	for (var i=parseInt(this.content.graphParams.ymin); i <= parseInt(this.content.graphParams.ymax); i++) {
		var yTickPosition = i*this.yTickSize;         // this tick's x position
		$("#animationDiv").append("<div style='position:absolute; top:" + (animationDivTop + 40) + "px; left:"+yTickPosition+"'>"+i+"</div>");
	}
	
	// display the dynamic images (e.g. cars)	
	var topSoFar = 75;  // offset from the top of the screen, to ensure that the images don't overlap
	for (var i=0; i< this.content.dynamicImages.length; i++) {
		var dynamicImage = this.content.dynamicImages[i];		
		$("#animationDiv").append("<img id='"+dynamicImage.id+"' style='top:"+ (animationDivTop + topSoFar) +"' class='dynamicImage' src='"+dynamicImage.img+"'></img>");
		
		// add radio input so students can choose which car they're drawing the graph for
		var checked = "";
		if (i==0) {
			this.setCurrentDynamicImageId(dynamicImage.id);
			checked = "checked";
		}
		$("#dynamicImageRadioDiv").append("<input class='dynamicImageRadio' name='dynamic' type='radio' "+checked+" onclick='dynamicImageChanged(\""+dynamicImage.id+"\")'>"+dynamicImage.graphLabel+"</input>");
		// increment topSoFar
		topSoFar += dynamicImage.height;
	}	
};

/**
 * Do one frame of the animation sequence. Loops through all of the
 * predictions graphs and moves the position of their corresponding images
 * in the animationDiv.
 * 
 * @param xValue the current value of the x-axis that is being animated.
 */
CARGRAPH.prototype.displayOneFrame = function(xValue) {		  
    for (var i=0; i<this.content.dynamicImages.length;i++) {
	    var dynamicImage = this.content.dynamicImages[i];
	    var predictionArr = this.getPredictionArrayByPredictionId(dynamicImage.id);
	    var yValue = this.getYValue(xValue,predictionArr);
	    var leftValue = yValue*this.yTickSize;
    	$("#"+dynamicImage.id).css("left",leftValue);
    	this.setCrosshair({x:xValue,y:yValue});  // show cross hair on current x
    }
};

/**
 * Given xValue, returns yValue of a prediction graph whose points are stored in
 * the given predictionArray.
 * 
 * Note that the predictionArray may not contain the given xValue.  For example, trying to find
 * the yValue in (3,?) when your predictionArray only contains 
 * [(1,2),(2,4),(7,3)]. In this case, algebra is used to calculate the y value.
 * 
 * @param xValue: x Value in the prediction graph
 * @param predictionArray: array of points for one prediction graph
 * @return: corresponding y-Value within the prediction graph.
 */ 
CARGRAPH.prototype.getYValue = function(xValue,predictionArray) {
    var xSoFar = 0;
    var ySoFar = 0;
    for (var i=0; i< predictionArray.length; i++) {
	    var prediction = predictionArray[i];  // prediction[0] = x, prediction[1] = y
	    if (prediction[0] < xValue) {
		    // x value not yet found, set ySoFar in case we'll need it for later
		    xSoFar = prediction[0];
		    ySoFar = prediction[1];				    
	    } else if (prediction[0] == xValue) {
		    // x match found, return it
		    return prediction[1];
	    } else {
		    // there was no xValue in the prediction. we've reached a xValue in the prediction array
		    // that is greater than xValue. 
		    // calculate using the power of Algebra
		    // magic formula: y2 = y1 + m(x2-x1)
		    // m = (y2-y1) / (x2-x1)
		    var slope = (prediction[1] - ySoFar) / (prediction[0] - xSoFar);
		    var yValue = ySoFar + slope * (xValue-xSoFar);
		    return yValue;
	    }
    }
    return -1;
};

/**
 * Given xValue, returns yValue of a prediction graph whose points are stored in
 * the given predictionArray.
 * 
 * Note that the predictionArray may not contain the given xValue.  For example, trying to find
 * the yValue in (3,?) when your predictionArray only contains 
 * [(1,2),(2,4),(7,3)]. In this case, algebra is used to calculate the y value.
 * 
 * @param xValue: x Value in the prediction graph
 * @param predictionArray: array of points for one prediction graph
 * @return: corresponding y-Value within the prediction graph.
 */ 
CARGRAPH.prototype.getYValueObj = function(xValue,predictionArray) {
    var xSoFar = 0;
    var ySoFar = 0;
    for (var i=0; i< predictionArray.length; i++) {
	    var prediction = predictionArray[i];  // prediction[0] = x, prediction[1] = y
	    if (prediction.x < xValue) {
		    // x value not yet found, set ySoFar in case we'll need it for later
		    xSoFar = prediction.x;
		    ySoFar = prediction.y;				    
	    } else if (prediction.x == xValue) {
		    // x match found, return it
		    return prediction.y;
	    } else {
		    // there was no xValue in the prediction. we've reached a xValue in the prediction array
		    // that is greater than xValue. 
		    // calculate using the power of Algebra
		    // magic formula: y2 = y1 + m(x2-x1)
		    // m = (y2-y1) / (x2-x1)
		    var slope = (prediction.y - ySoFar) / (prediction.x - xSoFar);
		    var yValue = ySoFar + slope * (xValue-xSoFar);
		    return yValue;
	    }
    }
    return -1;
};

/**
 * Get the latest student work for this step
 * @return the latest student work state object
 */
CARGRAPH.prototype.getLatestState = function() {
	//a new carGraph state will be returned if there are no states
	var latestState = new CARGRAPHSTATE();
	
	if(this.states != null && this.states.length > 0) {
		//get the last state in the states array
		latestState = this.states[this.states.length - 1];
	}
	
	return latestState;
};


/**
 * This is called when the student clears the data they have collected
 */
CARGRAPH.prototype.clearData = function() {
	//clear the data from the graph and annotations
	this.carGraphState.clearSensorData();
	
	//delete the annotations for the carGraph data
	this.carGraphState.removeSensorAnnotations();
	
	//remove the carGraph annotations text boxes and delete buttons from the UI
	this.deleteSensorAnnotationsFromUI();
	
	//remove the annotation tool tips for the carGraph data line from the UI
	this.removeAnnotationToolTipData();
	
	/*
	 * plot the graph again, there will be no carGraph data so the 
	 * graph will essentially be blank
	 */
	this.plotData();
	
	//reset the elapsed time
	this.elapsedTime = 0;
	
	//update the flag since the graph has been cleared
	this.graphChanged = true;
};

CARGRAPH.prototype.setCurrentDynamicImageId = function(dynamicImageId) {
	this.currentDynamicImageId = dynamicImageId;
};

/**
 * Get the previous response the student typed into the textarea
 * @return
 */
CARGRAPH.prototype.getPreviousResponse = function() {
	var previousResponse = "";
	
	//get the latest state
	var previousState = this.getLatestState();
	
	if(previousState != null) {
		//get the previous response
		previousResponse = previousState.response;
	}
	
	return previousResponse;
};

/**
 * Parse the graph parameters from the step content
 * @return an object we can use to pass to the flot graph to
 * specify how the graph should look
 */
CARGRAPH.prototype.parseGraphParams = function(contentGraphParams) {
	//create the object that will contain the graph params
	var graphParams = {};
	
	//create an xaxis object
	graphParams.xaxis = {};
	
	//create a yaxis object
	graphParams.yaxis = {};
	
	if(contentGraphParams != null) {
		if(contentGraphParams.xmin != null && contentGraphParams.xmin != "") {
			//set the xmin value
			graphParams.xaxis.min = contentGraphParams.xmin;
		}

		if(contentGraphParams.xmax != null && contentGraphParams.xmax != "") {
			//set the xmax value
			graphParams.xaxis.max = contentGraphParams.xmax;
		}

		if(contentGraphParams.ymin != null && contentGraphParams.ymin != "") {
			//set the ymin value
			graphParams.yaxis.min = contentGraphParams.ymin;
		}

		if(contentGraphParams.ymax != null && contentGraphParams.ymax != "") {
			//set the ymax value
			graphParams.yaxis.max = contentGraphParams.ymax;
		}
		
	}
	
	/*
	 * if the carGraph state contains axis values it will override
	 * the axis values from the content
	 */
	if(this.carGraphState != null) {
		if(this.carGraphState.xMin != null) {
			//set the xmin value from the carGraph state
			graphParams.xaxis.min = this.carGraphState.xMin;
		}
		
		if(this.carGraphState.xMax != null) {
			//set the xmax value from the carGraph state
			graphParams.xaxis.max = this.carGraphState.xMax;
		}
		
		if(this.carGraphState.yMin != null) {
			//set the ymin value from the carGraph state
			graphParams.yaxis.min = this.carGraphState.yMin;
		}
		
		if(this.carGraphState.yMax != null) {
			//set the ymax value from the carGraph state
			graphParams.yaxis.max = this.carGraphState.yMax;
		}
	}
	
	//turn lines and points on
	graphParams.series = {lines:{show:true}, points:{show:true}};
	
	//allow points to be hoverable and clickable
	graphParams.grid = {hoverable:true, clickable:true};
	
	graphParams.crosshair = { mode: "x" };
	return graphParams;
};

/**
 * Get the graphParams object that we will pass to the flot
 * graph to specify how the graph should look
 * @return
 */
CARGRAPH.prototype.getGraphParams = function() {
	//parse the graph params
	this.graphParams = this.parseGraphParams(this.content.graphParams);
	
	return this.graphParams;
};

/**
 * Save the student work for this step. This includes the carGraph
 * data and the response the student typed. 
 */
CARGRAPH.prototype.save = function() {
	//get the response the student typed
	var response = ""
	
	//get the previous student work
	var latestState = this.getLatestState();
	var previousResponse = '';
	
	if(latestState != null) {
		//get the previous response
		var previousResponse = latestState.response;
	}
	
	/*
	 * check that the student has changed the response or the graph or any annotations
	 */
	if(response != previousResponse || this.graphChanged || this.annotationsChanged || this.axisRangeChanged) {
		//set the student response into the state
		this.carGraphState.response = response;
			
		//fire the event to push this state to the global view.states object
		eventManager.fire('pushStudentWork', this.carGraphState);

		//push the state object into the local copy of states
		this.states.push(this.carGraphState);		
	}
	
	/*
	 * changes have been saved or there were no changes so we will reset
	 * the flag back to false
	 */
	this.graphChanged = false;
	this.annotationsChanged = false;
	this.axisRangeChanged = false;
};

/**
 * Get the response the student wrote
 * @return the text in the textarea
 */
CARGRAPH.prototype.getResponseFromTextArea = function() {
	//get the textarea
	var responseTextArea = document.getElementById('responseTextArea');
	
	//get the text in the textarea
	return responseTextArea.value;
};

/**
 * Get the response from the carGraph state
 * @return the response text from the current carGraph state
 */
CARGRAPH.prototype.getResponseFromState = function() {
	var response = "";
	
	//get the latest state
	var state = this.carGraphState;
	
	if(state != null) {
		//get the response
		response = state.response;
	}
	
	return response;
};

/**
 * Plot the data onto the graph so the student can see it.
 * @param graphDivId the id of the div we will use to plot the graph
 * @param graphCheckBoxesDivId the id of the div we will put the filter check boxes in
 */
CARGRAPH.prototype.plotData = function(graphDivId, graphCheckBoxesDivId) {
	if(graphDivId == null) {
		//this will be the default graphDivId if none is provided as an argument
		graphDivId = this.graphDivId;
	}
	
	//set the graph div id so it can be accessed later by other functions
	this.graphDivId = graphDivId;
	
	if(graphCheckBoxesDivId == null) {
		//this will be the default graphCheckBoxesDivId if none is provided as an argument
		graphCheckBoxesDivId = "graphCheckBoxesDiv";
	}
	
	//set the graph check boxes div id so it can be accessed later by other functions
	this.graphCheckBoxesDivId = graphCheckBoxesDivId;
	
	//get the graph params
	var graphParams = this.getGraphParams();
	
	//create the data sets array
	var dataSets = [];

	/*
	 * check if we want to show the correct graph. this will be used
	 * in the grading tool
	 */
	if(this.showCorrectGraph) {
		//get the cars that are used in this car graph step
		var dynamicImages = this.content.dynamicImages;
		
		//get the expected results
		var expectedResults = this.content.expectedResults;
		
		//loop through all the cars that are used in this step
		for(var x=0; x<dynamicImages.length; x++) {
			//get a car
			var dynamicImage = dynamicImages[x];
			
			//loop through all the expected results
			for(var y=0; y<expectedResults.length; y++) {
				//get an expected result
				var expectedResult = expectedResults[y];
				
				if(dynamicImage != null && expectedResult != null) {
					//check if we have found an expected result for the car that is used in this step
					if(dynamicImage.id == expectedResult.id) {
						//get the array of correct points so we can plot them
						var expectedPoints = this.convertToPlottableArray(expectedResult.expectedPoints);
						
						//get the graph line label
						var graphLabel = "Correct " + dynamicImage.graphLabel;
						
						/*
						 * get the graph line name. we will just convert the graphLabel to
						 * have no white space and change the first character to lower case
						 * e.g.
						 * Correct Green Car
						 * to
						 * correctGreenCar
						 */
						var graphName = graphLabel.replace(/\s/g, '');
						graphName = graphName.charAt(0).toLowerCase() + graphName.substring(1, graphName.length);

						if(expectedPoints != null) {
							//add the line that will show the correct points
							dataSets.push({data:expectedPoints, label:graphLabel, color:"blue", name:graphName});			
						}
					}
				}
			}
		}
	}
	
	// get the prediction arrays for each dynamic image
	for (var i=0; i< this.content.dynamicImages.length; i++) {
		var dynamicImage = this.content.dynamicImages[i];		
		
		var predictionsForThisDynamicImage = [];

		// get the corresponding predictions array
		var predictionArray = this.getPredictionArrayByPredictionId(dynamicImage.id);

		var checked=false;
		if (this.currentDynamicImageId == dynamicImage.id) {
			checked=true;
		}

		dataSets.push({data:predictionArray, label:dynamicImage.graphLabel, color:dynamicImage.graphColor, name:dynamicImage.id, checked:checked});
	}

	//set the data set to a global variable so we can access it in other places
	this.globalDataSets = dataSets;

	//plot the data onto the graph
	this.globalPlot = $.plot($("#" + graphDivId), dataSets, graphParams);

	//delete all the annotation tool tips from the UI
	this.removeAllAnnotationToolTips();

	//highlight the points on the graph that the student has create annotations for
	this.highlightAnnotationPoints(null, null, dataSets);

	//setup the graph so that when the student hovers over a point it displays the values in a tooltip
	this.setupPlotHover();
	
	//setup the graph so that when the student clicks on a point, it creates an annotation
	this.setupPlotClick();
};

/**
 * Draws crosshair on the graph on the specified coordinates.
 */
CARGRAPH.prototype.setCrosshair = function(pos) {
	this.globalPlot.setCrosshair(pos);
};

/**
 * Clears the crosshair from the graph
 */
CARGRAPH.prototype.clearCrosshair = function(pos) {
	this.globalPlot.clearCrosshair();
};

/**
 * Setup the graph so that when the student mouseovers a point it displays
 * the x,y values for that point.
 */
CARGRAPH.prototype.setupPlotHover = function() {
	$("#" + this.graphDivId).unbind("plothover");
	
    var previousPoint = null;
    
    /*
     * bind this function to the plothover event. the thisCarGraph object
     * will be passed into the function and accessed through event.data.thisCarGraph
     */
    $("#" + this.graphDivId).bind("plothover", {thisCarGraph:this}, function (event, pos, item) {
    	//get the position of the mouse in the graph
    	var plotHoverPositionX = pos.x.toFixed(2);
    	var plotHoverPositionY = pos.y.toFixed(2);

    	//get the x units
    	var graphXUnits = "min";
    	
    	//get the y units
    	var graphYUnits = "km";
    	
    	//display the position e.g. (10.52 min, 4.34 km)
    	var plotHoverPositionText = "(" + plotHoverPositionX + " " + graphXUnits + ", " + plotHoverPositionY + " " + graphYUnits + ")";
    	$('#plotHoverPosition').html(plotHoverPositionText); 

        if (item) {
            if (previousPoint != item.datapoint) {
                previousPoint = item.datapoint;
                
                //remove the existing tooltip
                $("#tooltip").remove();
                
                //get the x and y values from the point the mouse is over
                var x = parseFloat(item.datapoint[0].toFixed(2));
                var y = parseFloat(item.datapoint[1].toFixed(2));
                
        		//get the x and y values
        		var dataPointObject = {
        				x:item.datapoint[0],
        				y:item.datapoint[1]
        		};
        		
        		//get the offset of the points relative to the plot div
                var offsetObject = event.data.thisCarGraph.globalPlot.pointOffset(dataPointObject);
        		var plotOffsetX = offsetObject.left;
        		var plotOffsetY = offsetObject.top;
                
                //get the units for the x and y values
                var xUnits = event.data.thisCarGraph.content.graphParams.xUnits;
                var yUnits = event.data.thisCarGraph.content.graphParams.yUnits;
                
                //create the text that we will display in the tool tip
                var toolTipText = item.series.label + ": " + x + " " + xUnits + ", " + y + " " + yUnits;
                
                //display the tool tip
                event.data.thisCarGraph.showTooltip(plotOffsetX, plotOffsetY, toolTipText);
            }
        } else {
        	//remove the tool tip
            $("#tooltip").remove();
            previousPoint = null;            
        }
        
        //check if the student is click dragging to create prediction points
        if(event.data.thisCarGraph.mouseDown) {
        	if(!event.data.thisCarGraph.predictionLocked) {
        		// allow author to enable or disable draw while dragging
        		if (event.data.thisCarGraph.content.allowDragDraw) {
					//add prediction point
					event.data.thisCarGraph.predictionReceived(pos.x, pos.y);
					
					//plot the graph again so the new point is displayed
					event.data.thisCarGraph.plotData();        		
				}
        	}
        }
    });
};

/**
 * Display the tool tip for the point on the graph the student has their mouse over.
 * @param x the x position to display the tool tip at
 * @param y the y position to display the tool tip at
 * @param toolTipText the text to display in the tool tip
 */
CARGRAPH.prototype.showTooltip = function(x, y, toolTipText) {
    $('<div id="tooltip">' + toolTipText + '</div>').css( {
        position: 'absolute',
        //display: 'none',
        top: y + 20,
        left: x + 20,
        border: '1px solid #fdd',
        padding: '2px',
        'background-color': '#fee',
        opacity: 0.8
    }).appendTo("#" + this.graphDivId).fadeIn(200);
};

/**
 * Setup the graph so that when the student clicks on a data point it creates
 * an annotation.
 */
CARGRAPH.prototype.setupPlotClick = function() {
	$("#" + this.graphDivId).unbind("plotclick");
	
	/*
	 * bind the plotclick event to this function. the thisCarGraph object
	 * will be passed into the function and accessed through event.data.thisCarGraph
	 */
    $("#" + this.graphDivId).bind("plotclick", {thisCarGraph:this}, function (event, pos, item) {
        if (item) {
        	//student has clicked on a point
        	
        	// if the point is not on a series that is currently selected, do nothing
        	if (item.series.name != event.data.thisCarGraph.currentDynamicImageId) {
        		return;
        	}
        	
            //get the name of the graph line
            var seriesName = item.series.name;
            
        	if(seriesName.indexOf("prediction") == -1 || !event.data.thisCarGraph.predictionLocked) {
        		/*
        		 * the plot line that was clicked was not a prediction line
        		 * or create prediction is enabled. this is just to prevent
        		 * modification of the prediction if create prediction is 
        		 * disabled
        		 */
        		
            	//highlight the data point that was clicked
                event.data.thisCarGraph.globalPlot.highlight(item.series, item.datapoint);
                
                //get the index of the point for the graph line
                var dataIndex = item.dataIndex;
                
                //get the data point x,y values
                var dataPoint = item.datapoint;
                
                //create an annotation
                event.data.thisCarGraph.createAnnotation(seriesName, dataIndex, dataPoint);
                
                //get the x value
                var x = dataPoint[0];
                
            	//remember the data for the point that was clicked
                event.data.thisCarGraph.lastPointClicked = {
            		seriesName:seriesName,
            		dataIndex:dataIndex,
            		x:x
            	};
        	}
        } else {
        	//student has clicked on an empty spot on the graph
        	
        	//check if this step allows the student to create a prediction
        	if(!event.data.thisCarGraph.predictionLocked) {
        		//create the prediction point
        		event.data.thisCarGraph.predictionReceived(pos.x, pos.y);
        		
        		//plot the graph again so the point is displayed
            	event.data.thisCarGraph.plotData();
        	}
        }
    });
};

/**
 * Setup the plot filter so students can turn on/off the different
 * lines in the graph when there is more than one line displayed
 */
CARGRAPH.prototype.setupPlotFilter = function() {
    //get the div where we display the checkboxes
    var graphCheckBoxesDiv = $("#" + this.graphCheckBoxesDivId);
    
    //get the graph params
    var graphParams = this.getGraphParams();
    
    /*
     * save this into thisCarGraph so that the filterDataSets can access it
     * since the context within filterDataSets will be different when
     * it gets called
     */
    var thisCarGraph = this;
    
    /*
     * Filters the graph lines depending on which ones are checked in the options
     */
    function filterDataSets() {
    	//the array that will contain the graph lines we want to display
    	var dataToDisplay = [];

    	//get all the data sets
    	var dataSets = thisCarGraph.globalDataSets;

    	if(graphCheckBoxesDiv.length == 0) {
    		//we could not find the checkboxes div so we will just display all the graph lines
    		dataToDisplay = dataSets;
    	} else {
    		//we found the checkboxes div so we will filter graph lines
    		
    		//get all the check boxes that were checked
        	graphCheckBoxesDiv.find("input:checked").each(function() {
        		//get the name of the graph line
        		var index = $(this).attr("name");
        		
        		//make sure that graph line exists
        		if(index && dataSets[index]) {
        			//put the graph line into the array to display
        			dataToDisplay.push(dataSets[index]);
        		}
        	});	
    	}

    	//display the graph lines that we want to display
    	thisCarGraph.globalPlot = $.plot($("#" + thisCarGraph.graphDivId), dataToDisplay, graphParams);
    	
    	//delete all the annotation tool tips form the UI
    	thisCarGraph.removeAllAnnotationToolTips();
    	
    	//highlight the points that have annotations
    	thisCarGraph.highlightAnnotationPoints(null, null, dataToDisplay);
    }
    
    //check if we have created the check boxes
    if(graphCheckBoxesDiv.html() == "") {
    	//we have not created the check boxes
    	
    	//loop through all the data sets and create a check box for each
    	$.each(this.globalDataSets, function(index, val) {
    		var checked = "";
    		
    		//check if we should the check box for this data set should be initially checked
    		if(val.checked) {
    			checked = "checked='checked'";
    		}
    		
    		//add the check box
	    	graphCheckBoxesDiv.append("<br><input type='checkbox' name='" + index + "' " + checked + " id='graphOption" + index + "' />");
	    	
	    	//add the name of the data set next to the check box
	    	graphCheckBoxesDiv.append("<label for='graphOption" + index + "'>" + val.label + "</label>");
	    });
    	
    	//have the filterDataSets be called when any of the check boxes are clicked
    	graphCheckBoxesDiv.find("input").click(filterDataSets);
    }
    
    //filter the data sets
    filterDataSets();
};

/**
 * Add the annotations to the UI
 */
CARGRAPH.prototype.setupAnnotations = function() {
	/*
	 * clear any existing annotations, this is needed when the student
	 * clicks on the current step again in the left nav menu because
	 * the html does not get cleared but render() gets called again
	 */
	$("#graphAnnotationsDiv").html("");

	//get the annotations
	var annotationArray = this.carGraphState.annotationArray;
	
	//loop through all the annotations
	for(var i=0; i<annotationArray.length; i++) {
		//get an annotation
		var annotation = annotationArray[i];
		
		//get the x and y values of the annotation
		var x = annotation.x;
		var y = annotation.y;
		
		//get the name of the graph line
		var seriesName = annotation.seriesName;
		
		//get the series
		var series = this.getSeriesByName(this.globalPlot, seriesName);
		
		//get the index of the point on the graph line
		var dataIndex = annotation.dataIndex;
		
		if(series != null) {
			//get the data index with the given x value
			var dataIndexAtX = this.getDataIndexAtX(series, x);
			
			if(dataIndexAtX != null) {
				/*
				 * use the data index at x if it is not null, this will be null for old data
				 * since old data does not store x values in the annotation
				 */
				dataIndex = dataIndexAtX;
			}
		}
		
		//get the data text which contains the x,y values
		var dataText = annotation.dataText;
		
		//get the text the student wrote for the annotation
		var annotationText = annotation.annotationText;
		
		//add the annotation to the UI
		this.addAnnotationToUI(seriesName, dataIndex, x, y, dataText, annotationText);
	}
};

/**
 * Highlight the points that have annotations
 * @param carGraphState
 * @param plot
 * @param dataSets the data sets currently displayed on the graph
 */
CARGRAPH.prototype.highlightAnnotationPoints = function(carGraphState, plot, dataSets) {
	if(carGraphState == null) {
		//use this.carGraphState as the default carGraph state if carGraphState was note provided
		carGraphState = this.carGraphState;
	}
	
	if(plot == null) {
		//use this.globalPlot as the default if plot was not provided
		plot = this.globalPlot;
	}
	
	//get the annotations
	var annotationArray = carGraphState.annotationArray;
	
	//loop through all the annotations
	for(var i=0; i<annotationArray.length; i++) {
		//get an annotation
		var annotation = annotationArray[i];
		
		//get the name of the graph line
		var seriesName = annotation.seriesName;
		
		if(dataSets != null) {
			//check if the annotation is on one of the data sets that are currently displayed
			if(!this.dataSetContainsName(dataSets, seriesName)) {
				/*
				 * it is not from one of the currently displayed data sets
				 * so we do not need to display this annotation
				 */
				continue;
			}
		}
		
		//get the index of the point on the graph line
		var dataIndex = annotation.dataIndex;
		
		//get the x and y values
		var x = annotation.x;
		var y = annotation.y;
		
		//get the graph line
		var series = this.getSeriesByName(plot, seriesName);
		
		if(series != null) {
			//add the annotation tool to tip the UI
			this.addAnnotationToolTipToUI(seriesName, dataIndex, x, y, annotation.annotationText);
		}
	}
};

/**
 * Get the graph line object given the plot object and the name
 * of the graph line
 * @param plot the plot object returned from $.plot()
 * @param seriesName the name of the graph line
 * @return the grapha line object (aka series)
 */
CARGRAPH.prototype.getSeriesByName = function(plot, seriesName) {
	//get the array that contains all the graph line objects
	var seriesArray = plot.getData();
	
	//loop through all the graph lines
	for(var x=0; x<seriesArray.length; x++) {
		//get a graph line
		var series = seriesArray[x];
		
		//compare the graph line name
		if(series.name == seriesName) {
			//the name matches so we have found the graph line we want
			return series;
		}
	}
	
	return null;
};

/**
 * Add the annotation to the UI
 * @param seriesName the name of the graph line
 * @param dataIndex the index on the graph line for the data point
 * @param dataText the text containing the x,y values of the data point
 * @param annotationText the text the student wrote for the annotation
 */
CARGRAPH.prototype.addAnnotationToUI = function(seriesName, dataIndex, x, y, dataText, annotationText) {
	//create the html that will represent the annotation
	var annotationHtml = "";
	
	//the class we will give to the annotation div
	var annotationClass = "";
	
	//whether we will allow the student to edit the annotation
	var enableEditing = "";
	
	if(seriesName.indexOf("prediction") != -1 && this.predictionLocked) {
		/*
		 * the annotation is for the prediction line and create prediction
		 * is disabled so we will not allow them to edit this annotation
		 */
		enableEditing = "disabled";
	}
	
	//get the series name we will use in the DOM
	var domSeriesName = this.getDOMSeriesName(seriesName);
	
	//set the class determined by whether this annotation is for carGraph data or prediction
	if(seriesName.indexOf("prediction") != -1) {
		annotationClass = "predictionAnnotation";
	} else {
		annotationClass = "carGraphAnnotation";
	}
	
	//get the x value we will use in the DOM id
	var domXValue = this.getDOMXValue(x);
	
	annotationHtml += "<div id='" + domSeriesName + domXValue + "AnnotationDiv' class='" + annotationClass + "'>";
	
	//add the annotation text label that displays the x,y values for the point
	annotationHtml += "<p id='" + domSeriesName + domXValue + "AnnotationDataText' style='display:inline'>" + seriesName + " [" + dataText + "]: </p>";
	
	//add the text input where the student can type
	annotationHtml += "<input id='" + domSeriesName + domXValue + "AnnotationInputText' type='text' class='predictionTextInput' value='" + annotationText + "' onchange='editAnnotation(\"" + seriesName + "\", " + x + ")' size='50' " + enableEditing + "/>";
	
	//add the delete button to delete the annotation
	annotationHtml += "<input id='" + domSeriesName + domXValue + "AnnotationDeleteButton' type='button' class='predictionDeleteButton' value='Delete' onclick='deleteAnnotation(\"" + seriesName + "\", " + dataIndex + ", " + x + ")' " + enableEditing + "/>";
	annotationHtml += "</div>";
	
	//add the annotation html to the div where we put all the annotations
	$("#graphAnnotationsDiv").append(annotationHtml);
};

/**
 * Delete the annotation html for the given annotation
 * @param seriesName the name of the graph line
 * @param x the x value for the data point
 */
CARGRAPH.prototype.deleteAnnotationFromUI = function(seriesName, x) {
	//get the series name with spaces replaced with underscores
	var domSeriesName = this.getDOMSeriesName(seriesName);
	
	//get the x value we will use in the DOM id
	var domXValue = this.getDOMXValue(x);
	
	//remove the annotation from the UI
	$("#" + domSeriesName + domXValue + "AnnotationDiv").remove();
};

/**
 * Delete all the annotations from the annotation div
 */
CARGRAPH.prototype.deleteAllAnnotationsFromUI = function() {
	$("#graphAnnotationsDiv").html("");
};

/**
 * Delete the carGraph annotations from the UI
 */
CARGRAPH.prototype.deleteSensorAnnotationsFromUI = function() {
	$(".carGraphAnnotation").remove();
};

/**
 * Delete the prediction annotations from the UI
 */
CARGRAPH.prototype.deletePredictionAnnotationsFromUI = function() {
	$(".predictionAnnotation").remove();
};

/**
 * Create a new annotation in the carGraph state and also in the html UI
 * @param seriesName the name of the graph line
 * @param dataIndex the index on the graph line for the data point
 * @param dataPoint the x, y data point in an array [x,y]
 */
CARGRAPH.prototype.createAnnotation = function(seriesName, dataIndex, dataPoint) {
	//get the y units
	var graphYUnits = this.content.graphParams.yUnits;
	
	//get the x units
	var graphXUnits = this.content.graphParams.xUnits;
	
	//get the x and y values
	var x = dataPoint[0];
	var y = dataPoint[1];
	
	//get the text representation of the data point
	var dataText = x + " " + graphXUnits + ", " + y + " " + graphYUnits;
	
	//check if there is already an annotation for the given point
	var annotation = this.carGraphState.getAnnotationBySeriesXValue(seriesName, x);
	
	if(annotation == null) {
		/*
		 * if this carGraph state contains old data it will not have 
		 * an x value so we will have to search using the data index
		 */
		annotation = this.carGraphState.getAnnotationBySeriesDataIndex(seriesName, dataIndex);
	}
	
	if(annotation == null) {
		//annotation does not exist for this point so we will make it
		
		//add the annotation to the UI
		this.addAnnotationToUI(seriesName, dataIndex, x, y, dataText, "");
		
		//add the annotation to the carGraph state
		this.carGraphState.addAnnotation(seriesName, dataIndex, x, y, dataText);
		
		//set this flag so we know that we will need to save student data since it has changed
		this.annotationsChanged = true;
		
		//add the annotation tool tip to the UI
		this.addAnnotationToolTipToUI(seriesName, dataIndex, x, y, "");
	} else {
		//annotation already exists for this point
		//TODO: highlight the annotation row in the #graphAnnotationsDiv
	}
};

/**
 * Delete the annotation from the UI and the carGraph state
 * @param seriesName the name of the graph line
 * @param dataIndex the index of the point in the line
 * @param x the index on the graph line for the data point
 */
CARGRAPH.prototype.deleteAnnotation = function(seriesName, dataIndex, x) {
	//delete the annotation from the UI
	this.deleteAnnotationFromUI(seriesName, x);
	
	//delete the annotation from the carGraph state
	this.carGraphState.deleteAnnotation(seriesName, x);
	
	//get the graph line
	var series = this.getSeriesByName(this.globalPlot, seriesName);
	
	if(series != null) {
		//remove the highlight on the point on the graph that this annotation was for
		this.globalPlot.unhighlight(series, dataIndex);		
	}
	
	//get the x value we will use in the DOM id
	var domXValue = this.getDOMXValue(x);
	
	//delete the annotation tool tip from the UI
	var domSeriesName = this.getDOMSeriesName(seriesName);
	$("#" + this.graphDivId + "_annotationToolTip_" + domSeriesName + domXValue).remove();
	
	//set this flag so we know that we will need to save student data since it has changed
	this.annotationsChanged = true;
};

/**
 * The student has edited the annotation text for the annotation so
 * we will update it in the carGraph state annotation
 * @param seriesName the name of the graph line
 * @param x the x value for the data point
 * @param annotationText the text the student has written
 */
CARGRAPH.prototype.editAnnotation = function(seriesName, x, annotationText) {
	//update the annotation in the carGraph state
	this.carGraphState.editAnnotation(seriesName, x, annotationText);
	
	var domSeriesName = this.getDOMSeriesName(seriesName);
	
	var domXValue = this.getDOMXValue(x);
	
	var annotationToolTipDivId = this.graphDivId + '_annotationToolTip_' + domSeriesName + domXValue;
	
	//update the annotation tool tip on the graph
	$("#" + annotationToolTipDivId).html(annotationText);
	
	if(annotationText != null && annotationText != "") {
		//show the annotation tool tip on the graph
		$('#' + annotationToolTipDivId).show();
		$('#' + annotationToolTipDivId).addClass("activeAnnotationToolTip").removeClass("hiddenAnnotationToolTip");
	} else {
		//hide the annotation tool tip on the graph if the annotation text is ""
		$('#' + annotationToolTipDivId).hide();
		$('#' + annotationToolTipDivId).addClass("hiddenAnnotationToolTip").removeClass("activeAnnotationToolTip");
	}
	
	//set this flag so we know that we will need to save student data since it has changed
	this.annotationsChanged = true;
};

/**
 * Set the labels for the graph
 */
CARGRAPH.prototype.setupGraphLabels = function() {
	if(this.content.graphParams != null) {
		//get the x and y labels
		var xLabel = "";
		if(this.content.graphParams.xlabel) {
			xLabel = this.content.graphParams.xlabel;	
		}
		
		var yLabel = "";
		if(this.content.graphParams.ylabel) {
			yLabel = this.content.graphParams.ylabel;
		}
		
		//set the y label
		$('#yLabelDiv').html(yLabel);
		
		//set the x label
		$('#xLabelDiv').html(xLabel);
	}
};

/**
 * Display the starter sentence button if the author has specified to
 * do so
 */
CARGRAPH.prototype.displayStarterSentenceButton = function() {
	if(this.content.starterSentence) {
		if(this.content.starterSentence.display == "0") {
			//do not show the starter sentence button
			$('#showStarterSentenceButtonDiv').hide();
		} else if(this.content.starterSentence.display == "1" || this.content.starterSentence.display == "2") {
			//show the starter sentence button
			$('#showStarterSentenceButtonDiv').show();

			if(this.content.starterSentence.display == "2") {
				//automatically populate the response box with the starter sentence
				
				//check if the student has submitted a response before
				if(this.states == null || this.states.length == 0) {
					/*
					 * the student has not submitted a response before so this
					 * is the first time they are visiting the step. we will
					 * populate the response textarea with the starter sentence
					 */
					var starterSentence = this.content.starterSentence.sentence;
					
					/*
					 * there should be nothing in the textarea but we will just
					 * append the starter sentence just in case so that we don't
					 * risk overwriting the text that is already in there
					 */
					var response = $("#responseTextArea").val();
					response += starterSentence;
					$("#responseTextArea").val(response);
				}
			}
			
		}
	}
};

/**
 * Append the starter sentence to the response textarea
 */
CARGRAPH.prototype.showStarterSentence = function() {
	if(this.content.starterSentence) {
		//get the starter sentence
		var starterSentence = this.content.starterSentence.sentence;
		
		//append the starter sentence to the text in the textarea
		var response = $("#responseTextArea").val();
		response += starterSentence;
		$("#responseTextArea").val(response);
	}
};

/**
 * Show the graph check box options if the author has specified to
 */
CARGRAPH.prototype.showGraphOptions = function() {
	if(this.content.showGraphOptions) {
		//show the graph options
		$('#graphCheckBoxesDiv').show();
	} else {
		//do not show the graph options
		$('#graphCheckBoxesDiv').hide();
	}
};

/**
 * The student has changed the axis range so we will obtain those
 * values and plot the graph again
 */
CARGRAPH.prototype.updateAxisRange = function() {
	if (this.content.graphParams.allowUpdateAxisRange) {
		//set this flag so we know the carGraph state has changed
		this.axisRangeChanged = true;

		//get all the values from the text box inputs
		var xMin = $('#xMinInput').val();
		var xMax = $('#xMaxInput').val();
		var yMin = $('#yMinInput').val();
		var yMax = $('#yMaxInput').val();
		
		//check if the limit values are valid
		if(!this.areLimitsValid(xMin, xMax, yMin, yMax, true, true)) {
			/*
			 * at least one of the values is not valid so we will
			 * return without saving any of the values.
			 */
			return;
		}
		
		//set the value into the carGraph state
		this.carGraphState.xMin = xMin;
		this.carGraphState.xMax = xMax;
		this.carGraphState.yMin = yMin;
		this.carGraphState.yMax = yMax;

		//parse the graph params again to obtain the new values in the graph params
		this.graphParams = this.parseGraphParams(this.content.graphParams);

		//plot the graph again
		this.plotData();
	}
};


/**
 * Check if the axis limits are valid. Makes sure the values are numbers
 * and also that the min values are less than the max values
 * @param xMin the x min value
 * @param xMax the x max value
 * @param yMin the y min value
 * @param yMax the y max value
 * @param resetInvalidValues whether to reset the values that are invalid
 * @param enableAlert whether to display the alert message with feedback
 */
CARGRAPH.prototype.areLimitsValid = function(xMin, xMax, yMin, yMax, resetInvalidValues, enableAlert) {
	var result = true;
	
	if(isNaN(Number(xMin))) {
		if(enableAlert) {
			//x min is not a number
			alert("Error: x min is not a number");			
		}
		
		if(resetInvalidValues) {
			//reset the x min value
			this.resetXMin();			
		}
		
		result = false;
	} else if(isNaN(Number(xMax))) {
		if(enableAlert) {
			//x max is not a number
			alert("Error: x max is not a number");			
		}

		if(resetInvalidValues) {
			//reset the x max value
			this.resetXMax();			
		}
		
		result = false;
	} else if(isNaN(Number(yMin))) {
		if(enableAlert) {
			//y min is not a number
			alert("Error: y min is not a number");			
		}
		
		if(resetInvalidValues) {
			//reset the y min value
			this.resetYMin();			
		}
		
		result = false;
	} else if(isNaN(Number(yMax))) {
		if(enableAlert) {
			//y max is not a number
			alert("Error: y max is not a number");			
		}
		
		if(resetInvalidValues) {
			//reset the y max value
			this.resetYMax();			
		}
		
		result = false;
	} else if(Number(xMin) >= Number(xMax)) {
		if(enableAlert) {
			//x min is greater than x max
			alert("Error: x min is greater than x max");			
		}
		
		if(resetInvalidValues) {
			//reset the x min value
			this.resetXMin();
			
			//reset the x max value
			this.resetXMax();			
		}
		
		result = false;
	} else if(Number(yMin) >= Number(yMax)) {
		if(enableAlert) {
			//y min is greater than y max
			alert("Error: y min is greater than y max");			
		}
		
		if(resetInvalidValues) {
			//reset the y min value
			this.resetYMin();
			
			//reset the y max value
			this.resetYMax();			
		}
		
		result = false;
	}
	
	return result;
};

/**
 * Reset the x min value. First check for an x min value in
 * the state, and if it is not found there, check the content
 */
CARGRAPH.prototype.resetXMin = function() {
	var previousXMin = null;
	
	if(this.carGraphState.xMin != null) {
		//reset the x min value from the state
		previousXMin = this.carGraphState.xMin;
	} else if(this.content.graphParams.xmin != null) {
		//reset the x min value from the content
		previousXMin = this.content.graphParams.xmin;
	}
	
	//reset the x min value
	$('#xMinInput').val(previousXMin);
};

/**
 * Reset the x max value. First check for an x max value in
 * the state, and if it is not found there, check the content
 */
CARGRAPH.prototype.resetXMax = function() {
	var previousXMax = null;
	
	if(this.carGraphState.xMax != null) {
		//reset the x max value from the state
		previousXMax = this.carGraphState.xMax;
	} else if(this.content.graphParams.xmax != null) {
		//reset the x max value from the content
		previousXMax = this.content.graphParams.xmax;
	}
	
	//reset the x max value
	$('#xMaxInput').val(previousXMax);
};

/**
 * Reset the y min value. First check for an y min value in
 * the state, and if it is not found there, check the content
 */
CARGRAPH.prototype.resetYMin = function() {
	var previousYMin = null;
	
	if(this.carGraphState.yMin != null) {
		//reset the y min value from the state
		previousYMin = this.carGraphState.yMin;
	} else if(this.content.graphParams.ymin != null) {
		//reset the y min value from the content
		previousYMin = this.content.graphParams.ymin;
	}
	
	//reset the x min value
	$('#yMinInput').val(previousYMin);
};

/**
 * Reset the x max value. First check for an x max value in
 * the state, and if it is not found there, check the content
 */
CARGRAPH.prototype.resetYMax = function() {
	var previousYMax = null;
	
	if(this.carGraphState.yMax != null) {
		//reset the y max value from the state
		previousYMax = this.carGraphState.yMax;
	} else if(this.content.graphParams.ymax != null) {
		//reset the y max value from the content
		previousYMax = this.content.graphParams.ymax;
	}
	
	//reset the x max value
	$('#yMaxInput').val(previousYMax);
};

/**
 * The student wants to reset the axis range values back to the
 * default values
 */
CARGRAPH.prototype.resetDefaultAxisRange = function() {
	//set this flag so we know the carGraph state has changed
	this.axisRangeChanged = true;
	
	var xMin = "";
	var xMax = "";
	var yMin = "";
	var yMax = "";
	
	if(this.content.graphParams != null) {
		if(this.content.graphParams.xmin != null && this.content.graphParams.xmin != "") {
			//set the xmin value
			xMin = this.content.graphParams.xmin;
		}

		if(this.content.graphParams.xmax != null && this.content.graphParams.xmax != "") {
			//set the xmax value
			xMax = this.content.graphParams.xmax;
		}

		if(this.content.graphParams.ymin != null && this.content.graphParams.ymin != "") {
			//set the ymin value
			yMin = this.content.graphParams.ymin;
		}

		if(this.content.graphParams.ymax != null && this.content.graphParams.ymax != "") {
			//set the ymax value
			yMax = this.content.graphParams.ymax;
		}
	}
	
	//reset the values in the text box inputs
	$('#xMinInput').val(xMin);
	$('#xMaxInput').val(xMax);
	$('#yMinInput').val(yMin);
	$('#yMaxInput').val(yMax);
	
	//reset the values in the carGraph state
	this.carGraphState.xMin = this.content.graphParams.xmin;
	this.carGraphState.xMax = this.content.graphParams.xmax;
	this.carGraphState.yMin = this.content.graphParams.ymin;
	this.carGraphState.yMax = this.content.graphParams.ymax;
	
	//parse the graph params again to obtain the new values in the graph params
	this.graphParams = this.parseGraphParams(this.content.graphParams);
	
	//plot the graph again
	this.plotData();
};

/**
 * Get the prediction array in a format that we can give to flot to plot
 * @return an array containing arrays with two values [x, y] that represent
 * the prediction points
 */
CARGRAPH.prototype.getPredictionArrayByPredictionId = function(predictionId) {
	//get the graph data array from the current state 
	var predictionArray = this.generatePredictionArray(this.carGraphState, predictionId);
	
	return predictionArray;
};

/**
 * Generate the prediction array in a format that we can give to flot to plot
 * @param state the carGraph state
 * @return an array containing arrays with two values [x, y] that represent
 * the prediction points
 */
CARGRAPH.prototype.generatePredictionArray = function(state,predictionId) {
	var predictionArray = [];
	
	if(state != null) {
		//get the data array from the state
		var statePredictionArray = state.predictionArray;
		
		if(statePredictionArray != null) {
			//loop through all the elements in the data array
			for(var i=0; i<statePredictionArray.length; i++) {
				
				var predictionObj = statePredictionArray[i];
				
				if (predictionObj.id == predictionId) {
					predictions = predictionObj.predictions;
					
					for (var k=0; k<predictions.length; k++) {
						//get the data array element
						var predictionData = predictions[k];

						//get the time
						var x = predictionData.x;
				
						//get the y value. this may be distance or temp or etc.
						var y = predictionData.y;
				
						/*
						 * add the x, y data point into the array. flot expects
						 * the each element in the array to be an array.
						 */
						predictionArray.push([x, y]);
					}
				}
			}
		}		
	}
	return predictionArray;
};

/**
 * Convert the array of object positions to an array of array positions
 * e.g.
 * convert
 * [{x:1,y:2}, {x:2,y:4}]
 * to
 * [[1,2], [2,4]]
 * @param arrayToConvert an array of object positions with x and y fields
 * @returns an array of arrays
 */
CARGRAPH.prototype.convertToPlottableArray = function(arrayToConvert) {
	var plottableArray = [];
	
	//loop through all the elements in the object array
	for(var i=0; i<arrayToConvert.length; i++) {
		//get an object
		var positionObject = arrayToConvert[i];
		
		if(positionObject != null) {
			//get the x and y fields from the object
			var x = positionObject.x;
			var y = positionObject.y;
			
			/*
			 * create an array to hold the x and y values.
			 * the first element will be x, the second element
			 * will be y.
			 */
			var positionArray = [];
			positionArray.push(x);
			positionArray.push(y);
			
			//put the array into our parent array
			plottableArray.push(positionArray);
		}
	}
	
	return plottableArray;
};

/**
 * The student has created a prediction point
 * @param x the x value for the point
 * @param y the y value for the point
 */
CARGRAPH.prototype.predictionReceived = function(x, y) {
	
	if(x != null && y != null) {
		//round x down to the nearest 0.01
		var xFactor = 1 / this.content.gatherXIncrement;
		x = Math.round(x * xFactor) / xFactor;		
		y = parseFloat(y.toFixed(2));
		
		//insert the point into the carGraph state
		this.carGraphState.predictionReceived(this.currentDynamicImageId, x, y);
		
		this.graphChanged = true;
		
		var seriesName = this.currentDynamicImageId;
		
		var annotation = this.carGraphState.getAnnotationBySeriesXValue(seriesName, x);
		
		if(annotation != null) {
			//annotation exists for this x value so we will update that annotation
			
			//get the y units
			var graphYUnits = this.content.graphParams.yUnits;
			
			//get the x units
			var graphXUnits = this.content.graphParams.xUnits;
			
			//get the text representation of the data point
			var dataText = x + " " + graphXUnits + ", " + y + " " + graphYUnits;

			//get the series name used in the dom
			var domSeriesName = this.getDOMSeriesName(seriesName);

			//get the series
			var series = this.getSeriesByName(this.globalPlot, seriesName);
			
			//get the data index of the point with the given x value
			var dataIndex = this.getDataIndexAtX(series, x);
			
			//set the new values into the annotation
			annotation.x = x;
			annotation.y = y;
			annotation.dataText = dataText;
			annotation.dataIndex = dataIndex;
			
			//get the x value we will use in the DOM id
			var domXValue = this.getDOMXValue(x);
			
			//update the data text in the annotation in the UI
			$("#" + domSeriesName + domXValue + "AnnotationDataText").html(seriesName + " [" + dataText + "]: ");
		}
	}
};

/**
 * Hide the prediction buttons
 */
CARGRAPH.prototype.hidePredictionButtons = function() {
	$('#clearPredictionButton').hide();
};

/**
 * Disable the clear prediction button
 */
CARGRAPH.prototype.disablePredictionButtons = function() {
	$('#clearPredictionButton').attr('disabled', true);
};

/**
 * Setup the axis limit values on the graph
 */
CARGRAPH.prototype.setupAxisValues = function() {
	var xMin = "";
	var xMax = "";
	var yMin = "";
	var yMax = "";
	
	if(this.content.graphParams != null) {
		if(this.content.graphParams.xmin != null && this.content.graphParams.xmin != "") {
			//set the xmin value
			xMin = this.content.graphParams.xmin;
		}

		if(this.content.graphParams.xmax != null && this.content.graphParams.xmax != "") {
			//set the xmax value
			xMax = this.content.graphParams.xmax;
		}

		if(this.content.graphParams.ymin != null && this.content.graphParams.ymin != "") {
			//set the ymin value
			yMin = this.content.graphParams.ymin;
		}

		if(this.content.graphParams.ymax != null && this.content.graphParams.ymax != "") {
			//set the ymax value
			yMax = this.content.graphParams.ymax;
		}
	}
	
	/*
	 * if the carGraph state contains axis values it will override
	 * the axis values from the content
	 */
	if(this.carGraphState != null) {
		if(this.carGraphState.xMin != null) {
			xMin = this.carGraphState.xMin;
		}
		
		if(this.carGraphState.xMax != null) {
			xMax = this.carGraphState.xMax;
		}
		
		if(this.carGraphState.yMin != null) {
			yMin = this.carGraphState.yMin;
		}
		
		if(this.carGraphState.yMax != null) {
			yMax = this.carGraphState.yMax;
		}
	}
	
	//set the axis range values into the input text boxes
	$('#xMinInput').val(xMin);
	$('#xMaxInput').val(xMax);
	$('#yMinInput').val(yMin);
	$('#yMaxInput').val(yMax);
	
	// disable input boxes if updating axis rang is not permitted.
	if (!this.content.graphParams.allowUpdateAxisRange) {
		$('#xMinInput').attr("disabled","disabled");		
		$('#xMaxInput').attr("disabled","disabled");		
		$('#yMinInput').attr("disabled","disabled");		
		$('#yMaxInput').attr("disabled","disabled");		
	}
};

/**
 * Get the prediction from the prevWorkNodeIds
 * @return
 */
CARGRAPH.prototype.getPreviousPrediction = function() {
	if(this.node.prevWorkNodeIds.length > 0) {
		if(this.view.state != null) {
			//get the node type for the previous work
			var prevWorkNodeType = this.view.getProject().getNodeById(this.node.prevWorkNodeIds[0]).type;

			//we can only pre populate the work from a previous node if it is a graph step like this one
			if(prevWorkNodeType == 'SensorNode' || prevWorkNodeType == 'CarGraphNode') {
				//get the state from the previous step that this step is linked to
				var predictionState = this.view.state.getLatestWorkByNodeId(this.node.prevWorkNodeIds[0]);
				
				/*
				 * make sure this step doesn't already have a prediction set 
				 * and that there was a prediction state from the previous
				 * associated step before we try to retrieve that prediction and
				 * set it into our prediction array
				 */
				if(this.carGraphState.predictionArray.length == 0 && predictionState != null && predictionState != "") {

					var predictionId = "";
					
					//get the cars that are used in this step
					var dynamicImages = this.content.dynamicImages;
					
					/*
					 * find the id of the car that is used in this step, we will assume
					 * only one car is used
					 */
					for(var x=0; x<dynamicImages.length; x++) {
						var dynamicImage = dynamicImages[x];
						
						if(dynamicImage != null) {
							//get the id of the car e.g. "greenCar"
							predictionId = dynamicImage.id;
						}
					}
					
					/*
					 * make a copy of the prediction array and set it into our carGraph state
					 * so we don't accidentally modify the data from the other state
					 */
					var predictions = JSON.parse(JSON.stringify(predictionState.predictionArray));
					
					//create a prediction object from the previous work from the previous work node
					var predictionObject = {
						id:predictionId,
						predictions:predictions
					};
					
					//put the previous work into our state
					this.carGraphState.predictionArray.push(predictionObject);
					
					var predictionAnnotations = [];
					
					//get all the prediction annotations
					for(var x=0; x<predictionState.annotationArray.length; x++) {
						var annotation = predictionState.annotationArray[x];
						
						if(annotation.seriesName.indexOf("prediction") != -1) {
							predictionAnnotations.push(annotation);
						}
					}
					
					/*
					 * make a copy of the prediction annotations so we don't accidentally modify
					 * the data in the other state 
					 */ 
					predictionAnnotations = JSON.parse(JSON.stringify(predictionAnnotations));
					
					//add the prediction annotations to our annotation array
					for(var y=0; y<predictionAnnotations.length; y++) {
						this.carGraphState.annotationArray.push(predictionAnnotations[y]);
					}
					
					this.graphChanged = true;
				}
			}
		}
	}
};

/**
 * Delete the prediction points and annotations
 */
CARGRAPH.prototype.clearPrediction = function() {
	//clear the prediction array
	this.carGraphState.predictionArray = [];
	
	//delete the prediction annotations
	this.carGraphState.removePredictionAnnotations();
	
	//delete the prediction annotations from the UI
	this.deletePredictionAnnotationsFromUI();
	
	//delete the prediction annotation tool tips on the graph
	this.removeAnnotationToolTipPrediction();
	
	//plot the graph again
	this.plotData();
	
	this.graphChanged = true;
};

/**
 * Delete the prediction annotation tool tips
 */
CARGRAPH.prototype.removeAnnotationToolTipPrediction = function() {
	this.removeAnnotationToolTip("annotationToolTipPrediction");
};

/**
 * Delete the data annotation tool tips
 */
CARGRAPH.prototype.removeAnnotationToolTipData = function() {
	this.removeAnnotationToolTip("annotationToolTipData");
};

/**
 * Delete the annotation tool tips for the given class
 * @param annotationToolTipClass the class for the annotation tool tips we want to delete
 */
CARGRAPH.prototype.removeAnnotationToolTip = function(annotationToolTipClass) {
	$("." + annotationToolTipClass).remove();
};

/**
 * Determine if one data sets has the given name
 * @param dataSets an array of data sets
 * @param name the name of a data set (aka series name)
 * @return whether a data set has the given name
 */
CARGRAPH.prototype.dataSetContainsName = function(dataSets, name) {
	if(dataSets != null) {
		//loop through all the data sets
		for(var x=0; x<dataSets.length; x++) {
			var dataSet = dataSets[x];
			
			if(dataSet != null && dataSet.name == name) {
				//the name matches
				return true;
			}
		}
	}
	
	//we did not find a match
	return false;
};

/**
 * Delete all the annotation tool tips from the graph
 */
CARGRAPH.prototype.removeAllAnnotationToolTips = function() {
	$("." + this.graphDivId + "AnnotationToolTip").remove();
};

/**
 * Add an annotation tool tip to the graph
 * @param seriesName the name of the series
 * @param dataIndex the index within the series
 * @param x the x value of the point
 * @param y the y value of the point
 * @param annotationText the text the student wrote for the annotation
 */
CARGRAPH.prototype.addAnnotationToolTipToUI = function(seriesName, dataIndex, x, y, annotationText) {
	//use this.globalPlot as the default if plot was not provided
	var plot = this.globalPlot;
	
	//get the graph line
	var series = this.getSeriesByName(plot, seriesName);
	
	if(series != null) {
		var dataIndexAtX = this.getDataIndexAtX(series, x);
		
		if(dataIndexAtX != null) {
			/*
			 * use the data index with the given x value, this will be null for old annotations
			 * because old annotations did not store x values
			 */
			dataIndex = dataIndexAtX;
		}
		
		//highlight the point
		plot.highlight(series, dataIndex);
		
		//get the point in the series
		var dataPointArray = series.data[dataIndex];
		
		if (!dataPointArray) {
			return;
		}
		//get the x and y values
		var dataPointObject = {
				x:dataPointArray[0],
				y:dataPointArray[1]
		};
		
		//find the pixel position of the point
		var offsetObject = plot.pointOffset(dataPointObject);
		var xOffset = offsetObject.left;
		var yOffset = offsetObject.top;
		
		//get the class that we will give to the div
		var annotationToolTipClass = "activeAnnotationToolTip " + this.graphDivId + "AnnotationToolTip";
		
		if(seriesName.indexOf("prediction") != -1) {
			annotationToolTipClass += " annotationToolTipPrediction";
		} else {
			annotationToolTipClass += " annotationToolTipData";
		}
		
		var domSeriesName = this.getDOMSeriesName(seriesName);
		
		//get the x value that we will use in the DOM id
		var domXValue = this.getDOMXValue(x);
		
		//get the div id for the annotation tool tip
		var annotationToolTipDivId = this.graphDivId + '_annotationToolTip_' + domSeriesName + domXValue;

		//check if the tool tip div for this annotation already exists
		if($('#' + annotationToolTipDivId).length == 0) {
			//it does not exist so we will make it
		    $('<div id="' + annotationToolTipDivId + '" class="' + annotationToolTipClass + '">' + annotationText + '</div>').css( {
		        position: 'absolute',
		        //display: 'none',
		        top: yOffset - 35,
		        left: xOffset + 10,
		        border: '1px solid #fdd',
		        padding: '2px',
		        'background-color': '#fee',
		        opacity: 0.8
		    }).appendTo("#" + this.graphDivId).fadeIn(200);
		}
		
	    if(annotationText == null || annotationText == "") {
	    	//hide the annotation tool tip if the annotation text is ""
	    	$('#' + annotationToolTipDivId).hide();
	    	$('#' + annotationToolTipDivId).addClass("hiddenAnnotationToolTip").removeClass("activeAnnotationToolTip");
	    }
	}
};

/**
 * Get the series name that we will use in the DOM. This just means
 * replacing any spaces " " with underscores "_"
 * @param seriesName the name of the series
 * @return the seriesName with spaces replaced with underscores
 */
CARGRAPH.prototype.getDOMSeriesName = function(seriesName) {
	var domSeriesName = "";
	
	if(seriesName != null) {
		//replace the spaces with underscores
		domSeriesName = seriesName.replace(/ /g, "_");
	}
	
	return domSeriesName;
};

/**
 * Get the x value that we will use in the DOM id. This just means
 * replacing any "." with underscores "_"
 * @param x the x value
 * @return the x value with "." replaced with "_"
 */
CARGRAPH.prototype.getDOMXValue = function(x) {
	var domXValue = "";
	
	if(x != null) {
		//turn x into a string so we can call replace()
		x += "";
		
		//replace the spaces with underscores
		domXValue = x.replace(/\./g, "-");
	}
	
	return domXValue;
};

/**
 * Hide all the input fields for when we want to prevent the student from
 * working on this step because they have not yet created a prediction in
 * the previous associated step
 */
CARGRAPH.prototype.hideAllInputFields = function() {
	$('#clearButton').hide();
	$('#clearPredictionButton').hide();
	$('#resetDefaultAxisLimitsButton').hide();
	$('#graphTitle').hide();
	$('#yMaxInput').hide();
	$('#yMinInput').hide();
	$('#xMinInput').hide();
	$('#xMaxInput').hide();
	$('#showStarterSentenceButton').hide();
	$('#responseTextArea').hide();
	$('#saveButton').hide();
};

/**
 * Set the div id that we will plot the graph in
 * @param plotDivId the id of the plot div
 */
CARGRAPH.prototype.setGraphDivId = function(graphDivId) {
	this.graphDivId = graphDivId;
};

/**
 * Get the color for the graph line
 * @param graphType the type of graph line
 * e.g.
 * "distance"
 * "temperature"
 * "prediction"
 * @return the color for the graph line
 */
CARGRAPH.prototype.getGraphColor = function(graphType) {
	return this.graphColors[graphType];
};

/**
 * Get the data index of the point with the given x value
 * @param series the series object for a line plot
 * @param x the x value we want
 * @return the data index of the point with the given x value
 * or null if there is none
 */
CARGRAPH.prototype.getDataIndexAtX = function(series, x) {
	var data = series.data;
	
	//loop through all the data points
	for(var i=0; i<data.length; i++) {
		var dataPoint = data[i];
		
		//get the x value
		var dataPointX = dataPoint[0];
		
		if(x == dataPointX) {
			//the x values match so we have found the data index we want
			return i;
		}
	}
	
	//we did not find a matching x value
	return null;
};

/**
 * Disable the prediction annotation inputs so the student can't edit the
 * prediction annotations anymore
 */
CARGRAPH.prototype.disablePredictionTextInputAndDeleteButton = function() {
	$('.predictionTextInput').attr('disabled', true);
	$('.predictionDeleteButton').attr('disabled', true);
};

CARGRAPH.prototype.smarts = function() {
	if (this.carGraphState.getPredictionObjByPredictionId("greenCar").predictions.length < 5) {
		alert("More points needed");
		return false;
	}
	
	return true;
};


/**
 * Called when the student clicks
 * @param event the click event
 */
CARGRAPH.prototype.handleKeyDown = function(event) {
	if(event.keyCode == 8) {
		//student pressed the backspace key
		
		/*
		 * check if the student clicked on a prediction point
		 * just before pressing the backspace key
		 */
		if(this.lastPointClicked != null) {
			//get the data of the point
			var seriesName = this.lastPointClicked.seriesName;
			var dataIndex = this.lastPointClicked.dataIndex;
			var x = this.lastPointClicked.x;
			
			//remove the prediction point
			this.removePredictionPoint(seriesName, dataIndex, x);
			
			//update the graph
			this.plotData();
			
			//update the flag since the graph has changed
			this.graphChanged = true;
			
			this.lastPointClicked = null;
		}
	}
};

/**
 * Remove the prediction point from the graph. First remove any
 * annotations for the point and then remove the point from
 * the carGraphState
 */
CARGRAPH.prototype.removePredictionPoint = function(seriesName, dataIndex, x) {
	//check that this is a prediction line
	if(this.seriesIsPrediction(seriesName)) {
		//remove any annotations associated with the point
		this.deleteAnnotation(seriesName, dataIndex, x);
		
		//remove the data point from the carGraphState
		this.carGraphState.removePredictionPoint(seriesName, dataIndex);		
	}
};

/**
 * Determine if the series is a prediction line
 * @param seriesName the name of the series. usually
 * the name of a prediction line will contain the
 * word prediction e.g.
 * "temperature prediction"
 * "distance prediction"
 * or in the case of car graph
 * "greenCar"
 * @returns whether the line is a prediction line
 */
CARGRAPH.prototype.seriesIsPrediction = function(seriesName) {
	var result = false;
	
	//check if the series name contains the word prediction or greenCar
	if(seriesName.indexOf("prediction") != -1 || seriesName == "greenCar") {
		result = true;
	}
	
	return result;
};

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/cargraph/cargraph.js');
}