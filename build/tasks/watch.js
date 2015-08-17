var path = require("path");
var gulp = require("gulp");

function r (target) {
  return path.resolve(__dirname, "../..", target);
}

gulp.task("watch", function () {
  gulp.watch([r("style/**/*.css")], ["css"]);
  gulp.watch([r("resume.json"), r("resume.enhancements.json"), r("build/templates/**/*.html"), r("view/**/*.js")], ["generate-resume-html"]);
});
