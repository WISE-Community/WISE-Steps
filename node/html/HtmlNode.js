/*
 * HtmlNode
 */

HtmlNode.prototype = new Node();
HtmlNode.prototype.constructor = HtmlNode;
HtmlNode.prototype.parent = Node.prototype;
HtmlNode.authoringToolName = "Text/HTML Page";
HtmlNode.authoringToolDescription = "Students read information from an HTML page";

/**
 * @constructor
 * @extends Node
 * @param nodeType
 * @param view
 * @returns {HtmlNode}
 */
function HtmlNode(nodeType, view) {
	this.view = view;
	this.type = nodeType;
	this.audios = [];
	this.contentBase;
	this.audioSupported = true;
	
	this.selfRendering = true;
}

HtmlNode.prototype.setHtmlContent = function(htmlContent) {
	//update the htmlContent attribute that contains the html
	this.content.setContent(htmlContent);
};

/**
 * Takes in a state JSON object and returns an HTMLSTATE object
 * @param nodeStatesJSONObj a state JSON object
 * @return an HTMLSTATE object
 */
HtmlNode.prototype.parseDataJSONObj = function(stateJSONObj) {
	return HTMLSTATE.prototype.parseDataJSONObj(stateJSONObj);
};


HtmlNode.prototype.exportNode = function() {
	var exportXML = "";
	
	exportXML += this.exportNodeHeader();
	
	exportXML += "<content><![CDATA[";
	exportXML += this.element.getElementsByTagName("content")[0].firstChild.nodeValue;
	exportXML += "]]></content>";
	
	exportXML += this.exportNodeFooter();
	
	return exportXML;
};

HtmlNode.prototype.doNothing = function() {
	window.frames["ifrm"].document.open();
	window.frames["ifrm"].document.write(this.injectBaseRef(this.elementText));
	window.frames["ifrm"].document.close();
};

/**
 * Not used
 */
HtmlNode.prototype.getHTMLContentTemplate = function() {
	return createContent('');
};

NodeFactory.addNode('HtmlNode', HtmlNode);

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/html/HtmlNode.js');
};