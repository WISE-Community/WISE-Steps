/**
 * Node specific helpers
 */

function removeClassFromElement(identifier, classString) {
	$('#' + identifier).removeClass(classString);
};

function addClassToElement(identifier, classString) {
	$('#' + identifier).addClass(classString);
};

/**
 * returns true iff element with specified identifier has 
 * a class classString
 * @param identifier
 * @param classString
 * @return
 */
function hasClass(identifier, classString) {
	return $('#' + identifier).hasClass(classString);
};

/**
 * Clears innerHTML of a div with id=feedbackDiv
 */
function clearFeedbackDiv() {
	$("#feedbackDiv").html('');
};

/**
 * Clears value of an element with id=responseBox
 */
function clearResponseBox() {
	document.getElementById("responseBox").value = "";
};

/**
 * show tryagain button iff doShow == true
 * @param doShow
 * @return
 */
function setButtonVisible(buttonId, doShow) {
    var tryAgainButton = document.getElementById(buttonId);

	if (doShow) {
	    tryAgainButton.style.visibility = 'visible';
	} else {
	    tryAgainButton.style.visibility = 'hidden';		
	}
};

/**
 * enable checkAnswerButton
 * OR
 * disable checkAnswerButton
 */
function setCheckAnswerButtonEnabled(doEnable) {
  var checkAnswerButton = document.getElementById('checkAnswerButton');

  if (doEnable) {
    checkAnswerButton.removeAttribute('disabled');
  } else {
    checkAnswerButton.setAttribute('disabled', 'true');
  }
};

function setResponseBoxEnabled(doEnable) {
	var responseBox = document.getElementById('responseBox');
	if (doEnable) {
		responseBox.removeAttribute('disabled');
	} else {
		responseBox.setAttribute('disabled','disabled');
	}
};

/**
 * Updates text in div with id numberAttemptsDiv with info on number of
 * attempts. The text will generally follow the format:
 * This is your ___ attempt.  Or This is your ___ revision.
 * part1 example: This is your
 * part2 example: attempt
 * part2 example2: revision
 */
function displayNumberAttempts(part1, part2, states) {
	var nextAttemptNum = states.length + 1;
	var nextAttemptString = "";
	if (nextAttemptNum == 1) {
		nextAttemptString = "1st";		
	} else if (nextAttemptNum == 2) {
		nextAttemptString = "2nd";		
	} else if (nextAttemptNum == 3) {
		nextAttemptString = "3rd";		
	} else {
		nextAttemptString = nextAttemptNum + "th";		
	}
	var numAttemptsDiv = document.getElementById("numberAttemptsDiv");
	var numAttemptsDivHtml = part1 + " " + nextAttemptString + " " + part2 +".";
	numAttemptsDiv.innerHTML = numAttemptsDivHtml;
};

/**
 * Displays the number of attempts message e.g.
 * "This is your 2nd attempt."
 * @param part1 the beginning of the message e.g. "This is your"
 * @param part2 the end of the message e.g. "attempt"
 * @param numAttempts the number of attempts
 */
function displayNumberAttemptsMessage(part1, part2, numAttempts) {
	//get the message
	var numberAttemptsMessage = getNumberAttemptsMessage(part1, part2, numAttempts);
	
	//set the message in the div
	setNumberAttemptsMessage(numberAttemptsMessage);
}

/**
 * Make the number of attempts message e.g.
 * "This is your 2nd attempt."
 * @param part1 the beginning of the message e.g. "This is your"
 * @param part2 the end of the message e.g. "attempt"
 * @param numAttempts the number of attempts
 * @returns the number of attempts message string
 */
function getNumberAttemptsMessage(part1, part2, numAttempts) {
	var attemptsMessage = "";
	
	if(numAttempts == null) {
		
	} else if (numAttempts == 1) {
		attemptsMessage = "1st";		
	} else if (numAttempts == 2) {
		attemptsMessage = "2nd";		
	} else if (numAttempts == 3) {
		attemptsMessage = "3rd";		
	} else {
		attemptsMessage = numAttempts + "th";		
	}

	var numAttemptsDivHtml = part1 + " " + attemptsMessage + " " + part2 +".";
	return numAttemptsDivHtml;
};

