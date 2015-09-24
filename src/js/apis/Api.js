var request = require('superagent');
var config = require('../../mock/config.js');
require('superagent-mock')(request, config);

var appConstants = require('../constants/appConstants');
var progressActions = require("../actions/progressActions");
var serverActions = require("../actions/serverActions");

var API_URL = 'http://todoserver.com/getitems/';
var TIMEOUT = 10000;

// Organized by RequestKey - No two Requests can have the same key
// at any time - if this occurs, the previous one is Aborted silently.
var _pendingRequests = {};


function abortPendingRequests(requestKey) {
    if (_pendingRequests[requestKey]) {
        _pendingRequests[requestKey]._callback = function(){};
        _pendingRequests[requestKey].abort();
        _pendingRequests[requestKey] = null;
    }
}

function token() {
    return "tokendata";
    // return UserStore.getState().token;
}

function makeUrl(part) {
    return API_URL + part;
}

// return successful response, else return request Constants
function makeResponseHandler(requestKey, requestType, requestParams) {
    // This is the Callback given to superagent
    return function (err, res) {
        if(err) {
            console.log("ApiResponseHandler ERROR: ", res);
        } else {
            console.log("ApiRespondeHandler: ", res);
        }
        // If No Error: err=null, res has: status, body (parsed response), ...
        // In case of Error: err.status if not 2xx
        // See http://visionmedia.github.io/superagent/#response-properties
        if (err && err.timeout === TIMEOUT) {
            serverActions.errResponse(requestType, requestParams, appConstants.errCodes.TIMEOUT);
        } else if(err) {
            serverActions.errResponse(requestType, requestParams, appConstants.errCodes.UNKNOWN);
        } else if (res.status === 400) {
            //UserActions.logout();
        } else if (res.status === 401 || res.status === 403) {
            serverActions.errResponse(requestType, requestParams, appConstants.errCodes.UNAUTHORIZED);
        } else if (!res.ok) {
            serverActions.errResponse(requestType, requestParams, res.statusType);
        } else {
            serverActions.okResponse(requestType, requestParams, res);
        }
        _pendingRequests[requestKey] = null;
    };
}

// a get request with an authtoken param
// More generally, see http://visionmedia.github.io/superagent/
function get(url) {
    return request
        .get(url)
        .set('Accept', 'application/json')
        .timeout(TIMEOUT)
        .query({authtoken: token()});
}

var Api = {
    fetchRemoteItem: function(itemId) {
        // The RequestKey manages the Unicity of a type of request. If another Request
        // with the same RequestKey is initiated, the previous one is aborted.
        var requestType = appConstants.requestTypes.FETCH_REMOTE_ITEMS; 
        var requestKey = requestType + itemId;
        abortPendingRequests(requestKey);
        var numPending = _pendingRequests.length + 1;
        progressActions.startFetchRemoteItem(itemId, numPending);

        // Now the Server request
        var url = makeUrl("");
        var requestParams = {itemId: itemId};
        var httpReq = get(url).query(requestParams);
        _pendingRequests[requestKey] = get(url).end(
            makeResponseHandler(requestKey, requestType, requestParams)
        );
    }
};

module.exports = Api;