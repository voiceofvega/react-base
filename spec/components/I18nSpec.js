describe("I18n", function() {
	var i18n = require('i18next-client');
	var XLations = require('../../src/js/constants/XLations');

	beforeAll(function(done) {
		i18n.init({resStore: XLations, lng:'fr-FR'}, function(err,t) {
			done();
		});
	});

	it("should be able to run a test", function() {
			expect(true).toBe(true);
	});

	it("should translate", function() {
		var txt = i18n.t('home_sample');
		expect(txt).not.toBeUndefined();
		expect(txt).toBe("This is a sample Home");
	});
});