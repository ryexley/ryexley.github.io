var gulp = require("gulp");

gulp.task("default", ["css", "generate-resume-html"]);
gulp.task("edit", ["generate-resume-html", "browserSync", "watch"]);
