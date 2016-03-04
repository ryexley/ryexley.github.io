var path = require("path");
var gulp = require("gulp");

function r (target) {
  return path.resolve(__dirname, "../../../", target);
}

gulp.task("watch", function () {
  gulp.watch([r("src/css/**/*.css")], ["css"]);
  gulp.watch([
    r("src/resume.json"),
    r("src/resume.enhancements.json"),
    r("src/build/index.js"),
    r("src/js/**/*.js"),
    r("src/templates/**/*.html"),
    r("src/index.tmpl.html"),
    r("assets/**/*.js")
  ], ["generate-resume-html"]);
});
