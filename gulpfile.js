
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    //livereload = require('gulp-livereload'),
   // connect = require('gulp-connect'),
    watch = require('gulp-watch'),
    jade = require('gulp-jade'),
    browserSync = require('browser-sync').create(),
    svgSprite= require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin');


global.$={
    config: require('./gulp/config')
};
///подключаем SCSS
gulp.task('scss', function () {
    return gulp.src($.config.paths.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        //.pipe(autoprefixer($.config.autoprefixerConfig))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest($.config.paths.scss.dist))
        .pipe(browserSync.stream());

});
// подключаем спрайт svg
gulp.task('svg_sprite', function() {
    gulp.src($.config.paths.svg.src)
        .pipe(svgmin({
            plugins: [
                {
                    removeAttrs: {
                        attrs: [
                            'fill',
                            'stroke',
                            'stroke-width',
                            'style'
                        ]
                    }
                }
            ]
        }))
        .pipe(svgSprite($.config.spriteSvgConfig))
        .pipe(gulp.dest($.config.paths.svg.dist));
});
///подключаем JS
gulp.task('js_process', function() {
       return gulp.src($.config.paths.js.src)
        .pipe(sourcemaps.init())
        // .pipe($.gp.concat('app.js'))
        .pipe(browserify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest($.config.paths.js.dist))
});
gulp.task('scripts', function() {

    gulp.src($.config.paths.js.src)
        .pipe(browserify()).on('error', function(e){
        console.log(e);
    })
        .pipe(gulp.dest($.config.paths.js.dist))
});

///подключаем JADE
gulp.task('jade', function() {
    var YOUR_LOCALS = {};
    gulp.src($.config.paths.jade.src)
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty:'\t'
        }))
        .pipe(gulp.dest($.config.paths.jade.dist))
        .pipe(browserSync.stream());
});
///подключаем JADE index.html
gulp.task('jadeIndex', function() {
    var YOUR_LOCALS = {};

    gulp.src($.config.paths.jade.srcIndex)
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty:'\t'
        }))
        .pipe(gulp.dest($.config.paths.jade.distIndex))
        .pipe(browserSync.stream());
});
///подключаем WATCH
gulp.task('watch', function () {

    gulp.watch($.config.paths.jade.src, ['jade']).on('change', browserSync.reload);
    gulp.watch($.config.paths.jade.srcIndex, ['jadeIndex']).on('change', browserSync.reload);
    gulp.watch($.config.paths.watch.src, ['scss']).on('change', browserSync.reload);
    gulp.watch($.config.paths.svg.src, ['svg_sprite']).on('change', browserSync.reload);
    //gulp.watch($.config.paths.js.src, ['js']);
    

});
///подключаем Server
gulp.task('serve', function() {

    browserSync.init({
        server: "./public"
    });

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);

gulp.task('default', ['scss','jade','jadeIndex','svg_sprite','serve', 'watch']);
