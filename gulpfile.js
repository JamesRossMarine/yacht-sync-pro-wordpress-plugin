var gulp = require('gulp'),
concat = require('gulp-concat'),
sass = require('gulp-sass')(require('sass')),
gulpIgnore = require('gulp-ignore'),
sourcemaps = require('gulp-sourcemaps'),
minify = require('gulp-minify'),
terser = require('gulp-terser'),
rename = require("gulp-rename"),
//fs = require('fs'),
path = require("path"),
//multiDest = require('gulp-multi-dest'),
rename = require("gulp-rename"),
//zip = require('gulp-zip'),
babel = require('gulp-babel'),
jshint = require('gulp-jshint'),
map = require('map-stream'),
watch = require('gulp-watch');

var sassPaths=[];

var global_script_files=[
    'js/threeP/jquery-pagination.js',

    'js/threeP/lightgallery-dist/lightgallery.umd.js',
    'js/threeP/lightgallery-dist/plugins/thumbnail/lg-thumbnail.umd.js',
    'js/threeP/lightgallery-dist/plugins/zoom/lg-zoom.umd.js',
    'js/threeP/lightgallery-dist/plugins/video/lg-video.umd.js',
    'js/threeP/lightgallery-dist/plugins/rotate/lg-rotate.umd.js',

    'js/common.js',
    'js/api-client.js',
    'js/templates.js',
    'js/yachtSearch.js',
    'js/leads.js'
];

var exitOnJshintError = map(function (file, cb) {
  if (!file.jshint.success) {
    console.error('jshint failed');
    process.exit(1);
  }
});

// CLIENT TASKS
gulp.task('client-sass', function() {
    return gulp.src('scss/app-style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: sassPaths,
            outputStyle: 'compressed'
        })
        .on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css'));
});

gulp.task('client-sass-no-maps', function() {
    return gulp.src('scss/app-style.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: sassPaths,
            outputStyle: 'compressed'
        })
        .on('error', sass.logError))
        //.pipe(sourcemaps.write())
        .pipe(rename("app-style.noMaps.css"))
        .pipe(gulp.dest('build/css'));
});

gulp.task('hint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint({
        esversion: 6
    }))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('client-js', function() {
    return gulp.src(global_script_files)
        .pipe(sourcemaps.init())
        .pipe(concat('globalPlugin.js'))
        .pipe(babel({
             presets: ['@babel/env']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

gulp.task('client-minify-js', function() {
    return gulp.src(global_script_files)
        .pipe(concat('globalPlugin.noMaps.js'))
        .pipe(babel({
             presets: ['@babel/env']
        }))
        .pipe(terser({ 
            compress: {drop_console: false,},
            output: {comments: false},
            //ie8: true,
        }))
        .pipe(gulp.dest('build/js'));
});

gulp.task('render-client', gulp.series('client-sass', 'client-sass-no-maps', 'client-js', 'client-minify-js'));

gulp.task('default', gulp.series('render-client'));
/*
watch('scss/*.scss', gulp.series('render-client'));
watch('js/*.js', gulp.series('render-client'));
*/