var appConstants = {
  actionSources: {
  	VIEW: "VIEW",
  	SERVER: "SERVER",
  	PROGRESS: "PROGRESS"
  },
  requestTypes: {
  	FETCH_REMOTE_ITEMS: "FRI/"
  },
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  errCodes: {
  	// Our Codes:
  	UNKNOWN: 0,
  	TIMEOUT: -1,
  	UNAUTHORIZED: -2,	// Http Response 401 or 403

  	// From HTTP Response, do not change values (HTTP code / 100)
  	INFO: 1,			// Http Response 1xx
  	CLIENT_ERROR: 4,	// Http Response 4xx, except 401/403
  	SERVER_ERROR: 5		// Http Response 5xx
  }
};

module.exports = appConstants;