var gulp = require("gulp");
var run = require("child_process").spawn;

gulp.task("generate-resume-html", function (next) {
  run("node", ["index.js"], { stdio: "inherit" }).on("exit", function (err) {
    next(err);
  });
});

gulp.task("generate-resume-pdf", function (next) {

});
