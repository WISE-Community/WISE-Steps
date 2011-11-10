FlashNode.prototype = new Node();
FlashNode.prototype.constructor = FlashNode;
FlashNode.prototype.parent = Node.prototype;

/*
 * the name that displays in the authoring tool when the author creates a new step
 */
FlashNode.authoringToolName = "Flash"; 

/*
 * will be seen by the author when they add a new step to their project to help
 * them understand what kind of step this is
 */
FlashNode.authoringToolDescription = "Embed Flash content in a WISE step.";

/**
 * This is the constructor for the Node
 * @constructor
 * @extends Node
 * @param nodeType
 * @param view
 */
function FlashNode(nodeType, view) {
	this.view = view;
	this.type = nodeType;
	this.prevWorkNodeIds = [];
}

/**
 * This function is called when the vle loads the step and parses
 * the previous student answers, if any, so that it can reload
 * the student's previous answers into the step.
 * 
 * @param stateJSONObj
 * @return a new state object
 */
FlashNode.prototype.parseDataJSONObj = function(stateJSONObj) {
	return FlashState.prototype.parseDataJSONObj(stateJSONObj);
};

/**
 * This function is called if there needs to be any special translation
 * of the student work from the way the student work is stored to a
 * human readable form. For example if the student work is stored
 * as an array that contains 3 elements, for example
 * ["apple", "banana", "orange"]
 *  
 * and you wanted to display the student work like this
 * 
 * Answer 1: apple
 * Answer 2: banana
 * Answer 3: orange
 * 
 * you would perform that translation in this function.
 * 
 * Note: In most cases you will not have to change the code in this function
 * 
 * @param studentWork
 * @return translated student work
 */
FlashNode.prototype.translateStudentWork = function(studentWork) {
	return studentWork;
};

/**
 * Save student data onExit
 */
FlashNode.prototype.onExit = function() {
	//check if the content panel has been set
	if(this.contentPanel) {
		if(this.contentPanel.save) {
			//tell the content panel to save
			this.contentPanel.save();
		}
	}
};

/**
 * Renders the student work into the div. The grading tool will pass in a
 * div id to this function and this function will insert the student data
 * into the div.
 * 
 * @param divId the id of the div we will render the student work into
 * @param nodeVisit the student work
 * @param childDivIdPrefix (optional) a string that will be prepended to all the 
 * div ids use this to prevent DOM conflicts such as when the show all work div
 * uses the same ids as the show flagged work div
 * @param workgroupId the id of the workgroup this work belongs to
 * 
 * Note: you may need to add code to this function if the student
 * data for your step is complex or requires additional processing.
 * look at SensorNode.renderGradingView() as an example of a step that
 * requires additional processing
 */
FlashNode.prototype.renderGradingView = function(divId, nodeVisit, childDivIdPrefix, workgroupId) {
	var gradingText = "";
	
	//Get the latest student state object for this step
	var flashState = nodeVisit.getLatestWork().response.data;
	
	/*
	 * get the step work id from the node visit in case we need to use it in
	 * a DOM id. we don't use it in this case but I have retrieved it in case
	 * someone does need it. look at SensorNode.js to view an example of
	 * how one might use it.
	 */
	var stepWorkId = nodeVisit.id;
	
	//var studentWork = flashState.getStudentWork();
	var studentWork = JSON.stringify(flashState);
	// print out the studentWork string
	gradingText += studentWork;
	
	//put the student work into the div
	$('#' + divId).html(gradingText);
};

