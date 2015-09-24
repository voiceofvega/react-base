var AppDispatcher = require('../dispatchers/AppDispatcher');
var appConstants = require('../constants/appConstants');
var Api = require('../apis/Api');

// Ici les Actions initiables par les Views.
var todoActions = {
  // Lister les Actions, référencées par des Constants
  // Les actions préparent les Data avant Dispatch.
  addItem: function(item){
    AppDispatcher.handleViewAction({
      actionType: appConstants.ADD_ITEM,
      data: item
    });
  },
  removeItem: function(index){
    AppDispatcher.handleViewAction({
      actionType: appConstants.REMOVE_ITEM,
      data: index
    });
  },
  fetchRemoteItem: function(itemId) {
    Api.fetchRemoteItem(itemId);
  }
};

module.exports = todoActions;