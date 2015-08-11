var gulp = require("gulp");

gulp.task("default", ["generate-resume-html"]);
gulp.task("edit", ["browserSync", "watch"]);
