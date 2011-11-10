/**
 * Sets the SVGDrawNode type as an object of this view
 * @constructor
 * @author patrick lawler
 */
View.prototype.SVGDrawNode = {};
View.prototype.SVGDrawNode.commonComponents = ['Prompt', 'LinkTo'];

/**
 * Generates the authoring page for svg draw node types
 */
View.prototype.SVGDrawNode.generatePage = function(view){
	this.view = view;
	this.content = this.view.activeContent.getContentJSON();
	
	this.maxSnaps = 10; // default max allowed snapshots
	
	var parent = document.getElementById('dynamicParent');
	
	/* wipe out old */
	parent.removeChild(document.getElementById('dynamicPage'));
	
	/* create new */
	var pageDiv = createElement(document, 'div', {id:'dynamicPage', style:'width:100%;height:100%'});
	var optDiv = createElement(document, 'div', {id: 'optionsDiv'});
	var toolbarOptionsDiv = createElement(document, 'div', {id: 'toolbarOptionsDiv'});
	var snapshotOptionDiv = createElement(document, 'div', {id: 'snapshotOptionDiv'});
	var snapMaxDiv = createElement(document, 'div', {id: 'snapMaxDiv'});
	var descriptionOptionDiv = createElement(document, 'div', {id: 'descriptionOptionDiv'});
	var backgroundDiv = createElement(document, 'div', {id: 'backgroundDiv'});
	var stampsDiv = createElement(document, 'div', {id:'stampsDiv'});
	
	parent.appendChild(pageDiv);
	pageDiv.appendChild(toolbarOptionsDiv);
	pageDiv.appendChild(snapshotOptionDiv);
	pageDiv.appendChild(snapMaxDiv);
	pageDiv.appendChild(createBreak());
	pageDiv.appendChild(descriptionOptionDiv);
	pageDiv.appendChild(createBreak());
	pageDiv.appendChild(document.createTextNode('Enter instructions for students (optional):'));
	pageDiv.appendChild(createBreak());
	pageDiv.appendChild(createElement(document, 'div', {id: 'promptContainer'}));
	pageDiv.appendChild(createBreak());
	pageDiv.appendChild(backgroundDiv);
	pageDiv.appendChild(createBreak());
	pageDiv.appendChild(stampsDiv);
	pageDiv.appendChild(createBreak());
	
	this.generateToolbarOptions();
	this.generateSnapshotOption();
	this.generateDescriptionOption();
	this.generateBackground();
	this.generateStamps();
};

/**
 * Get the array of common components which is an array with
 * string elements being the name of the common component
 */
View.prototype.SVGDrawNode.getCommonComponents = function() {
	return this.commonComponents;
};

/**
 * Generates the toolbar options for this svg draw
 */
