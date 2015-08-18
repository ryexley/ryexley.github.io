// The following regex will filter browser-sync messages out of the Google Chrome console:
// ^((?!browser-sync).)*$

var path = require("path");
var gulp = require("gulp");
var browserSync = require("browser-sync");

function r (target) {
  return path.resolve(__dirname, "../../../", target);
}

gulp.task("browserSync", function () {
  browserSync({
    watchTask: true,
    server: {
      baseDir: path.resolve(__dirname, "../../../")
    },
    files: [
      r("index.html"),
      r("assets/**/*.css"),
      r("assets/**/*.js")
    ],
    port: 7001,
    open: false
  });
});
