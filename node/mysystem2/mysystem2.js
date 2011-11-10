/*globals MYSYSTEM2STATE MySystem eventManager */

/**
 * This is the constructor for the object that will perform the logic for
 * the step when the students work on it. An instance of this object will
 * be created in the .html for this step (look at mysystem.html)
 * @constructor
 */
function Mysystem2(node,view) {
  this.node = node;
  this.content = node.getContent().getContentJSON();

  this.domIO = document.getElementById('my_system_state');
  
  if (typeof node.studentWork != 'undefined' && node.studentWork !== null) {
    this.states = node.studentWork; 
    
    MySystem.registerExternalSaveFunction(this.save, this);
    this.node.view.eventManager.subscribe('processPostResponseComplete', this.saveSuccessful);
    // MySystem is set by default to save every 20 seconds. If we want to change that frequency, we can call
    // MySystem.setAutoSaveFrequency(20000)
  } 
  else {
    this.states = [];
  }
}

/**
 * This function renders everything the student sees when they visit the step.
 * This includes setting up the html ui elements as well as reloading any
 * previous work the student has submitted when they previously worked on this
 * step, if any.
 */
Mysystem2.prototype.render = function() {
  var latestState = this.getLatestState();
  if (latestState !== null) {
    /*
     * get the response from the latest state. the response variable is
     * just provided as an example. you may use whatever variables you
     * would like from the state object (look at templatestate.js)
     */
    var latestResponse = latestState.response;
    this.domIO.textContent = latestResponse;
  }
  
  // It turns out that sometimes when firebug is enabled and reloading
  // the page and switching back to the step: The SC.onReady.done method is never called
  // which should mean the jquery ready method is never called either.  
  // It seems this has to do with how the step iframe is setup. Its contents are injected
  // instead of loading it from a url.  So far the approach below seems to fix this problem
  // and not cause other problems.
  if(!SC.isReady) {
    SC.onReady.done();
  }

  var lastRenewal = 0;
  if (typeof eventManager != 'undefined') {
    // watch for changes to the student data and renew the session whenever it changes
    $('#my_system_state').bind("DOMSubtreeModified", function() {
      var now = new Date().getTime();
      if (now - lastRenewal > 15000) {  // only renew at most once every 15 seconds
        SC.Logger.log("renewing session");
        eventManager.fire('renewSession');
        lastRenewal = now;
      }
    });
  }

  if (this.content) {
    MySystem.loadWiseConfig(this.content,latestState);
  }
  if (latestState) {
    MySystem.updateFromDOM();
  }
};

/**
 * This function retrieves the latest student work
 *
 * @return the latest state object or null if the student has never submitted
 * work for this step
 */
Mysystem2.prototype.getLatestState = function() {
  var latestState = null,
      state,
      i,
      numberOfOwnProperties = function (obj) {
        var p, n = 0;

        for (p in obj) {
          if (obj.hasOwnProperty(p)) n++;
        }
        return n;
      };
      
  if (this.states) {
    for (i = this.states.length - 1; i >= 0; i--) {
      state = this.states[i];
      // because of WISE4 corruption issues, reject states that may have been saved to our states array
      // by non-MySystem steps such as openresponse steps
      if (state.type === "MySystem2" || (typeof state.type === 'undefined' && numberOfOwnProperties(state) === 1)) {
        latestState = state;
        break;
      }
    }
  }
  
  return latestState;
};

// this gets called as part of the window.onExit function, called by Wise2 when
// we leave a step, and allows us to perform any final or cleanup work before
// we save.
Mysystem2.prototype.preSave = function() {
  MySystem.preExternalSave();
};

/**
 * This function retrieves the student work from the html ui, creates a state
 * object to represent the student work, and then saves the student work.
 * 
 * note: you do not have to use 'studentResponseTextArea', they are just 
 * provided as examples. you may create your own html ui elements in
 * the .html file for this step (look at mysystem.html).
 */
Mysystem2.prototype.save = function() {
  // We use a simple dom element for our data passing
  var response =this.domIO.textContent;
  console.log("Saving MySystem");
  
  /*
   * create a student state object that will store the new work the student
   * just submitted
   */
  var state = new MYSYSTEM2STATE(response);
  
  /*
   * fire the event to push this state to the global view.states object.
   * the student work is saved to the server once they move on to the
   * next step.
   */
  eventManager.fire('pushStudentWork', state);

  // push the state object into this or object's own copy of states
  this.states.push(state);
  
  // save back to the server. In a single node visit, this will use the same
  // node visit id each time, so it will save the (growing) stack back to the same
  // place each time. 
  this.node.view.postCurrentNodeVisit(this.node.view.state.getCurrentNodeVisit());
};

// we subscribe this function to the eventManager's processPostResponseComplete event,
// so it ought to get called after postCurrentNodeVisit receives a success message from the post
Mysystem2.prototype.saveSuccessful = function () {
  // it would be great if we could unsubscribe from the event manager when we leave the step.
  // as we can't, our subscription hangs around, even if we are in some other step.
  // Check we have a MySystem first
  if (window['MySystem'] !== undefined){
    window['MySystem'].externalSaveSuccessful(true);
  }
};


//used to notify scriptloader that this script has finished loading
if(typeof eventManager != 'undefined'){
	eventManager.fire('scriptLoaded', 'vle/node/mysystem2/mysystem2.js');
}
