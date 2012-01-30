var coreScripts = [
	'vle/node/newlogo/NetlogoNode.js',
	'vle/node/Netlogo/NetlogoEvents.js'
];

var studentVLEScripts = [
	'vle/jquery/js/jquery-1.6.1.min.js',
];

var authorScripts = [
   	'vle/node/metlogo/authorview_Netlogo.js'
];

var gradingScripts = [
	'vle/node/Netlogo/Netlogostate.js'
];

var dependencies = [
	{child:"vle/node/Netlogo/NetlogoNode.js", parent:["vle/node/Node.js"]}
];

var nodeIconPath = 'node/template/icons/';

var css = [
	
];

var nodeClasses = [
	{nodeClass:'simulation', nodeClassText:'Netlogo'}
];

componentloader.addNodeIconPath('TemplateNode', nodeIconPath);

scriptloader.addScriptToComponent('core', coreScripts);
scriptloader.addScriptToComponent('core_min', coreScripts);
scriptloader.addScriptToComponent('Netlogo', studentVLEScripts);
scriptloader.addScriptToComponent('author', authorScripts);
scriptloader.addScriptToComponent('studentwork', gradingScripts);
scriptloader.addScriptToComponent('studentwork_min', gradingScripts);
scriptloader.addDependencies(dependencies);
scriptloader.addCssToComponent('Netlogo', css);

componentloader.addNodeClasses('NetlogoNode', nodeClasses);

var nodeTemplateParams = [
    {
        nodeTemplateFilePath:'node/Netlogo/NetlogoTemplate.nl',
        nodeExtension:'Netlogo'
    }
];

componentloader.addNodeTemplateParams('NetlogoNode', nodeTemplateParams);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/Netlogo/setup.js');
};