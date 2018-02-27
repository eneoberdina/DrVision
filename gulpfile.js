const gulp = require('gulp');
const watch = require('gulp-watch');
const rigger = require('gulp-rigger');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');

gulp.task('default', [
    'build-html',
    'build-css',
]);

gulp.task('watch', () => {
    gulp.watch('src/html/*.html', ['build-html']);
    gulp.watch('src/scss/*.scss', ['build-css']);
    gulp.watch('src/images/*', ['build-images']);
   
});

gulp.task('build-html', () => {
    gulp.src(['src/html/*.html'])

        .pipe(rigger())
        .pipe(gulp.dest(''))
});

gulp.task('build-css', () => {
    gulp.src('src/scss/*.scss')
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer( {
            browsers:['last 50 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('css'))
});
