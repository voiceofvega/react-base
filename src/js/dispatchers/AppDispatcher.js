var Dispatcher = require('flux').Dispatcher;
var appConstants = require('../constants/appConstants');

var AppDispatcher = new Dispatcher();

// Le Dispatcher est un Bridge
// - Les Actions le référencent pour envoyer un Event
// - Les Stores le référencent pour s'enregistrer et recevoir les Events.
AppDispatcher.handleViewAction = function(action){
  console.log("Dispatching View Action: ", action);
  this.dispatch({
    // Attach this Source info (action initiated from a View)
    source: appConstants.actionSources.VIEW,
    action: action
  });
};
AppDispatcher.handleServerAction = function(action){
  console.log("Dispatching Server Action: ", action);
  this.dispatch({
    // Attach this Source info (action initiated from a Server response)
    source: appConstants.actionSources.SERVER,
    action: action
  });
};
AppDispatcher.handleProgressAction = function(action){
  console.log("Dispatching Progress Action: ", action);
  this.dispatch({
    // Attach this Source info (Progress indication of an action)
    source: appConstants.actionSources.PROGRESS,
    action: action
  });
};

module.exports = AppDispatcher;