/**
 * Display the number of attempts message in the div
 * @param numberAttemptsMessage the message string
 */
function setNumberAttemptsMessage(numberAttemptsMessage) {
	//get the div
	var numAttemptsDiv = document.getElementById("numberAttemptsDiv");
	
	//set the string in the div
	numAttemptsDiv.innerHTML = numberAttemptsMessage;
};

/**
 * Updates text in div with id lastAttemptDiv with info on
 * student's last attempt
 * javascript Date method reference:
 * http://www.w3schools.com/jsref/jsref_obj_date.asp
 */
function displayLastAttempt(states) {
	if (states.length > 0) {
	    var t = states[states.length - 1].timestamp;
	    var month = t.getMonth() + 1;
	    var hours = t.getHours();
	    var minutes = t.getMinutes();
	    var seconds = t.getSeconds();
	    var timeToDisplay = month + "/" + t.getDate() + "/" + t.getFullYear() +
	        " at " + hours + ":" + minutes + ":" + seconds;
		var lastAttemptDiv = document.getElementById("lastAttemptDiv");
		lastAttemptDiv.innerHTML = " Your last attempt was on " + timeToDisplay;
	}
};

/**
 * Replaces all the & with &amp; and escapes all " within the
 * given text and returns that text.
 * 
 * @param text
 * @return text
 */
