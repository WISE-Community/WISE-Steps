var coreScripts = [
	'vle/node/assessmentlist/AssessmentListNode.js',
	'vle/node/assessmentlist/assessmentListEvents.js'
];

var coreMinScripts = [
	'vle/node/assessmentlist/assessmentlist_core_min.js'
];

var studentVLEScripts = [
   	'vle/jquery/js/jquery-1.6.1.min.js',
	'vle/node/assessmentlist/assessmentlist.js',
	'vle/node/assessmentlist/assessmentliststate.js',
	'vle/grading/Annotation.js',
	'vle/grading/Annotations.js',
];

var authorScripts = [
	'vle/node/assessmentlist/authorview_assessmentlist.js'
];

var gradingScripts = [
	'vle/node/assessmentlist/assessmentliststate.js'
];

var dependencies = [
	{child:"vle/node/assessmentlist/AssessmentListNode.js", parent:["vle/node/Node.js"]}
];

var css = [
	"vle/node/common/css/htmlAssessment.css",
	"vle/node/assessmentlist/assessmentlist.css",,
	"vle/jquery/css/custom-theme/jquery-ui-1.8.7.custom.css"
];

var nodeClasses = [
	{nodeClass:'instantquiz', nodeClassText:'Survey 1'},
	{nodeClass:'teacherquiz', nodeClassText:'Survey 2'}
];

scriptloader.addScriptToComponent('core', coreScripts);
scriptloader.addScriptToComponent('core_min', coreMinScripts);
scriptloader.addScriptToComponent('assessmentlist', studentVLEScripts);
scriptloader.addScriptToComponent('author', authorScripts);
scriptloader.addScriptToComponent('studentwork', gradingScripts);
scriptloader.addScriptToComponent('studentwork_min', gradingScripts);
scriptloader.addDependencies(dependencies);

scriptloader.addCssToComponent('assessmentlist', css);
scriptloader.addCssToComponent('author', css);

componentloader.addNodeClasses('AssessmentListNode', nodeClasses);

var nodeTemplateParams = [
    {
    	nodeTemplateFilePath:'node/assessmentlist/assessmentListTemplate.al',
    	nodeExtension:'al'
    }
];

componentloader.addNodeTemplateParams('AssessmentListNode', nodeTemplateParams);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/assessmentlist/setup.js');
};