View.prototype.SVGDrawNode.generateToolbarOptions = function(){
	var parent = document.getElementById('toolbarOptionsDiv');
	
	var toolbarHtml = 'Select which drawing tools to enable:<br />';
	toolbarHtml += '<form>';
	toolbarHtml += '<input type="checkbox" name="toolbarCbx" id="pencilCbx" checked="checked" onclick="eventManager.fire(\'svgdrawToolbarOptionsChanged\')"/> <img alt="pencil" src="node/draw/svg-edit/images/fhpath.png" /> Pencil (freehand)*<br />';
	toolbarHtml += '<input type="checkbox" name="toolbarCbx" id="lineCbx" checked="checked" onclick="eventManager.fire(\'svgdrawToolbarOptionsChanged\')"/> <img alt="line" src="node/draw/svg-edit/images/line.png" /> Line<br />';
	toolbarHtml += '<input type="checkbox" name="toolbarCbx" id="connectorCbx" checked="checked" onclick="eventManager.fire(\'svgdrawToolbarOptionsChanged\')"/> <object data="node/draw/svg-edit/images/conn.svg" type="image/svg+xml" style="width:24px; height:24px;"></object> Connector<br />';
	toolbarHtml += '<input type="checkbox" name="toolbarCbx" id="rectangleCbx" checked="checked" onclick="eventManager.fire(\'svgdrawToolbarOptionsChanged\')"/> <img alt="rectangle" src="node/draw/svg-edit/images/rect.png" /> Rectangle/Square<br />';
	toolbarHtml += '<input type="checkbox" name="toolbarCbx" id="ellipseCbx" checked="checked" onclick="eventManager.fire(\'svgdrawToolbarOptionsChanged\')"/> <img alt="ellipse" src="node/draw/svg-edit/images/ellipse.png" /> Ellipse/Circle<br />';
	toolbarHtml += '<input type="checkbox" name="toolbarCbx" id="polygonCbx" checked="checked" onclick="eventManager.fire(\'svgdrawToolbarOptionsChanged\')"/> <img alt="polygon" src="node/draw/svg-edit/images/path.png" /> Polygon<br />';
	toolbarHtml += '<input type="checkbox" name="toolbarCbx" id="textCbx" checked="checked" onclick="eventManager.fire(\'svgdrawToolbarOptionsChanged\')"/> <img alt="text" src="node/draw/svg-edit/images/text.png" /> Text<br />';
	toolbarHtml += '</form>';
	
	parent.innerHTML = toolbarHtml;
	
	if(this.content.toolbar_options){
		if (this.content.toolbar_options.pencil){
			document.getElementById('pencilCbx').checked = true;
		} else {
			document.getElementById('pencilCbx').checked = false;
		}
		if (this.content.toolbar_options.line){
			document.getElementById('lineCbx').checked = true;
		} else {
			document.getElementById('lineCbx').checked = false;
		}
		if (this.content.toolbar_options.connector){
			document.getElementById('connectorCbx').checked = true;
		} else {
			document.getElementById('connectorCbx').checked = false;
		}
		if (this.content.toolbar_options.rectangle){
			document.getElementById('rectangleCbx').checked = true;
		} else {
			document.getElementById('rectangleCbx').checked = false;
		}
		if (this.content.toolbar_options.ellipse){
			document.getElementById('ellipseCbx').checked = true;
		} else {
			document.getElementById('ellipseCbx').checked = false;
		}
		if (this.content.toolbar_options.polygon){
			document.getElementById('polygonCbx').checked = true;
		} else {
			document.getElementById('polygonCbx').checked = false;
		}
		if (this.content.toolbar_options.text){
			document.getElementById('textCbx').checked = true;
		} else {
			document.getElementById('textCbx').checked = false;
		}
	}
	this.generateSnapshotMaxOption();
};

/**
 * Generates the snapshot option for this svg draw
 */
View.prototype.SVGDrawNode.generateSnapshotOption = function(){
	var parent = document.getElementById('snapshotOptionDiv');
	
	var snapshotHtml = 'Enable Flipbook Animator (frames)?<br/>';
	if(this.content.snapshots_active){
		snapshotHtml += '<input type="radio" name="snapshotRadio" id="sRadioTrue" value="true" CHECKED onclick="eventManager.fire(\'svgdrawSnapshotOptionChanged\')"/> Yes<br/>';
		snapshotHtml += '<input type="radio" name="snapshotRadio" id="sRadioFalse" value="false" onclick="eventManager.fire(\'svgdrawSnapshotOptionChanged\')"/> No<br/>';
	} else {
		snapshotHtml += '<input type="radio" name="snapshotRadio" id="sRadioTrue" value="true" onclick="eventManager.fire(\'svgdrawSnapshotOptionChanged\')"/> Yes<br/>';
		snapshotHtml += '<input type="radio" name="snapshotRadio" id="sRadioFalse" value="false" CHECKED onclick="eventManager.fire(\'svgdrawSnapshotOptionChanged\')"/> No<br/>';
	};
	
	parent.innerHTML = snapshotHtml;
};

/**
 * Generates the snapshot number option for this svg draw
 */
