/**
 * Sets the MWNode type as an object of this view
 * 
 * TODO: rename MWNode
 * @constructor
 */
View.prototype.MWNode = {};

/*
 * Add the name of the common component that this step will use. The
 * common components will be handled by the authoring tool. You will
 * need to create div elements with the appropriate id for the
 * authoring tool to insert the component into. Any additional custom
 * authoring components specific to your step type will be written 
 * by you in the generatePage() function. You may leave the array
 * empty if you are not using any common components.
 * 
 * Here are the available common components
 * 'Prompt'
 * 'LinkTo'
 * 'StudentResponseBoxSize'
 * 'RichTextEditorToggle'
 * 'StarterSentenceAuthoring'
 * 
 * If you use a common components, you must create a div with the
 * appropriate id, here are the respective ids
 * 'promptContainer'
 * (LinkTo does not require a div)
 * 'studentResponseBoxSizeContainer'
 * 'richTextEditorToggleContainer'
 * 'starterSentenceAuthoringContainer'
 * 
 * 
 * TODO: rename MWNode
 */
View.prototype.MWNode.commonComponents = [];

/**
 * Generates the authoring page. This function will create the authoring
 * components such as textareas, radio buttons, check boxes, etc. that
 * authors will use to author the step. For example if the step has a
 * text prompt that the student will read, this function will create
 * a textarea that will allow the author to type the text that the
 * student will see. You will also need to populate the textarea with
 * the pre-existing prompt if the step has been authored before.
 * 
 * TODO: rename MWNode
 */
View.prototype.MWNode.generatePage = function(view){
	this.view = view;
	
	//get the content of the step
	this.content = this.view.activeContent.getContentJSON();
	
	//get the html element that all the authoring components will be located
	var parent = document.getElementById('dynamicParent');
	
	/*
	 * wipe out the div that contains the authoring components because it
	 * may still be populated with the authoring components from a previous
	 * step the author has been authoring since we re-use the div id
	 */
	parent.removeChild(document.getElementById('dynamicPage'));

	//create a new div that will contain the authroing components
	var pageDiv = createElement(document, 'div', {id:'dynamicPage', style:'width:100%;height:100%'});

	//create the label for the textarea that the author will write the prompt in
	var promptText = document.createTextNode("Prompt for Student:");

	var promptTextArea = createElement(document, 'textarea', {id: 'promptTextArea', rows:'20', cols:'85', onkeyup:"eventManager.fire('mwUpdatePrompt')"});

	var cmlUrlLabel = document.createTextNode("CML URL:");
	var cmlUrlInput = createElement(document, 'input', {id: 'cmlUrlInput', type:'text', size:'50', onchange:"eventManager.fire('mwUpdateCmlUrlInput')"});

	//add the authoring components to the page
	pageDiv.appendChild(promptText);
	pageDiv.appendChild(createBreak());
	pageDiv.appendChild(promptTextArea);
	pageDiv.appendChild(createBreak());
	pageDiv.appendChild(createBreak());
	pageDiv.appendChild(cmlUrlLabel);
	pageDiv.appendChild(cmlUrlInput);

	//add the page to the parent
	parent.appendChild(pageDiv);

	//populate the prompt if this step has been authored before
	this.populatePrompt();
	
	// populate cml url if it has been authored before
	if(this.content.activity_uri) {
		$('#cmlUrlInput').val(this.content.activity_uri);
	}
	
};

/**
 * Get the array of common components which is an array with
 * string elements being the name of the common component
 * 
 * TODO: rename MWNode
 */
View.prototype.MWNode.getCommonComponents = function() {
	return this.commonComponents;
};

/**
 * Updates this content object when requested, usually when preview is to be refreshed
 * 
 * TODO: rename MWNode
 */
View.prototype.MWNode.updateContent = function(){
	/* update content object */
	this.view.activeContent.setContent(this.content);
};

/**
 * Populate the authoring textarea where the user types the prompt that
 * the student will read
 */
View.prototype.MWNode.populatePrompt = function() {
	//get the prompt from the content and set it into the authoring textarea
	$('#promptTextArea').val(this.content.prompt);
};

/**
 * Updates the content's prompt to match that of what the user input
 */
View.prototype.MWNode.updatePrompt = function(){
	/* update content */
	this.content.prompt = $('#promptTextArea').val();
	
	/*
	 * fire source updated event, this will update the preview
	 */
	this.view.eventManager.fire('sourceUpdated');
};

/**
 * Updates the content's activity_uri that of what the user input
 * 
 * TODO: rename MWNode
 */
View.prototype.MWNode.updateCmlUrl = function(){
	/* update content */
	this.content.activity_uri = $('#cmlUrlInput').val();
	
	/*
	 * fire source updated event, this will update the preview
	 */
	this.view.eventManager.fire('sourceUpdated');
};

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	/*
	 * TODO: rename mw to your new folder name
	 * TODO: rename authorview_mw
	 * 
	 * e.g. if you were creating a quiz step it would look like
	 * 
	 * eventManager.fire('scriptLoaded', 'vle/node/quiz/authorview_quiz.js');
	 */
	eventManager.fire('scriptLoaded', 'vle/node/mw/authorview_mw.js');
};