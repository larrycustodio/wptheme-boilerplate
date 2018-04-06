const dotenv = require('dotenv').config();
const gulp = require('gulp');
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const plumber = require('gulp-plumber');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

gulp.task('build-sass', () =>
    gulp.src('src/scss/main.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(plumber.stop())
        .pipe(gulp.dest('src/css'))
);

gulp.task('build-css', ['build-sass'], () =>
    gulp.src('src/css/main.css')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(cleanCSS({ compatibility: '*' }))
        .pipe(sourcemaps.write('./'))
        .pipe(rename('style.css'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./'))
);

gulp.task('build-js', () =>
    gulp.src('src/js/**/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init('./'))
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(plumber.stop())
        .pipe(gulp.dest('./'))
);
gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
})

// gulp.task('html-watch', ['build-html'], done => {
//     browserSync.reload();
//     done();
// });

gulp.task('css-watch', ['build-css'], done => {
    browserSync.reload();
    done();
});

gulp.task('js-watch', ['build-js'], done => {
    browserSync.reload();
    done();
});

gulp.task('watch', ['fonts', 'build-css', 'build-js'], () => {
    browserSync.init({
        proxy: process.env.PROXY_URL
    });

    gulp.watch('src/**/*.html', ['html-watch']);
    gulp.watch('src/scss/**/*.scss', ['css-watch']),
    gulp.watch('src/js/**/*.js', ['js-watch'])
});


gulp.task('default', ['build-html', 'fonts', 'build-sass', 'build-css', 'build-js']);