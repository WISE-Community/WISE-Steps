var coreScripts = [
    /*
     * TODO: rename template
     * TODO: rename TemplateNode.js
     * 
     * For example if you are creating a quiz node you would change it to
     * 'vle/node/quiz/QuizNode.js'
     */
	'vle/node/ideabasket/IdeaBasketNode.js',
	/*
     * TODO: rename template
     * TODO: rename templateEvents.js
     * 
     * For example if you are creating a quiz node you would change it to
     * 'vle/node/quiz/QuizEvents.js'
	 */
	'vle/node/ideabasket/ideaBasketEvents.js'
];

var coreMinScripts = ['vle/node/ideabasket/ideabasket_core_min.js'];

var studentVLEScripts = [
	/*
     * TODO: rename template
     * TODO: rename templatestate.js
     * 
     * For example if you are creating a quiz node you would change it to
     * 'vle/node/quiz/quizstate.js'
	 */
	'vle/node/ideabasket/ideaBasketState.js',
    'vle/jquery/js/jquery-1.6.1.min.js',
	'vle/jquery/js/jquery-ui-1.8.7.custom.min.js',
	'vle/jquery/js/jquery-validate/jquery.validate.pack.js',
	'vle/jquery/js/jquery.form.js',
	'vle/jquery/js/jsonplugin.js',
	'vle/jquery/js/jquery.tablesorter.min.js',
	'vle/ideaBasket/basket.js',
	'vle/ideaBasket/ideaBasketScript.js'
];

var authorScripts = [
	/*
	 * TODO: rename template
	 * TODO: rename authorview_template.js
	 * 
	 * For example if you are creating a quiz node you would change it to
	 * 'vle/node/quiz/authorview_quiz.js'
	 */
	'vle/node/ideabasket/authorview_ideaBasket.js'
];

var gradingScripts = [
  	/*
	 * TODO: rename template
	 * TODO: rename templatestate.js
	 * 
	 * For example if you are creating a quiz node you would change it to
	 * 'vle/node/quiz/quizstate.js'
	 */
	'vle/node/ideabasket/ideaBasketState.js'
];

var dependencies = [
  	/*
	 * TODO: rename template
	 * TODO: rename TemplateNode.js
	 * 
	 * For example if you are creating a quiz node you would change it to
	 * 'vle/node/quiz/QuizNode.js'
	 */
	{child:"vle/node/ideabasket/IdeaBasketNode.js", parent:["vle/node/Node.js"]},
	{child:"vle/jquery/js/jquery.tablesorter.min.js", parent:["vle/jquery/js/jquery-1.6.1.min.js"]}
];

/*
 * TODO: rename Template
 * 
 * For example if you are creating a quiz node you would change it to
 * 'Quiz'
 */
var nodeClasses = [
	{nodeClass:'ideabasket', nodeClassText:'Idea Basket'}
];

scriptloader.addScriptToComponent('core', coreScripts);
scriptloader.addScriptToComponent('core_min', coreMinScripts);

/*
 * TODO: rename template
 * 
 * For example if you are creating a quiz node you would change it to
 * 'quiz'
 */
scriptloader.addScriptToComponent('ideaBasket', studentVLEScripts);

scriptloader.addScriptToComponent('author', authorScripts);
scriptloader.addScriptToComponent('studentwork', gradingScripts);
scriptloader.addScriptToComponent('studentwork_min', gradingScripts);
scriptloader.addDependencies(dependencies);

/*
 * TODO: rename TemplateNode
 * 
 * For example if you are creating a quiz node you would change it to
 * 'QuizNode'
 */
componentloader.addNodeClasses('IdeaBasketNode', nodeClasses);

/*
 * TODO: rename the file path value
 * 
 * For example if you are creating a quiz node you would change it to
 * 'vle/node/quiz/quiz.css'
 */
var css = [
       	"vle/css/ideaManager/blue/style.css",
       	"vle/css/ideaManager/basket.css",
       	"vle/css/ideaManager/custom-theme/jquery-ui-1.8.7.custom.css",
       	"vle/css/ideaManager/jquery-validate/cmxformTemplate.css",
       	"vle/node/ideabasket/ideaBasket.css"
];

/*
 * TODO: rename template
 * 
 * For example if you are creating a quiz node you would change it to
 * 'quiz'
 */
scriptloader.addCssToComponent('ideaBasket', css);

var nodeTemplateParams = [
	{
		/*
		 * TODO: rename the file path value
		 * 
		 * For example if you are creating a quiz node you would change it to
		 * 'node/quiz/quizTemplate.qz'
		 */
		nodeTemplateFilePath:'node/ideabasket/ideaBasketTemplate.ib',
		
		/*
		 * TODO: rename the extension value for your step type, the value of the
		 * extension is up to you, we just use it to easily differentiate between
		 * different step type files
		 * 
		 * For example if you are creating a quiz node you would change it to
		 * 'qz'
		 */
		nodeExtension:'ib'
	}
];

/*
 * TODO: rename TemplateNode
 * 
 * For example if you are creating a quiz node you would change it to
 * 'QuizNode'
 */
componentloader.addNodeTemplateParams('IdeaBasketNode', nodeTemplateParams);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	/*
	 * TODO: rename template to your new folder name
	 * 
	 * For example if you were creating a quiz step it would look like
	 * 
	 * eventManager.fire('scriptLoaded', 'vle/node/quiz/setup.js');
	 */
	eventManager.fire('scriptLoaded', 'vle/node/ideabasket/setup.js');
};