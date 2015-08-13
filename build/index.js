var path = require("path");
var fs = require("fs");
var rimraf = require("rimraf");
var Handlebars = require("handlebars");

var buildApi = {
  getTemplate: function (next) {
    var templatePath = path.resolve(__dirname, "templates/resume-template.html");

    fs.readFile(templatePath, "utf-8", function (err, contents) {
      if (err) {
        return next(err);
      }

      next(contents);
    });
  },

  registerPartials: function (next) {
    var templatePath = path.resolve(__dirname, "templates"),
        templates = fs.readdirSync(templatePath);

    templates.forEach(function (template) {
      var extension = path.extname(template),
          firstTwo = template.substr(0, 2),
          partialName = template.substr(2, (template.lastIndexOf(".") -2));

      if (extension === ".html") {
        if (firstTwo === "__") {
          var partialFilepath = path.resolve(__dirname, "templates", template);
          fs.readFile(partialFilepath, "utf-8", function (err, partialContent) {
            if (err) {
              console.log("ERROR registering partial:", partialFilepath, err);
              return next(err);
            }

            Handlebars.registerPartial(partialName, partialContent);
          });
        }
      }
    });

    next();
  },

  writeGeneratedResume: function (filepath, contents, next) {
    fs.writeFile(filepath, contents, function (err) {
      if (err) {
        return next(err);
      }

      next();
    });
  },

  enhanceResumeData: function (data) {
    // TODO: massage this data...specifically, the work history data to include featured entry count and stuff like that
    return data;
  },

  generate: function (options) {
    options = options || {};
    var self = this;

    options.data = this.enhanceResumeData(options.data);

    this.registerPartials(function () {
      self.getTemplate(function (templateSource) {
        var template = Handlebars.compile(templateSource),
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
