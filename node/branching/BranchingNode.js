/*
 * This a branching Node that developers can use to create new 
 * step types. Copy this file and rename it to 
 *
 * <new step type>Node.js
 * e.g. for example if you are creating a quiz step type it would
 * look something like QuizNode.js
 * 
 * and then in this file change all occurrences of the word 'BranchingNode' to 
 * 
 * <new step type>Node
 * 
 * e.g. for example if you are creating a quiz step type you would
 * change it to be QuizNode
 */

BranchingNode.prototype = new Node(); //TODO: rename BranchingNode
BranchingNode.prototype.constructor = BranchingNode; //TODO: rename both occurrences of BranchingNode
BranchingNode.prototype.parentNode = Node.prototype; //TODO: rename BranchingNode

/*
 * the name that displays in the authoring tool when the author creates a new step
 * 
 * TODO: rename BranchingNode
 * TODO: rename Branching to whatever you would like this step to be displayed as in
 * the authoring tool when the author creates a new step
 * e.g. if you are making a QuizNode you would set authoringToolName to to "Quiz"
 */
BranchingNode.authoringToolName = "Branching"; 

/*
 * TODO: rename BranchingNode
 * TODO: set the authoringToolDescription to describe the step type, this description
 * will be seen by the author when they add a new step to their project to help
 * them understand what kind of step this is
 */
BranchingNode.authoringToolDescription = "This is a generic step only used by developers";

/**
 * This is the constructor for the Node
 * 
 * TODO: rename BranchingNode
 * @constructor
 * @extends Node
 * @param nodeType
 * @param view
 */
function BranchingNode(nodeType, view) {
	this.view = view;
	this.type = nodeType;
	this.prevWorkNodeIds = [];
}

/**
 * This function is called when the vle loads the step and parses
 * the previous student answers, if any, so that it can reload
 * the student's previous answers into the step.
 * 
 * TODO: rename BranchingNode
 * 
 * @param stateJSONObj
 * @return a new state object
 */
