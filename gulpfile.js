const { src, dest, watch, series } = require("gulp");
const sync = require("browser-sync").create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const uglify = require("gulp-uglify");
const cssclean = require("gulp-clean-css");
const concat = require('gulp-concat');
const del = require("del");
// const babel = require('gulp-babel');
const browserify = require('browserify')
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const babelify = require('babelify');
const htmlmin = require('gulp-htmlmin');

function scss() {
    return src("./src/style/index.scss")
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(concat("index.min.css"))
            .pipe(cssclean())
            .pipe(dest("dist"))
}

function script() {
  
    return browserify({
        entries: ['./src/script/index.js']
    })
    .transform( babelify, { presets: [ '@babel/preset-env' ] } )
    .bundle()
        .pipe( source( 'index.min.js' ))
		.pipe( buffer())
        .pipe(uglify())
        .pipe(dest("./dist"))
}

function img() {
    return src("./src/img/*.jpg")
            .pipe(dest("dist/img"))

}

function html() {
    return src("./src/*.html")
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(dest("./dist"))
}

function browsersync() {
    sync.init({
        server: "dist"
    })

    watch("./src/style/index.scss", scss).on("change", sync.reload);
    watch("./src/script/index.js", script).on("change", sync.reload);
}

function clear() {
    return del("dist")
}



exports.scss = scss;
exports.script = script;
exports.browsersync = browsersync;
exports.clear = clear;
exports.img = img;
exports.html = html;

// exports.default = series(clear, html, scss, script, img, browsersync)

if(process.env.NODE_ENV == "production") {
    exports.default = series(clear, html, scss, img, script)
} else {
    exports.default = series(clear, html, scss, script, img, browsersync)
}