'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var bower = require('bower');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var nodemon = require('gulp-nodemon');
var reload = browserSync.reload;
var shell = require('gulp-shell');
var sh = require('shelljs');
var when = require('gulp-if');
var angularFilesort = require('gulp-angular-filesort');
var inject = require('gulp-inject');


// the paths to our app files
var paths = {
  // all our client app js files, not including 3rd party js files
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/styles/style.css'],
  server: ['server/**/*.js'],
  test: ['specs/**/*.js'],
  sass: ['client/scss/**/*.scss']
};

// Inject ionic(angular) app into index.html
gulp.task('index', function () {

  var sources = gulp.src(['./client/www/js/**/*.js']).pipe(angularFilesort());

  gulp.src('./client/www/index.html')
    .pipe(inject(sources, {ignorePath: 'client/www', addRootSlash: false }))
    .pipe(gulp.dest('./client/www'));

});

// Compile sass
gulp.task('sass', function(done) {
  return gulp.src('./client/scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./client/www/css/'))
    .pipe(sass({sourcemap: true}))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./client/www/css/'))
    .pipe(reload({stream:true}));
});

// any changes made to your
// client side code will automagically refresh your page
// with the new changes
gulp.task('browser-sync', ['serve'],function () {
  browserSync({
    notify: true,
    server : {
      basedir : './'
    },
    injectChanges: true,
    files: paths.scripts.concat(paths.html, paths.styles),
    proxy: 'localhost:5000'
  });
});



gulp.task('karma', shell.task([
  'karma start'
]));


gulp.task('watch', function () {
  gulp.watch("./client/scss/*.scss", ['sass'])
  gulp.watch("./client/templates/*.html", ['bs-reload', 'index']);
  gulp.watch("./client/js/*.js", ['bs-reload', 'index']);
});

// start our node server using foreman
gulp.task('serve', shell.task([
  'foreman run local'
]));

gulp.task('install', shell.task([
  'npm install',
  'bower install'
]));

gulp.task('default', ['sass', 'index', 'browser-sync', 'watch']);

gulp.task('deploy', ['start']);
