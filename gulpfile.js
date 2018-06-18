const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
// const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src(
        [
            'node_modules/bootstrap/scss/bootstrap.scss',
            'node_modules/font-awesome/scss/font-awesome.scss',
            'src/scss/*.scss',
        ])
        .pipe(sass())
        // .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(browserSync.stream());
});

// Move the javascript library files into our /dist/js folder
gulp.task('js', function() {
    return gulp.src([
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/popper.js/dist/popper.min.js',
    ])
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(browserSync.stream());
});

// Move the custom javascript files into our /dist/assets/js folder
gulp.task('jscustom', function() {
    return gulp.src(['src/js/*.js'])
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min',
        }))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(browserSync.stream());
});

// Move the font assets into our /dist/assets/fonts folder
gulp.task('fonts', function() {
    return gulp.src([
        'node_modules/font-awesome/fonts/fontawesome-webfont.*',
        'node_modules/font-awesome/fonts/FontAwesome.otf',
        'src/fonts/Aileron-*',
    ])
        .pipe(gulp.dest('dist/assets/fonts'))
        .pipe(browserSync.stream());
});

// Move the image assets into our /dist/assets/img folder
gulp.task('img', function() {
    return gulp.src(['src/img/*.png', 'src/img/*.jpg', 'src/img/*.gif'])
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(browserSync.stream());
});

// Move the html files into our /dist folder
gulp.task('html', function() {
    return gulp.src(['src/*.html'])
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: './dist',
    });
    gulp.watch(
        ['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'],
        ['sass']
    );
    gulp.watch(['src/*.html'], ['html']);
    gulp.watch(['src/js/*.js'], ['jscustom']);
    gulp.watch([
        'node_modules/font-awesome/fonts/fontawesome-webfont.*',
        'node_modules/font-awesome/fonts/FontAwesome.otf',
    ], ['fonts']);
    gulp.watch(['src/img/*.png', 'src/img/*.jpg', 'src/img/*.gif'], ['img']);
    gulp.watch('src/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['js', 'jscustom', 'fonts', 'img', 'html', 'serve']);
