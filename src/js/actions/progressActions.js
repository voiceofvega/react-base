var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');

// Ici les Actions en cours.
var progressActions = {
  // itemId: In general, the Request Parameter
  // numPending: The global number of Pending actions, including this one.
  startFetchRemoteItem: function(itemId, numPending){
    var progressAction = {
      requestType:appConstants.requestTypes.FETCH_REMOTE_ITEMS,
      requestParams: itemId, 
      percent:0, 
      numPending: numPending};
    AppDispatcher.handleProgressAction(progressAction);
  }
};

module.exports = progressActions;