View.prototype.SVGDrawNode.generateSnapshotMaxOption = function(){
	var parent = document.getElementById('snapMaxDiv');
	
	var snapshotMaxHtml = 'What is the maximum number of frames (snapshots) students can create?<br/>';
	snapshotMaxHtml += '<select id="snapMaxInput" disabled="disabled" onchange="eventManager.fire(\'svgdrawSnapshotMaxOptionChanged\')">' + 
		'<option value="2">2</option>' +
		'<option value="3">3</option>' +
		'<option value="4">4</option>' +
		'<option value="5">5</option>' +
		'<option value="6">6</option>' +
		'<option value="7">7</option>' +
		'<option value="8">8</option>' +
		'<option value="9">9</option>' +
		'<option value="10">10</option>' +
		'<option value="11" class="noPencil">11</option>' +
		'<option value="12" class="noPencil">12</option>' +
		'<option value="13" class="noPencil">13</option>' +
		'<option value="14"class="noPencil" >14</option>' +
		'<option value="15" class="noPencil">15</option>' +
		'<option value="16" class="noPencil">16</option>' +
		'<option value="17" class="noPencil">17</option>' +
		'<option value="18" class="noPencil">18</option>' +
		'<option value="19" class="noPencil">19</option>' +
		'<option value="20" class="noPencil">20</option>' +
		'</select>';
	
	parent.innerHTML = snapshotMaxHtml;
	
	if(this.content.snapshots_max > 0){
		$("#snapMaxInput").val(this.content.snapshots_max);
	} else {
		this.content.snapshots_max = this.maxSnaps; // set default max snapshots
		$("#snapMaxInput").val(this.maxSnaps.toString());
	}
	
	if(this.content.snapshots_active){
		document.getElementById('snapMaxInput').disabled = false;
	}
	
	this.toolbarOptionsChanged();
};

/**
 * Generates the description option for this svg draw
 */
View.prototype.SVGDrawNode.generateDescriptionOption = function(){
	var parent = document.getElementById('descriptionOptionDiv');
	
	/* wipe out old */
	parent.innerHTML = '';
	
	/* create new */
	var	descriptionHtml = 'Allow students to write descriptions of their drawings?<br/>';
	descriptionHtml += '<input type="radio" name="descriptionRadio" id="dRadioTrue" value="true" onclick="eventManager.fire(\'svgdrawDescriptionOptionChanged\')"/> Yes<br/>';
	descriptionHtml += '<input type="radio" name="descriptionRadio" id="dRadioFalse" value="false" CHECKED onclick="eventManager.fire(\'svgdrawDescriptionOptionChanged\')"/> No<br/>';
	descriptionHtml += 'Default description (optional): <input type="text" size="45" id="defaultDescriptionInput" disabled="disabled" onkeyup="eventManager.fire(\'svgdrawDefaultDescriptionChanged\')" onclick="eventManager.fire(\'svgdrawDescriptionClicked\')"/>';
	
	parent.innerHTML = descriptionHtml;
	
	/* set values based on current content */
	if(this.content.description_active){
		document.getElementById('dRadioTrue').checked = true;
		document.getElementById('defaultDescriptionInput').disabled = false;
	} else {
		document.getElementById('dRadioFalse').checked = true;
		document.getElementById('defaultDescriptionInput').disabled = true;
	};
	
	document.getElementById('defaultDescriptionInput').value = this.content.description_default;
};

/**
 * Generates the background prompt for this svg draw node
 */
View.prototype.SVGDrawNode.generateBackground = function(){
	var parent = document.getElementById('backgroundDiv');
	
	/* wipe out old */
	while(parent.firstChild){
		parent.removeChild(parent.firstChild);
	};
	
	/* create new */
	var text = document.createTextNode('Enter svg xml string to specify a background image. If no background image is desired, leave blank.');
	var backgroundPathInput = createElement(document, 'input', {type:'text', size:'30', id:'backgroundPathInput', onchange:'eventManager.fire("svgdrawBackgroundChanged")'});
	
	if(this.content.svg_background){
		backgroundPathInput.value = this.content.svg_background;
	} else {
		this.content.svg_background = "";
	};
	
	parent.appendChild(text);
	parent.appendChild(createBreak());
	parent.appendChild(backgroundPathInput);
};

