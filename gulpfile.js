const { src, dest, watch, series } = require("gulp");
const sync = require("browser-sync").create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
// const terser = require('gulp-terser');
const csso = require("csso");
const cssclean = require("gulp-clean-css");
const concat = require('gulp-concat');


function scss() {
    return src("./src/style/index.scss")
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(cssclean())
            .pipe(dest("dist"))
}

function script() {

}

exports.scss = scss;