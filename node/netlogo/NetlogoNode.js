
NetLogoNode.prototype = new Node();
NetLogoNode.prototype.constructor = NetLogoNode;
NetLogoNode.prototype.parent = Node.prototype;
NetLogoNode.authoringToolName = "NetLogo";
NetLogoNode.authoringToolDescription = "Students work on a NetLogo activity";

/**
 * @constructor
 * @extends Node
 * @param nodeType
 * @param view
 * @returns {NetLogoNode}
 */
function NetLogoNode(nodeType, view) {
	this.view = view;
	this.type = nodeType;
	this.content = null;
	this.audios = [];
	this.contentBase;
	this.audioSupported = true;	
}

NetLogoNode.prototype.getHTMLContentTemplate = function() {
	return createContent('node/netlogo/netlogo.html');
};

NodeFactory.addNode('NetLogoNode', NetLogoNode);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/netlogo/NetLogoNode.js');
};