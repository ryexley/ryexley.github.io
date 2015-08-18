var path = require("path");
var gulp = require("gulp");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer-core");
var cssnext = require("cssnext");
var imports = require("postcss-import");
var nested = require("postcss-nested");
var variables = require("postcss-simple-vars");
var mixins = require("postcss-mixins");
var csswring = require("csswring");

var processors = [
  autoprefixer({ browsers: ["last 2 version"]}),
  imports({ path: path.join(__dirname, "../../assets/css"), glob: true }),
  cssnext(),
  mixins,
  nested,
  variables(),
  csswring()
];

gulp.task("css", ["clean:css"], function () {

  gulp.src(path.join(__dirname, "../../css", "main.css"))
      .pipe(postcss(processors))
      .pipe(gulp.dest(path.join(__dirname, "../../../assets/css")));

});