/**
 * Generates the stamps element for this svg draw node
 */
View.prototype.SVGDrawNode.generateStamps = function(){
	var parent = document.getElementById('stampsDiv');
	
	/* wipe out old */
	while(parent.firstChild){
		parent.removeChild(parent.firstChild);
	};
	
	/* create new */
	var addStampButt = createElement(document, 'input', {type:'button', id:'addStampButton', value:'Add New Stamp', onclick:'eventManager.fire("svgdrawAddNewStamp")'});
	parent.appendChild(addStampButt);
	parent.appendChild(createBreak());
	
	/* generate stamp elements for each stamp that is specified in the content */
	for(var o=0;o<this.content.stamps.length;o++){
		var sText = document.createTextNode('# ' + (o + 1) + ' ');
		var sLabelText = document.createTextNode('Title: ');
		var sValueText = document.createTextNode('URI: ');
		var sWidthText = document.createTextNode('Width: ');
		var sHeightText = document.createTextNode('Height: ');
		var sLabelInput = createElement(document, 'input', {type:'text', size:'10', id:'stampLabelInput_' + o, value:this.content.stamps[o].title, onchange:'eventManager.fire("svgdrawStampLabelChanged","' + o + '")', onclick:'eventManager.fire("svgdrawStampTitleClicked","' + o + '")'});
		var sInput = createElement(document, 'input', {type:'text', size:'15', id:'stampInput_' + o, value:this.content.stamps[o].uri, onchange:'eventManager.fire("svgdrawStampValueChanged","' + o + '")'});
		var sWidthInput = createElement(document, 'input', {type:'text', size:'5', id:'stampWidthInput_' + o, value:this.content.stamps[o].width, onchange:'eventManager.fire("svgdrawStampWidthChanged","' + o + '")', onclick:'eventManager.fire("svgdrawStampWidthClicked","' + o + '")'});
		var sHeightInput = createElement(document, 'input', {type:'text', size:'5', id:'stampHeightInput_' + o, value:this.content.stamps[o].height, onchange:'eventManager.fire("svgdrawStampHeightChanged","' + o + '")', onclick:'eventManager.fire("svgdrawStampHeightClicked","' + o + '")'});
		var removeButt = createElement(document, 'input', {type:'button', id:'removeButt_' + o, value:'remove stamp', onclick:'eventManager.fire("svgdrawRemoveStamp","' + o + '")'});
		parent.appendChild(sText);
		parent.appendChild(sLabelText);
		parent.appendChild(sLabelInput);
		parent.appendChild(createSpace());
		parent.appendChild(sValueText);
		parent.appendChild(sInput);
		parent.appendChild(createSpace());
		parent.appendChild(sWidthText);
		parent.appendChild(sWidthInput);
		parent.appendChild(createSpace());
		parent.appendChild(sHeightText);
		parent.appendChild(sHeightInput);
		parent.appendChild(createSpace());
		parent.appendChild(removeButt);
		parent.appendChild(createBreak());
	};
};

/**
 * Updates the toolbar_options value of the content to the user specified value
 * and refreshes the preview.
 */
View.prototype.SVGDrawNode.toolbarOptionsChanged = function(){
	var options = document.getElementsByName('toolbarCbx');
	
	// set initial toolbar_options variable if not yet defined
	if(this.content.toolbar_options == null || typeof this.content.toolbar_options == 'undefined'){
		this.content.toolbar_options = {};
	}
	
	for(var i=0;i<options.length;i++){
		var current = $(options[i]).attr('id').replace('Cbx','');
		var isActive = false;
		if(options[i].checked){
			isActive = true;
		}
		
		if(current == 'pencil'){
			this.content.toolbar_options.pencil = isActive;
			if(isActive){
				if(this.content.snapshots_max > 10){
					this.content.snapshots_max = 10;
					document.getElementById('snapMaxInput').options[8].selected = true;
				}
				$('#snapMaxInput option.noPencil').attr('disabled', 'disabled');
			} else {
				$('#snapMaxInput option.noPencil').removeAttr('disabled');
			}
		} else if (current == 'line'){
			this.content.toolbar_options.line = isActive;
		} else if (current == 'connector'){
			this.content.toolbar_options.connector = isActive;
		} else if (current == 'rectangle'){
			this.content.toolbar_options.rectangle = isActive;
		} else if (current == 'ellipse'){
			this.content.toolbar_options.ellipse = isActive;
		} else if (current == 'polygon'){
			this.content.toolbar_options.polygon = isActive;
		} else if (current == 'text'){
			this.content.toolbar_options.text = isActive;
		}
	}
	
	/* fire source updated event */
	this.view.eventManager.fire('sourceUpdated');
};

