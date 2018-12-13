var path = require("path");
var gulp = require("gulp");
var postcss = require("gulp-postcss");
// var autoprefixer = require("autoprefixer");
var cssnext = require("postcss-cssnext");
var imports = require("postcss-easy-import");
var nested = require("postcss-nested");
var variables = require("postcss-simple-vars");
var mixins = require("postcss-mixins");
var csswring = require("csswring");

const CSS_SRC = path.resolve("src/css");
const ASSETS_DIR = path.resolve("assets/css");

var processors = [
  // autoprefixer({ browsers: ["last 2 version"]}),
  imports({ path: CSS_SRC, glob: true }),
  cssnext(),
  mixins,
  nested,
  variables(),
  csswring()
];

gulp.task("css", ["clean:css"], function () {

  gulp.src(path.join(CSS_SRC, "main.css"))
      .pipe(postcss(processors))
      .pipe(gulp.dest(ASSETS_DIR));

});
