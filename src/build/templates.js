var path = require("path");
var fs = require("fs");
var _ = require("lodash");
var Handlebars = require("handlebars");

function registerPartials (next) {
  var templatePath = path.resolve(__dirname, "../templates"),
      templates = fs.readdirSync(templatePath);

  templates.forEach(function (template) {
    var extension = path.extname(template),
        firstTwo = template.substr(0, 2),
        partialName = template.substr(2, (template.lastIndexOf(".") -2));

    if (extension === ".html") {
      if (firstTwo === "__") {
        var partialFilepath = path.resolve(__dirname, "../templates", template);
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

  // HACK: registering partials requires some i/o time...
  // but the `Handlebars.registerPartial` isn't async, so
  // we need to give it a little time to finish, so all
  // partials are registered before we try to use/reference
  // them later.
  setTimeout(function () {
    next();
  }, 10);
};

function registerHelpers (next) {
  // #compare - adapted from http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/#comment-44
  Handlebars.registerHelper("compare", function (lval, operator, rval, options) {
    var operators, result;

    if (arguments.length < 3) {
      throw new Error("Handlebars helper 'compare' needs 3 parameters");
    }

    if (options === undefined) {
      options = rval;
      rval = operator;
      operator = "===";
    }

    operators = {
      "==": function (l, r) { return l == r; },
      "===": function (l, r) { return l === r; },
      "!=": function (l, r) { return l != r; },
      "!==": function (l, r) { return l !== r; },
      "<": function (l, r) { return l < r; },
      ">": function (l, r) { return l > r; },
      "<=": function (l, r) { return l <= r; },
      ">=": function (l, r) { return l >= r; },
      "typeof": function (l, r) { return typeof l == r; }
    };

    if (!operators[operator]) {
      throw new Error("Handlebars helper 'compare' doesn't know the operator: " + operator);
    }

    result = operators[operator](lval, rval);

    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  });

  // #stringify
  Handlebars.registerHelper("stringify", function (target) {
    return JSON.stringify(target, null, 2);
  });

  // #stripChars
  Handlebars.registerHelper("stripChars", function (target) {
    return target.replace(".", "");
  });

  next();
};

module.exports = {
  init: function (next) {
    registerHelpers(function () {
      registerPartials(next);
    });
  },

  compile: function (source) {
    return Handlebars.compile(source);
  },

  getMain: function (next) {
    var templatePath = path.resolve(__dirname, "../templates/resume-template.html");

    fs.readFile(templatePath, "utf-8", function (err, contents) {
      if (err) {
        return next(err);
      }

      next(contents);
    });
  }
}
