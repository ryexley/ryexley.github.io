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

  generate: function (options) {
    options = options || {};
    var self = this;

    this.registerPartials(function () {
      self.getTemplate(function (templateSource) {
        var template = Handlebars.compile(templateSource),
            resumeSource = template(options.data),
            outputFile = options.outputFile || path.resolve(__dirname, "../index.html");

        rimraf(outputFile, function () {
          self.writeGeneratedResume(outputFile, resumeSource, function (err) {
            if (err) {
              console.log("ERROR generating resume:\n", err);
            }

            console.log("SUCCESS! Resume generated to: ", outputFile);
          });
        });
      });
    });
  }
};

module.exports = Object.create(buildApi);
