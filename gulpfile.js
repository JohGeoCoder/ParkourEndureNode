var gulp = require('gulp');
var sass = require('gulp-sass');
var parkour = require('./server.js');
var rename = require('gulp-rename');

gulp.task('parkour', function(){
	parkour();
});

// styles task
gulp.task('sass:styles', function() {
  	return gulp.src('./sass/scss/parkourendure/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./static/css'));
});

// styles task
gulp.task('sass:foundation', function() {
  	return gulp.src('./sass/scss/foundation/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(rename('foundation.css'))
    .pipe(gulp.dest('./static/css'));
});

gulp.task('watch', function () {
	gulp.watch('./sass/scss/parkourendure/**/*.scss', ['sass:styles']);
	gulp.watch('./sass/scss/foundation/**/*.scss', ['sass:foundation']);
});

gulp.task('default', ['parkour', 'sass:styles', 'sass:foundation', 'watch']);