BranchingNode.prototype.parseDataJSONObj = function(stateJSONObj) {
	/*
	 * TODO: rename BranchingState
	 * 
	 * make sure you rename BranchingState to the state object type
	 * that you will use for representing student data for this
	 * type of step. copy and modify the file below
	 * 
	 * vlewrapper/WebContent/vle/node/branching/branchingState.js
	 * 
	 * and use the object defined in your new state.js file instead
	 * of BranchingState. for example if you are creating a
	 * quiz step type you would copy the file above to
	 * 
	 * vlewrapper/WebContent/vle/node/quiz/quizState.js
	 * 
	 * and in that file you would define QuizState and therefore
	 * would change the BranchingState to QuizState below
	 */ 
	return BranchingState.prototype.parseDataJSONObj(stateJSONObj);
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
 * TODO: rename BranchingNode
 * 
 * @param studentWork
 * @return translated student work
 */
BranchingNode.prototype.translateStudentWork = function(studentWork) {
	return studentWork;
};

/**
 * This function is called when the student exits the step. It is mostly
 * used for error checking.
 * 
 * TODO: rename BranchingNode
 * 
 * Note: In most cases you will not have to change anything here.
 */
BranchingNode.prototype.onExit = function() {
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
 * TODO: rename BranchingNode
 * Note: you may need to add code to this function if the student
 * data for your step is complex or requires additional processing.
 * look at SensorNode.renderGradingView() as an example of a step that
 * requires additional processing
 */
BranchingNode.prototype.renderGradingView = function(divId, nodeVisit, childDivIdPrefix, workgroupId) {
	/*
	 * Get the latest student state object for this step
	 * TODO: rename branchingState to reflect your new step type
	 * 
	 * e.g. if you are creating a quiz step you would change it to quizState
	 */
	var branchingState = nodeVisit.getLatestWork();
	
	/*
	 * get the step work id from the node visit in case we need to use it in
	 * a DOM id. we don't use it in this case but I have retrieved it in case
	 * someone does need it. look at SensorNode.js to view an example of
	 * how one might use it.
	 */
	var stepWorkId = nodeVisit.id;
	
	/*
	 * TODO: rename branchingState to match the variable name you
	 * changed in the previous line above
	 */
	var studentWork = branchingState.getStudentWork();
	
	var studentWorkHtml = "";
	
	if(studentWork != null) {
		if(studentWork.response != null) {
			if(studentWork.response.chosenPathName != null) {
				//get the branching path name that was chosen
				studentWorkHtml = studentWork.response.chosenPathName;
			}
		}
	}
	
	//put the student work into the div
	$('#' + divId).html(studentWorkHtml);
};

/**
 * Get the html file associated with this step that we will use to
 * display to the student.
 * 
 * TODO: rename BranchingNode
 * 
 * @return a content object containing the content of the associated
 * html for this step type
 */
BranchingNode.prototype.getHTMLContentTemplate = function() {
	/*
	 * TODO: rename both occurrences of branching
	 * 
	 * e.g. if you are creating a quiz step you would change it to
	 * 
	 * node/quiz/quiz.html
	 */
	return createContent('node/branching/branching.html');
};

/**
 * Returns the JSON of the path specified by the path ID.
 * @param pathId
 */
BranchingNode.prototype.getPathsJSON = function() {
	return this.content.getContentJSON().paths;
};

/**
 * Returns the JSON of the path specified by the path ID.
 * @param pathId
 */
BranchingNode.prototype.getPathJSON = function(pathId) {
	var paths = this.getPathsJSON();
	for (var i=0; i < paths.length; i++) {
		var path = paths[i];
		if (path.identifier == pathId) {
			return path;
		}
	}
	return null;
};

/**
 * Handle any processing before creating the node navigation html.
 * For the branch node, check if student has already visited the branch path
 * If yes, show only the path that they went under and hide the other paths.
 * If no, hide all paths.
 */
BranchingNode.prototype.onBeforeCreateNavigationHtml = function() {
	var latestState = this.view.state.getLatestWorkByNodeId(this.id);
	if (latestState != null && latestState.response != null && latestState.response.chosenPathId != null) {
		// student has already been to this branch and has been "branched"
		if (!this.content.showBranchNodeAfterBranching) {
			// hide this branchnode if needed
			this.isHidden = true;
		}
		var chosenPathId = latestState.response.chosenPathId;
		var paths = this.getPathsJSON();
		for (var i=0; i < paths.length; i++) {
			var path = paths[i];
			var pathSequence = this.view.getProject().getNodeById(path.sequenceRef);
			var nodesInPath = pathSequence.children;
			for (var j=0; j < nodesInPath.length; j++) {
				var nodeInPath = this.view.getProject().getNodeById(nodesInPath[j].id);
				if (chosenPathId==path.identifier) {
					nodeInPath.isHidden=false;
				} else {
					nodeInPath.isHidden=true;					
				}
			}
		}
	} else {
		// student has not been to this branch, so we hide the branch paths
		var paths = this.getPathsJSON();
		for (var i=0; i < paths.length; i++) {
			var path = paths[i];
			var pathSequence = this.view.getProject().getNodeById(path.sequenceRef);
			var nodesInPath = pathSequence.children;
			for (var j=0; j < nodesInPath.length; j++) {
				var nodeInPath = this.view.getProject().getNodeById(nodesInPath[j].id);
				nodeInPath.isHidden=true;
			}
		}
	}
};

/*
 * Add this node to the node factory so the vle knows it exists.
 * TODO: rename both occurrences of BranchingNode
 * 
 * e.g. if you are creating a quiz step you would change it to
 * 
 * NodeFactory.addNode('QuizNode', QuizNode);
 */
NodeFactory.addNode('BranchingNode', BranchingNode);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	/*
	 * TODO: rename branching to your new folder name
	 * TODO: rename BranchingNode
	 * 
	 * e.g. if you were creating a quiz step it would look like
	 * 
	 * eventManager.fire('scriptLoaded', 'vle/node/quiz/QuizNode.js');
	 */
	eventManager.fire('scriptLoaded', 'vle/node/branching/BranchingNode.js');
};