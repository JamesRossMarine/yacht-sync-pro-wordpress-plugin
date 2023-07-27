var gulp = require('gulp'),
concat = require('gulp-concat'),
sass = require('gulp-sass')(require('sass')),
gulpIgnore = require('gulp-ignore'),
sourcemaps = require('gulp-sourcemaps'),
minify = require('gulp-minify'),
terser = require('gulp-terser'),
rename = require("gulp-rename"),
fs = require('fs'),
path = require("path"),
multiDest = require('gulp-multi-dest'),
rename = require("gulp-rename"),
zip = require('gulp-zip'),
babel = require('gulp-babel'),
jshint = require('gulp-jshint'),
map = require('map-stream');

var sassPaths=[];

var client_script_files=[
    
];

var yacht_details_script_files=[

];

var exitOnJshintError = map(function (file, cb) {
  if (!file.jshint.success) {
    console.error('jshint failed');
    process.exit(1);
  }
});

// CLIENT TASKS
gulp.task('client-sass', function() {
    return gulp.src('scss/aplugin-style.scss')
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
    return gulp.src('scss/client-side.scss')
        //.pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: sassPaths,
            outputStyle: 'compressed'
        })
        .on('error', sass.logError))
        //.pipe(sourcemaps.write())
        .pipe(rename("client-side.noMaps.css"))
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
    return gulp.src(client_script_files)
        .pipe(sourcemaps.init())
        .pipe(concat('client-side.js'))
        .pipe(babel({
             presets: ['@babel/env']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

gulp.task('client-minify-js', function() {
    return gulp.src(client_script_files)
        .pipe(concat('client-side.noMaps.js'))
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

gulp.task('yacht-details-client-js', function() {
    return gulp.src(yacht_details_script_files)
        .pipe(sourcemaps.init())
        .pipe(concat('yacht-details-client-side.js'))
        .pipe(babel({
             presets: ['@babel/env']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});

gulp.task('yacht-details-client-minify-js', function() {
    return gulp.src(yacht_details_script_files)
        .pipe(concat('yacht-details-client-side.noMaps.js'))
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

gulp.task('render-client', gulp.series('client-sass', 'client-sass-no-maps', 'client-js', 'client-minify-js', 'yacht-details-client-js', 'yacht-details-client-minify-js', 'hint'));