function makeHtmlSafe(text){
	if(text && typeof text=='string'){
		text =  text.replace(/\&/g, '&amp;'); //html friendly &
		text = text.replace(/\"/g, "&quot;"); //escape double quotes
		return text;
	} else {
		return text;
	}
};

/**
 * Get the table that will display the possible scores and highlight 
 * the current possible score
 * @param numAttempts the current attempt number
 */
function getCurrentPossibleScoreTable(numAttempts, scores) {
	if(numAttempts == 0) {
		/*
		 * if this is the first attempt, the number of attempts will
		 * be 0 so we will just set this to 1 so that the table highlights
		 * the first possible score
		 */
		numAttempts = 1;
	}
	
	var currentPossibleScoreHtml = "";
	
	//create the table that will hold the "Current Possible Score:" text and another table
	currentPossibleScoreHtml += "<table align='center'>";
	currentPossibleScoreHtml += "<tr>";
	
	//display the current possible score text
	currentPossibleScoreHtml += "<td>Current Possible Score:</td>";
	
	currentPossibleScoreHtml += "<td>";
	//create the table that will hold the possible scores
	currentPossibleScoreHtml += "<table border='1' style='border-collapse:collapse;border-color:black'>";
	currentPossibleScoreHtml += "<tr>";
	
	var hasMoreScores = true;
	var attemptCounter = 1;
	
	//loop through all the possible scores
	while(hasMoreScores) {
		//get the possible score for the current attempt counter
		var scoreForAttempt = scores[attemptCounter];
		
		if(scoreForAttempt != null) {
			
			currentPossibleScoreHtml += "<td width='25' align='center'";
			
			if(attemptCounter == numAttempts) {
				/*
				 * if this is the current attempt the student is on
				 * make the background light green
				 */
				currentPossibleScoreHtml += " style='background-color:lightgreen'";
			} else if(attemptCounter < numAttempts) {
				/*
				 * if the student has incorrectly answered on this
				 * attempt number, make the background grey
				 */
				currentPossibleScoreHtml += " style='background-color:grey'";
			}
			
			currentPossibleScoreHtml += ">";
			
			//display the current possible score for the current attempt counter
			currentPossibleScoreHtml += scoreForAttempt;			
			currentPossibleScoreHtml += "</td>";
			
			attemptCounter++;
		} else {
			hasMoreScores = false;
		}
	}
	
	currentPossibleScoreHtml += "</tr>";
	currentPossibleScoreHtml += "</table>";
	currentPossibleScoreHtml += "</td>";
	
	currentPossibleScoreHtml += "</tr>";
	currentPossibleScoreHtml += "</table>";
	
	return currentPossibleScoreHtml;
};

/**
 * Check if scores have been set
 * @param content the content for the step, we need this
 * because we need to check 
 * @returns whether scores have been set
 */
function challengeScoringEnabled(scores) {
	var enabled = false;
	
	if(scores != null) {
		//get the JSON string for the scores object
		var scoresJSONString = JSON.stringify(scores);
		
		//check if the scores object is empty
		if(scoresJSONString != "{}") {
			//scores object is not empty
			enabled = true;
		}
	}
	
	return enabled;
};

/**
 * Get the score given the number attempts the students has made
 * @param numAttempts
 * @param content
 * @return the score for the student depending on the number attempts
 * they have made
 */
function getCurrentScore(numAttempts, scores) {
	var score = 0;
	
	if(scores != null) {
		//check if there is a score set for the given number of attempts
		if(scores[numAttempts] != null) {
			//get the score
			score = scores[numAttempts];
		}
	}
	
	return score;
};

/**
 * Get the max score
 * @param scores an object of scores with attempt number
 * being the key and score being the value
 * e.g.
 * {
 *    1:10,
 *    2:5,
 *    3:1
 * }
 * @returns the highest score
 */
function getMaxScore(scores) {
	var maxScore = null;
	
	if(scores != null) {
		/*
		 * loop through all the attributes in the scores object
		 * each attribute is the attempt number and the value is
		 * the score. theoretically the max score will always be
		 * attempNum 1.
		 * {
		 *    1:10,
		 *    2:5,
		 *    3:1
		 * }
		 */
		for(var attemptNum in scores) {
			//get a score
			var score = scores[attemptNum];
			
			//make sure the score is a number
			var scoreValue = parseFloat(score);
			
			if(!isNaN(score)) {
				//score is a number
				
				//compare the score with the maxScore so far
				if(score > maxScore) {
					//set the new max score
					maxScore = score;
				}
			}
		}
	}
	
	return maxScore;
};

/**
 * Check whether the student completed the steps that have the given tag and occur
 * before the current step in the project
 * @param tagName the tag name
 * @param functionArgs the arguments to this function (this is not actually used in this function)
 * @returns the results from the check, the result object
 * contains a pass field and a message field
 */
function checkCompletedForTags(thisStep, tagName, functionArgs) {
	//default values for the result
	var result = {
		pass:true,
		message:''
	};
	
	//array to accumulate the nodes that the student has not completed with a high enough score
	var nodesFailed = [];

	//the node ids of the steps that come before the current step and have the given tag
	var nodeIds = thisStep.view.getProject().getPreviousNodeIdsByTag(tagName, thisStep.node.id);
	
	if(nodeIds != null) {
		//loop through all the node ids that come before the current step and have the given tag
		for(var x=0; x<nodeIds.length; x++) {
			//get a node id
			var nodeId = nodeIds[x];
			
			if(nodeId != null) {
				//get the latest work for the node
				var latestWork = thisStep.view.state.getLatestWorkByNodeId(nodeId);
				
				if(latestWork == null || latestWork == "") {
					//the student has not completed this step
					nodesFailed.push(nodeId);
				}
			}
		}
	}
	
	if(nodesFailed.length != 0) {
		//the student has not completed one of the steps
		
		//create the message to display to the student
		var message = "You must complete these steps before you can work on this step<br><br>";
		
		//loop through all the failed steps
		for(var x=0; x<nodesFailed.length; x++) {
			var nodeId = nodesFailed[x];
			
			//get the step number and title for the failed step
			var stepNumberAndTitle = thisStep.view.getProject().getStepNumberAndTitle(nodeId);
			
			//add the step number and title to the message
			message += stepNumberAndTitle + "<br>";
		}
		
		//set the fields in the result
		result.pass = false;
		result.message = message;
	}
	
	return result;
};

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/common/nodehelpers.js');
}