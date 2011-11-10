/*
 * This is a template state object that developers can use to create new
 * step types.
 *
 * TODO: Copy this file and rename it to
 * 
 * <new step type>State.js
 * e.g. for example if you are creating a quiz step it would look
 * something like quizState.js
 *
 * and then put the new file into the new folder
 * you created for your new step type
 *
 * your new folder will look something like
 * vlewrapper/WebContent/vle/node/<new step type>/
 *
 * e.g. if you are creating a quiz step it would look something like
 * vlewrapper/WebContent/vle/node/quiz/
 * 
 * TODO: in this file, change all occurrences of the word 'TemplateState' to
 * 
 * <new step type>State
 * e.g. for example if you are creating a quiz step it would look
 * something like QuizState
 */

/**
 * This is the constructor for the state object that will be used to represent the
 * student work. An instance of this object will be created each time the student
 * submits an answer.
 * 
 * TODO: rename TemplateState
 * 
 * note: you can change the variables in this constructor, the response variable
 * is just used as an example. you can add any variables that will help you 
 * represent the student's work for your step type.
 * 
 * @constructor
 */
function TemplateState(response) {
	//the text response the student wrote
	this.response = "";

	if(response != null) {
		//set the response
		this.response = response;
	}
};

/**
 * This function is used to reload previous work the student submitted for the step.
 * The student work is retrieved and then this function is called to parse the student
 * work so that we can display the previous answer the student submitted.
 * 
 * TODO: rename TemplateState
 * 
 * note: you can change the variables in the stateJSONObj, the response 
 * variable is just used as an example. you can add any variables that will  
 * help you represent the student's work for your type of step.
 * 
 * @param stateJSONObj a JSONObject representing the student work
 * @return a TemplateState object
 */
TemplateState.prototype.parseDataJSONObj = function(stateJSONObj) {
	//obtain the student work from the JSONObject
	var response = stateJSONObj.response;
	
	/*
	 * create a state object with the student work
	 * TODO: rename TemplateState
	 */
	var templateState = new TemplateState(response);
	
	//return the state object
	return templateState;
};

/**
 * Get the student work for display purposes such as in the grading tool.
 * 
 * TODO: rename TemplateState
 * 
 * @return the student work
 */
TemplateState.prototype.getStudentWork = function() {
	var studentWork = this;
	
	return studentWork;
};

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	//TODO: rename template/templateState.js
	eventManager.fire('scriptLoaded', 'vle/node/template/templateState.js');
}