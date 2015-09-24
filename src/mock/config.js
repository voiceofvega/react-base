module.exports = [
  {
    pattern: 'http://todoserver.com/getitems/(.*)',
    // match is the result of the RegExp matching
    // match[0] is the full request, etc.
    // params are the parameters injected by send()
    fixtures: function (match, params) {
      console.log("Fixtures invoked for match: ", match);
      return "Voici un item !";
    },
    callback: function (match, data) {
      return {
      	status: 200,
      	ok: true,
        body: data
      };
    }
  }
];