/**
 * Updates the snapshots_active value of the content to the user specified value
 * and refreshes the preview.
 */
View.prototype.SVGDrawNode.snapshotOptionChanged = function(){
	var rads = document.getElementsByName('snapshotRadio');
	
	for(var a=0;a<rads.length;a++){
		if(rads[a].checked){
			if(rads[a].value=='true'){
				this.content.snapshots_active = true;
				document.getElementById('snapMaxInput').disabled = false;
			} else {
				this.content.snapshots_active = false;
				document.getElementById('snapMaxInput').disabled = true;
			};
		};
	};
	
	/* fire source updated event */
	this.view.eventManager.fire('sourceUpdated');
};

/**
 * Updates the snapshots_max value of the content to the user specified value
 * and refreshes the preview.
 */
View.prototype.SVGDrawNode.snapshotMaxChanged = function(){
	var snapMax = document.getElementById('snapMaxInput').value;
	this.content.snapshots_max = parseInt(snapMax);
	/* fire source updated event */
	this.view.eventManager.fire('sourceUpdated');
};

/**
 * Updates the description_active value of the content to the user specified value
 * and refreshes the preview.
 */
View.prototype.SVGDrawNode.descriptionOptionChanged = function(){
	var rads = document.getElementsByName('descriptionRadio');
	var descriptionInput = document.getElementById('defaultDescriptionInput');
	
	for(var b=0;b<rads.length;b++){
		if(rads[b].checked){
			if(rads[b].value=='true'){
				this.content.description_active = true;
				descriptionInput.disabled = false;
			} else {
				this.content.description_active = false;
				descriptionInput.disabled = true;
			};
		};
	};
	
	/* fire source updated event */
	this.view.eventManager.fire('sourceUpdated');
};

/**
 * Updates the default description value of the content to the user specified value
 * and refreshes the preview.
 */
View.prototype.SVGDrawNode.defaultDescriptionChanged = function(){
	this.content.description_default = document.getElementById('defaultDescriptionInput').value;
	
	/* fire source updated event */
	this.view.eventManager.fire('sourceUpdated');
};

View.prototype.SVGDrawNode.populatePrompt = function() {
	$('#promptInput').val(this.content.prompt);
};

/**
 * Updates the prompt value of the content to the user specified value and 
 * refreshes the preview.
 */
View.prototype.SVGDrawNode.updatePrompt = function(){
	this.content.prompt = document.getElementById('promptInput').value;
	
	/* fire source updated event */
	this.view.eventManager.fire('sourceUpdated');
};

/**
 * Updates the path of the background image that the user specified in the content
 * and refreshes the preview.
 */
View.prototype.SVGDrawNode.backgroundChanged = function(){
	this.content.svg_background = document.getElementById('backgroundPathInput').value;
	
	/* fire source updated event */
	this.view.eventManager.fire('sourceUpdated');
};

/**
 * Adds a new stamp to the content then refreshes the stamps and updates the preview
 */
View.prototype.SVGDrawNode.addNewStamp = function(){
	this.content.stamps.push({title:'enter title', uri:'', width:0, height:0});
	
	this.generateStamps();
	
	/* fire source updated event */
	this.view.eventManager.fire('sourceUpdated');
};

/**
 * Updates the value of the stamp uri in the content for the given index and
 * refreshes the preview.
 */
