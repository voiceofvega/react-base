'use strict';

var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    browserSync = require('browser-sync'),
    source = require('vinyl-source-stream');

// To be included once only
var vendors = [
  'react',
  'react-router'
];

gulp.task('vendors', function () {
    var stream = browserify({
            debug: false,
            require: vendors
        });

    stream.bundle()
          .pipe(source('vendors.js'))
          .pipe(gulp.dest('dist/js'));

    return stream;
});

gulp.task('app', function () {
    var stream = browserify({
            entries: ['./src/js/main.js'],
            transform: [babelify],
            debug: false,
            extensions: ['.js'],
            fullPaths: false
        });

    vendors.forEach(function(vendor) {
        stream.external(vendor);
    });

    return stream.bundle()
                 .pipe(source('main.js'))
                 .pipe(gulp.dest('dist/js'));
});

gulp.task('copy',function() {
    gulp.src('src/index.html')
      .pipe(gulp.dest('dist'));
    gulp.src('src/assets/**/*.*')
      .pipe(gulp.dest('dist/assets'));
});

gulp.task('watch', function () {
  gulp.watch(['src/**/*.*'], ['app','copy']);
});

gulp.task('browsersync',['vendors','app','copy'], function () {
    browserSync({
  		server: {
  			baseDir: './dist/'
  		},
  		startPath: '/#/app/',
  		notify: false,
  		browser: ["firefox"]
	});
});

gulp.task('default',['browsersync', 'watch'], function() {});