/**
* Gets the swf file for the Flash node and inserts into the div, loading student data.
* The grading tool will pass in a div id to this function and this function will insert the student data
* into the div.
* 
* @param divId the id of the div we will render the student work into
* @param nodeVisit the student work
* @param childDivIdPrefix (optional) a string that will be prepended to all the 
* div ids use this to prevent DOM conflicts such as when the show all work div
* uses the same ids as the show flagged work div
* @param workgroupId the id of the workgroup this work belongs to
*/
FlashNode.prototype.renderGradingViewFlash = function(divId, nodeVisit, childDivIdPrefix, workgroupId, nodeContent) {
	var gradingText = '';
	
	if(typeof nodeVisit.getLatestWork().response.data != "undefined"){
		gradingText += '<div id="alternateContent"><a href="http://www.adobe.com/go/getflashplayer">'+
			'<img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a></div>';
	
		//Get the latest student state object for this step
		var flashState = nodeVisit.getLatestWork().response.data;
		
		/*
		 * get the step work id from the node visit in case we need to use it in
		 * a DOM id. we don't use it in this case but I have retrieved it in case
		 * someone does need it. look at SensorNode.js to view an example of
		 * how one might use it.
		 */
		var stepWorkId = nodeVisit.id;
		
		//var studentWork = flashState.getStudentWork();
		var studentWork = JSON.stringify(flashState);
		
		//put the alternate content div into the DOM
		$('#' + divId).html(gradingText);
		
		var width = nodeContent.width;
		var height = nodeContent.height;
		
		// shrink flash dimensions to fit in grading display (TODO: provide enlarge button?)
		if(width > 500){
			height = height*500/width;
			width = 500;
		}
		var minPlayerVersion = nodeContent.minPlayerVersion;
		var activity_uri = nodeContent.activity_uri;
		var flashvars = nodeContent.flashvars;
		
		// add latest student data to flashvars (processed by Flash on load)
		flashvars.studentData = studentWork;
		
		// embed the swf in the DOM
		var params = {};
		params.quality = "high";
		params.wmode = "opaque";
		params.allowscriptaccess = "sameDomain";
		var attributes = {};
		attributes.id = "flashContent";
		attributes.name = "flashContent";
		attributes.styleclass = "flashContent";
		swfobject.embedSWF(activity_uri, "alternateContent", width, height, minPlayerVersion, "/vlewrapper/vle/swfobject/expressInstall.swf", flashvars, params, attributes);
	} else {
		gradingText += 'Error: Student data not found. Check Flash file to ensure export format is correct.';
		
		//put the error string into the div
		$('#' + divId).html(gradingText);
	}
		
};

/**
* Gets the custom grading string from the stored student data and renders it in the grading div.
* The grading tool will pass in a div id to this function and this function will insert the data
* into the div.
* 
* @param divId the id of the div we will render the student work into
* @param nodeVisit the student work
* @param childDivIdPrefix (optional) a string that will be prepended to all the 
* div ids use this to prevent DOM conflicts such as when the show all work div
* uses the same ids as the show flagged work div
* @param workgroupId the id of the workgroup this work belongs to
*/
FlashNode.prototype.renderGradingViewCustom = function(divId, nodeVisit, childDivIdPrefix, workgroupId, nodeContent) {
	var gradingText = "";
	
	if(typeof nodeVisit.getLatestWork().response.customGrading != "undefined"){
		//Get the latest custom grading state object for this step
		var flashState = nodeVisit.getLatestWork().response.customGrading;
		
		/*
		 * get the step work id from the node visit in case we need to use it in
		 * a DOM id. we don't use it in this case but I have retrieved it in case
		 * someone does need it. look at SensorNode.js to view an example of
		 * how one might use it.
		 */
		var stepWorkId = nodeVisit.id;
		
		// print out the custom grading string
		//var studentWork = JSON.stringify(flashState);
		
		//gradingText += studentWork;
		gradingText += flashState;
	} else {
		gradingText += "Error: Custom grading content not found.  Check Flash file to ensure export format is correct.";
	}
	
	//put the custom grading string into the div
	$('#' + divId).html(gradingText);	
};

/**
 * Get the html file associated with this step that we will use to
 * display to the student.
 * 
 * @return a content object containing the content of the associated
 * html for this step type
 */
FlashNode.prototype.getHTMLContentTemplate = function() {
	return createContent('node/flash/flash.html');
};

//Add this node to the node factory so the vle knows it exists.
NodeFactory.addNode('FlashNode', FlashNode);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/flash/FlashNode.js');
};