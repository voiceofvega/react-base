// Karma configuration
// Generated on Wed Aug 26 2015 16:45:16 GMT+0200 (Paris, Madrid (heure d’été))

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['browserify','jasmine'],
	
	plugins: [
		'karma-browserify', 'karma-jasmine', 'karma-phantomjs-launcher'
	],


    // list of files / patterns to load in the browser
    files: [
	  'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'src/js/actions/*.js',
      'src/js/components/*.js',
      'src/js/constants/*.js',
      'src/js/dispatchers/*.js',
      'src/js/es6/*.js',
      'src/js/stores/*.js',
      'spec/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/js/**/*.js': ['browserify'],
      'spec/**/*Spec.js': ['browserify']
    },
	
	browserify: {
	  debug: true,
	  transform: ['rewireify','babelify']
	},


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  })
}
