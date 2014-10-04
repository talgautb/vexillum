/*-------------------------------------------------------------------
  Required plugins
-------------------------------------------------------------------*/

var gulp = require('gulp'),
  // css preprocessing
  stylus = require('gulp-stylus'),
  // autoprefixer for vendors
  autoprefixer = require('gulp-autoprefixer'),
  // minify css files
  minifycss = require('gulp-minify-css'),
  // compiled js files
  jade = require('gulp-jade'),
  // concat files
  concat = require('gulp-concat');
  // rename css file
  rename = require('gulp-rename');

/*-------------------------------------------------------------------
  Configuration
-------------------------------------------------------------------*/

var path = {

  stylus: "assets/stylus",
  jade: "assets/jade",

  demo: "demo/",
  css: "",

};

var watched = {
  stylus: [path.stylus + '/*.styl', !path.stylus + '/demo.styl'],
  stylus_demo: [path.stylus + '/*.styl',!path.stylus + '/index.styl'],

  jade: path.jade + '/*.jade'
};

/*------DEV TASKS------*/

// Jade
gulp.task('jade', function() {
  gulp.src(path.jade+'/index.jade')
    .pipe(jade({
      //pretty: true
    }))
    .on('error', console.log)
    .pipe(gulp.dest(path.demo));
});

// Stylus
gulp.task('stylus', function() {
    gulp.src(path.stylus+'/index.styl')
    .pipe(stylus())
    .on('error', console.log)
    .pipe(concat('vexillum.css'))
    .pipe(autoprefixer('last 2 version'))
    .pipe(gulp.dest(path.css))
    .pipe(minifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path.css));
});

gulp.task('demo_stylus', function() {
    gulp.src(path.stylus+'/demo.styl')
    .pipe(stylus())
    .on('error', console.log)
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(path.demo));
});


// Watcher
gulp.task('watch', function() {
  // Create file on init
  //gulp.run('stylus');
  //gulp.run('coffee');
  //gulp.run('jade');

  // watch jade
  gulp.watch(watched.jade, ['jade']);

  // watch stylus
  gulp.watch(watched.stylus, ['stylus']);
  gulp.watch(watched.stylus_demo, ['demo_stylus']);

});