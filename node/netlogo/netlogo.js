
/**
 * @constructor
 * @param node
 * @returns
 */
function NetLogo(node) {
	this.node = node;
	this.content = node.getContent().getContentJSON();
}

NetLogo.prototype.render = function(){
	//display any into content to the student
	$('#promptDiv').html(this.content.prompt);

	// load the Netlogo jar and activity
	var archive = 'NetLogoLite.jar';
	if(this.content.version == '5'){
		archive = 'NetLogoLite5.jar';
	}
	var applet = '<applet code="org.nlogo.lite.Applet" codebase="/vlewrapper/vle/node/netlogo/"' +  
        'archive="' + archive + '" width="' + this.content.width + '" height="' + this.content.height + '">' +
        '<param name="DefaultModel" value="' + this.content.activity_uri + '">' +
        '</applet>';
	$('#netlogo_wrapper').html(applet);
};


//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/netlogo/netlogo.js');
};