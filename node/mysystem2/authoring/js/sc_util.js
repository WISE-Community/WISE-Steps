/*globals SCUtil */

SCUtil = {};

SCUtil.uuid = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};



SCUtil.dataHashProperty = function(key, value) {
  if( !this.get('dataHash')) {
    this.set('dataHash', {});
  }
  if( value === undefined) {
    return this.get('dataHash')[key];
  } else {
    this.get('dataHash')[key] = value;
    this.set('rev', this.get('rev') + 1);
    return value;
  }
}.property();

SCUtil.ModelObject = SC.Object.extend({
  dataHash: null,
  defaultDataHash: null,
  rev: 0,
  init: function() {
    this._super();
    
    if(!this.get('dataHash')) {
      var dataHash = {};
      if(this.get('defaultDataHash')){
        jQuery.extend(true, dataHash, this.get('defaultDataHash'));
      }
      this.set('dataHash', dataHash); 
    }
  }
});

SCUtil.UUIDModel = SC.Mixin.create({
  uuid: SCUtil.dataHashProperty,
  
  init: function() {
    if(SC.none(this.get('uuid'))){
      this.set('uuid', SCUtil.uuid());
    }
  }
});

SCUtil.ModelArray = SC.ArrayProxy.extend({
  // this will point to the dataHashs represnting the models
  content: null,

  // this points to the cached model objects
  modelObjects: null,

  // type of model object to create
  modelType: null,

  // useful when the content is coming from iframe that isn't using SC
  setExternalContent: function(dataHash) {
    SC.NativeArray.apply(dataHash);
    this.set('content', dataHash);
  },

  objectAtContent: function(idx) {
    var data = this.get('content').objectAt(idx),
        model = null;

    this.get('modelObjects').forEach(function (cur_model){
      if(cur_model.get('dataHash') === data){
        model = cur_model;
      }
    });

    if (!model) {
      model = this.get('modelType').create({dataHash: data});
      this.get('modelObjects').add(model);
    }
    return model;
  },

  replaceContent: function(idx, amt, objects) {
    var dataObjects = null;
    if(objects){
      dataObjects = [];
      objects.forEach(function (model){
        dataObjects.push(model.get('dataHash'));
      });
    }

    this.get('content').replace(idx, amt, dataObjects);

    // we should clean up the cached model objects
    // we don't need to actually add the model objects they will be created as they are requested
  },

  createItem: function() {
    this.pushObject(this.get('modelType').create());
  },

  removeItem: function(button){
    this.removeObject(button.get('item'));
  },

  init: function() {
    this._super();
    this.set('modelObjects', SC.Set.create());
  },

  _contentWillChange: function () {
    this.get('modelObjects').forEach(function(model){
      model.destroy();
    });
    this.set('modelObjects', SC.Set.create());
  }.observesBefore('content')
});

SCUtil.SelectOption = SC.View.extend({
  tagName: 'option',
  content: null,

  render: function(buffer) {
    buffer.push(this.getPath('content'));
  },

  _contentDidChange: function() {
    this.$().text(this.get('content'));
  }.observes('content')
});

SCUtil.Select = SC.CollectionView.extend({
  tagName: 'select',
  itemViewClass: SCUtil.SelectOption,
  
  value: null,
  
  willInsertElement: function() {
    // make sure the value has something since null is not displayed in the UI
    if(SC.none(this.get('value'))){
      this.set('value', this.get('content').objectAt(0));
    }

    // make sure the view value matches the model
    // I tried using an attributeBinding on 'value' 
    // but just setting the 'value' attribute on a select element doesn't necessarly update
    // the UI.
    this.$().val(this.get('value'));
  },
  
  change: function(event) {
    this.set('value', this.$().val());
    return false;
  }
});


