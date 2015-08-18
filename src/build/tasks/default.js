var gulp = require("gulp");

gulp.task("default", ["css", "generate-resume-html"]);
gulp.task("edit", ["browserSync", "watch"]);
