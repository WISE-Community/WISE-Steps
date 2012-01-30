function SetupNodes() {
};

/*
 * This array specifies what step types will be available in the vle.
 * If you want a step type to be available in the vle, you must add
 * an object to the array below that contains the nodeName and 
 * nodeSetupPath
 */
SetupNodes.setupFiles = [
	{
		nodeName:"AssessmentListNode",
		nodeSetupPath:"vle/node/assessmentlist/setup.js"
	},
	{
		nodeName:"BrainstormNode",
		nodeSetupPath:"vle/node/brainstorm/setup.js"
	},
	{
		nodeName:"DataGraphNode",
		nodeSetupPath:"vle/node/datagraph/setup.js"
	},
	{
		nodeName:"SVGDrawNode",
		nodeSetupPath:"vle/node/draw/setup.js"
	},
	{
		nodeName:"FillinNode",
		nodeSetupPath:"vle/node/fillin/setup.js"
	},
	{
		nodeName:"HtmlNode",
		nodeSetupPath:"vle/node/html/setup.js"
	},
	{
		nodeName:"MatchSequenceNode",
		nodeSetupPath:"vle/node/matchsequence/setup.js"
	},
	{
		nodeName:"MultipleChoiceNode",
		nodeSetupPath:"vle/node/multiplechoice/setup.js"
	},
	{
		nodeName:"ChallengeNode",
		nodeSetupPath:"vle/node/multiplechoice/setup.js"
	},
	{
		nodeName:"MWNode",
		nodeSetupPath:"vle/node/mw/setup.js"
	},
	{
		nodeName:"MySystemNode",
		nodeSetupPath:"vle/node/mysystem/setup.js"
	},
	{
		nodeName:"OpenResponseNode",
		nodeSetupPath:"vle/node/openresponse/setup.js"
	},
	{
		nodeName:"NoteNode",
		nodeSetupPath:"vle/node/openresponse/setup.js"
	},
	{
		nodeName:"OutsideUrlNode",
		nodeSetupPath:"vle/node/outsideurl/setup.js"
	},
	{
		nodeName:"SensorNode",
		nodeSetupPath:"vle/node/sensor/setup.js"
	},
	{
		nodeName:"TemplateNode",
		nodeSetupPath:"vle/node/template/setup.js"
	},
	{
		nodeName:"ExplanationBuilderNode",
		nodeSetupPath:"vle/node/explanationbuilder/setup.js"
	},
	{
		nodeName:"TableNode",
		nodeSetupPath:"vle/node/table/setup.js"
	},
	{
		nodeName:"IdeaBasketNode",
		nodeSetupPath:"vle/node/ideabasket/setup.js"
	},
	{
		nodeName:"CarGraphNode",
		nodeSetupPath:"vle/node/cargraph/setup.js"
	},
	{
		nodeName:"SeasonsNode",
		nodeSetupPath:"vle/node/seasons/setup.js"
	},
	{
		nodeName:"SurgeNode",
		nodeSetupPath:"vle/node/surge/setup.js"
	},
	{
		nodeName:"Mysystem2Node",
		nodeSetupPath:"vle/node/mysystem2/setup.js"
	},
	{
		nodeName:"FlashNode",
		nodeSetupPath:"vle/node/flash/setup.js"
	},
	{
		nodeName:"BranchingNode",
		nodeSetupPath:"vle/node/branching/setup.js"
	}
];

//insert the setup paths into the scriptloader so they will be loaded
scriptloader.insertSetupPaths(SetupNodes.setupFiles);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/setupNodes.js');
};