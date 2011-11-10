/*
 * OutsideUrlNode
 */

OutsideUrlNode.prototype = new Node();
OutsideUrlNode.prototype.constructor = OutsideUrlNode;
OutsideUrlNode.prototype.parent = Node.prototype;
OutsideUrlNode.authoringToolName = "Outside Url";
OutsideUrlNode.authoringToolDescription = "Students see a webpage from the internet";

/**
 * @constructor
 * @extends Node
 * @param nodeType
 * @param view
 * @returns {OutsideUrlNode}
 */
function OutsideUrlNode(nodeType, view) {
	this.view = view;
	this.type = nodeType;
};

OutsideUrlNode.prototype.getUrl = function(){
	return this.content.getContentJSON().url;
};

OutsideUrlNode.prototype.getHTMLContentTemplate = function() {
	return createContent('node/outsideurl/outsideurl.html');
};

NodeFactory.addNode('OutsideUrlNode', OutsideUrlNode);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/outsideurl/OutsideUrlNode.js');
};