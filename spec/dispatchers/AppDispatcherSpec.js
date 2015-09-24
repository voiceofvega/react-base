describe("AppDispatcher", function() {
	var AppDispatcher = require('../../src/js/dispatchers/AppDispatcher');
	var appConstants  = require('../../src/js/constants/appConstants');

	it("should be able to run a test", function() {
			expect(true).toBe(true);
	});

	it("should see the AppDispatcher", function() {
			AppDispatcher.handleViewAction({});
			expect(true).toBe(true);
	});

	describe("should dispatch", function() {
		var cb, cbId;
		beforeEach(function() {
			cb = jasmine.createSpy("dispatcherCb");
			cbId = AppDispatcher.register(cb);
		});
		afterEach(function() {
			AppDispatcher.unregister(cbId);
		});
		it("a View Action", function() {
			AppDispatcher.handleViewAction({});
			expect(cb).toHaveBeenCalled();
		});
		it("a View Action, once", function() {
			AppDispatcher.handleViewAction({});
			expect(cb.calls.count()).toEqual(1);
		});
		it("a View Action with Source=VIEW", function() {
			AppDispatcher.handleViewAction({});
			var VIEW = appConstants.actionSources.VIEW;
			expect(cb.calls.argsFor(0)).toEqual([{source:VIEW, action:{}}]);
		});
		it("a View Action, with the unaltered object", function() {
			var VIEW = appConstants.actionSources.VIEW;
			var myAction = {
				actionType:"MyAction",
				data:23
			};
			AppDispatcher.handleViewAction(myAction);
			expect(cb.calls.argsFor(0)).toEqual([{source:VIEW, action:myAction}]);
		});
		it("a Server Action", function() {
			AppDispatcher.handleServerAction({});
			expect(cb).toHaveBeenCalled();
		});
		it("a Server Action with Source=SERVER", function() {
			var SERVER = appConstants.actionSources.SERVER;
			AppDispatcher.handleServerAction({});
			expect(cb.calls.argsFor(0)).toEqual([{source:SERVER, action:{}}]);
		});
		it("a Server Action with the unaltered object", function() {
			var SERVER = appConstants.actionSources.SERVER;
	    var myAction = {
	      ok: true,
	      requestType: "type",
	      requestParams: 1234, 
	      resultData: [1,2]
	    };
			AppDispatcher.handleServerAction(myAction);
			expect(cb.calls.argsFor(0)).toEqual([{source:SERVER, action:myAction}]);
		});
		it("a Progress Action", function() {
			AppDispatcher.handleProgressAction({});
			expect(cb).toHaveBeenCalled();
		});
		it("a Progress Action with Source=PROGRESS", function() {
			AppDispatcher.handleProgressAction({});
			var PROGRESS = appConstants.actionSources.PROGRESS;
			expect(cb.calls.argsFor(0)).toEqual([{source:PROGRESS, action:{}}]);
		});

		it("all action types to the callback", function() {
			AppDispatcher.handleViewAction({});
			AppDispatcher.handleServerAction({});
			AppDispatcher.handleProgressAction({});
			expect(cb.calls.count()).toEqual(3);
		});
	});
});
