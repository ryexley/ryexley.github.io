var path = require("path");
var gulp = require("gulp");
var del = require("del");

gulp.task("clean:css", function (next) {
  del([path.join(__dirname, "../../../assets/css/**/*.css")], next);
});
