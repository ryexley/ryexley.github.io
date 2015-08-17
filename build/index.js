var path = require("path");
var fs = require("fs");
var _ = require("lodash");
var rimraf = require("rimraf");
var Templates = require("./templates");

var buildApi = {
  writeGeneratedResume: function (filepath, contents, next) {
    fs.writeFile(filepath, contents, function (err) {
      if (err) {
        return next(err);
      }

      next();
    });
  },

  generate: function (options) {
    options = options || {};
    var self = this;

    Templates.init(function () {
      Templates.getMain(function (templateSource) {
        var template = Templates.compile(templateSource),
            resumeSource = template(options.data),
            targetFolder = path.resolve(__dirname, "../view/"),
            outputFile = options.outputFile || path.resolve(__dirname, "../view/index.html");

        rimraf(outputFile, function () {
          fs.exists(targetFolder, function (exists) {
            if (!exists) {
              fs.mkdir(targetFolder, function () {
                self.writeGeneratedResume(outputFile, resumeSource, function (err) {
                  if (err) {
                    console.log("ERROR generating resume:\n", err);
                  }

                  console.log("SUCCESS! Resume generated to: ", outputFile);
                });
              });
            } else {
              self.writeGeneratedResume(outputFile, resumeSource, function (err) {
                if (err) {
                  console.log("ERROR generating resume:\n", err);
                }

                console.log("SUCCESS! Resume generated to: ", outputFile);
              });
            }
          });
        });
      });
    });
  }
};

module.exports = Object.create(buildApi);
