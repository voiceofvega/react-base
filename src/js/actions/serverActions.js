var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');

// Ici les Résultats venant du Serveur
var serverActions = {
  okResponse: function(requestType, requestParams, resultData){
    var serverAction = {
      ok: true,
      requestType: requestType,
      requestParams: requestParams, 
      resultData: resultData };
    AppDispatcher.handleServerAction(serverAction);
  },
  errResponse: function(requestType, requestParams, errCode) {
    var serverAction = {
      ok: false,
      requestType: requestType,
      requestParams: requestParams, 
      errCode: errCode };
    AppDispatcher.handleServerAction(serverAction);
  }
};

module.exports = serverActions;