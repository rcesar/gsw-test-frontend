var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var ngAnnotate = require('gulp-ng-annotate');
var webserver = require('gulp-webserver');


var vendorJsPaths = [
    './src/assets/vendor/jquery/dist/jquery.min.js',
    './src/assets/vendor/bootstrap/dist/js/bootstrap.bundle.min.js',
    './src/assets/vendor/angular/angular.min.js',
    './src/assets/vendor/angular-i18n/angular-locale_pt-br.js',
    './src/assets/vendor/angular-ui-router/release/angular-ui-router.min.js',
    './src/assets/vendor/angular-animate/angular-animate.min.js',
    './src/assets/vendor/angular-touch/angular-touch.min.js',
    './src/assets/vendor/angular-bootstrap/ui-bootstrap-tpls.min.js',
    './src/assets/vendor/sweetalert2/dist/sweetalert2.all.min.js'
];

var vendorCssPaths = [
    './src/assets/vendor/bootstrap/dist/css/bootstrap.min.css'
];

var vendorFontsPaths = [
    './src/assets/vendor/bootstrap/dist/fonts/**'
];

gulp.task('less', function () {
    return gulp.src(['./src/assets/css/app.less', './src/app/Components/**/*.less'])
    .pipe(concat('app.less'))
    .pipe(less({
        paths: ['./src/assets/css/', './src/app/Components/**/*.less']
    }))
    .pipe(gulp.dest('./dist/assets/css/'));
});

gulp.task('vendorCss', function () {
    return gulp.src(vendorCssPaths)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./dist/assets/css/'));
});

gulp.task('vendorFonts', function () {
    return gulp.src(vendorFontsPaths)
        .pipe(gulp.dest('./dist/assets/fonts/'));
});

gulp.task('vendorJs', function () {
    return gulp.src(vendorJsPaths)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/assets/js/'));
});

gulp.task('js', function () {
    return gulp.src(['./src/app/*.js', './src/app/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('./dist/app/'));
});

gulp.task('index', function () {
    return gulp.src(['./src/*.html'])
        .pipe(gulp.dest('./dist/'));
});

gulp.task('html', function () {
    return gulp.src(['./src/app/Components/**/*.html'])
        .pipe(gulp.dest('./dist/app/Components/'));
});

gulp.task('img', function () {
    return gulp.src(['./src/assets/img/**'])
        .pipe(gulp.dest('./dist/assets/img/'));
});

gulp.task('webserver', function () {
    gulp.src('dist')
        .pipe(webserver({
            // livereload: true,
            port: 8085,
            open: true
        }));
});

gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['./src/app/*.js', './src/app/**/*.js'], ['js']);
    gulp.watch(['./src/assets/css/*.less', './src/app/Components/**/*.less'], ['less']);
    gulp.watch(['./src/app/Components/**/*.html'], ['html']);
    gulp.watch(['dev/*.html'], ['index']);
    //gulp.watch(['dev/img/**'], ['img']);

    //gulp.watch(['./src/**'])
    //    .on('change', function(event) {
    //      livereload.changed( event.path );
    //    });
});

gulp.task('default', ['less', 'js', 'html', 'img', 'index', 'vendorCss', 'vendorFonts', 'vendorJs', 'watch', 'webserver']);

