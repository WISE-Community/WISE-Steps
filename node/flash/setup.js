var coreScripts = [
	'vle/node/flash/FlashNode.js',
	'vle/node/flash/flashEvents.js'
];

var coreMinScripts = [
	'vle/node/flash/FlashNode.js'
	//'vle/node/flash/flash_core_min.js'
];

var studentVLEScripts = [
	'vle/node/flash/flash.js',
	'vle/node/flash/flashState.js',
	'vle/jquery/js/jquery-1.6.1.min.js',
	'vle/jquery/js/jquery-ui-1.8.7.custom.min.js',
	'vle/swfobject/swfobject.js'
];

var authorScripts = [
	'vle/node/flash/authorview_flash.js'
];

var gradingScripts = [
	'vle/node/flash/flashState.js'
];

var dependencies = [
	{child:"vle/node/flash/FlashNode.js", parent:["vle/node/Node.js"]}
];

var nodeClasses = [
	{nodeClass:'simulation', nodeClassText:'Flash'}
];

scriptloader.addScriptToComponent('core', coreScripts);
scriptloader.addScriptToComponent('core_min', coreMinScripts);
scriptloader.addScriptToComponent('flash', studentVLEScripts);
scriptloader.addScriptToComponent('author', authorScripts);
scriptloader.addScriptToComponent('studentwork', gradingScripts);
scriptloader.addScriptToComponent('studentwork_min', gradingScripts);
scriptloader.addDependencies(dependencies);

var css = [
	//"vle/node/flash/flash.css"
];

scriptloader.addCssToComponent('flash', css);

componentloader.addNodeClasses('FlashNode', nodeClasses);

var nodeTemplateParams = [
   	{
   		nodeTemplateFilePath:'node/flash/flashTemplate.fl',
   		nodeExtension:'fl'
   	}
];

componentloader.addNodeTemplateParams('FlashNode', nodeTemplateParams);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/flash/setup.js');
};