View.prototype.SVGDrawNode.stampValueChanged = function(ndx){
	this.content.stamps[ndx].uri = document.getElementById('stampInput_' + ndx).value;
	
	/* fire source updated event */
	this.view.eventManager.fire('sourceUpdated');
};

/**
 * Updates the value of the stamp title in the content for the given index and
 * refreshes the preview.
 */
View.prototype.SVGDrawNode.stampLabelChanged = function(ndx){
	this.content.stamps[ndx].title = document.getElementById('stampLabelInput_' + ndx).value;
	
	/* fire source updated event */
	this.view.eventManager.fire('sourceUpdated');
};

/**
 * Updates the value of the stamp width in the content for the given index and
 * refreshes the preview.
 */
View.prototype.SVGDrawNode.stampWidthChanged = function(ndx){
	var val = document.getElementById('stampWidthInput_' + ndx).value;
	
	if(this.isValidNumber(val)){
		this.content.stamps[ndx].width = parseInt(val);
		
		/* fire source updated event */
		this.view.eventManager.fire('sourceUpdated');
	} else {
		this.view.notificationManager.notify('The value entered for the stamp width ' + val + ' is not valid. You must enter a whole number greater or equal to 0.', 3);
		document.getElementById('stampWidthInput_' + ndx).value = this.content.stamps[ndx].width;
	};
};

/**
 * Updates the value of the stamp height in the content for the given index and
 * refreshes the preview.
 */
View.prototype.SVGDrawNode.stampHeightChanged = function(ndx){
	var val = document.getElementById('stampHeightInput_' + ndx).value;
	
	if(this.isValidNumber(val)){
		this.content.stamps[ndx].height = parseInt(val);
		
		/* fire source updated event */
		this.view.eventManager.fire('sourceUpdated');
	} else {
		this.view.notificationManager.notify('The value entered for the stamp height ' + val + ' is not valid. You must enter a whole number greater or equal to 0.', 3);
		document.getElementById('stampHeightInput_' + ndx).value = this.content.stamps[ndx].height;
	};
};

/**
 * Returns true if the given num is a not undefined or null, is a whole number and
 * is greater or equal to 0, returns false otherwise.
 */
View.prototype.SVGDrawNode.isValidNumber = function(num){
	if(num && !isNaN(num) && num>=0 && num.indexOf('.')==-1){
		return true;
	} else {
		return false;
	};
};

/**
 * Removes the stamp of the given index from the content, then refreshes
 * the stamp html elements and the preview.
 */
View.prototype.SVGDrawNode.removeStamp = function(ndx){
	this.content.stamps.splice(ndx, 1);
	
	this.generateStamps();
	
	/* fire source updated event */
	this.view.eventManager.fire('sourceUpdated');
};

/**
 * Clears the title value of the stamp with the given index if it
 * is the default prompt.
 */
View.prototype.SVGDrawNode.stampTitleClicked = function(ndx){
	var title = document.getElementById('stampLabelInput_' + ndx);
	if(title.value=='enter title'){
		title.value = '';
	};
};

/**
 * Clears the default description value of the stamp with the given index if it
 * is default default description.
 */
View.prototype.SVGDrawNode.descriptionClicked = function(){
	var desc = document.getElementById('defaultDescriptionInput');
	if(desc.value=='Enter description here.'){
		desc.value = '';
	};
};

/**
 * Clears the default width value of the stamp with the given index if it
 * is default width.
 */
View.prototype.SVGDrawNode.stampWidthClicked = function(ndx){
	var width = document.getElementById('stampWidthInput_' + ndx);
	if(width.value==0){
		width.value = '';
	};
};

/**
 * Clears the default height value of the stamp with the given index if it
 * is default height.
 */
View.prototype.SVGDrawNode.stampHeightClicked = function(ndx){
	var height = document.getElementById('stampHeightInput_' + ndx);
	if(height.value==0){
		height.value = '';
	};
};

/**
 * Updates this content object when requested, usually when preview is to be refreshed
 */
View.prototype.SVGDrawNode.updateContent = function(){
	/* update content object */
	this.view.activeContent.setContent(this.content);
};

//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/draw/authorview_svgdraw.js');
};