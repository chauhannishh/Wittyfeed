var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
const sassPartialsImported = require('gulp-sass-partials-imported');
const cached = require('gulp-cached');

var browserSync = require('browser-sync').create();
var reload = browserSync.reload();

// gulp.task('sass', () => {
// 	gulp.src('./src/sass/**/*.scss')
// 		.pipe(sassPartialsImported('src/sass/modules/'))
// 		.pipe(cached('sassfiles'))
// 		.pipe(sass().on('error', sass.logError))
// 		.pipe(gulp.dest('./src/css/'));
// });

gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass({includePaths: ['./src/css/']}).on('error', sass.logError))
    .pipe(gulp.dest('./src/css/'));
});

gulp.task('server', ['sass'], function(){
    browserSync.init({
        server: './',
        browser: "chrome"
    });
    gulp.watch('./*.html').on('change', browserSync.reload);
});


gulp.task('watch', function(){
    //run sass task if any chnanges found
    gulp.watch('./src/sass/**/*.scss', ['sass']);
});


gulp.task('default',['watch','sass']);