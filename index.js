var path = require("path");
var _ = require("lodash");
var ResumeBuilder = require("./build");
var resumeData = require("./resume.json");
var enhancedData = require("./resume.enhancements.json");

var resumeContent = _.merge({}, resumeData, enhancedData, {
  work: {
    featuredEntryCount: 3,
    history: resumeData.work
  }
});

ResumeBuilder.generate({ data: resumeContent });
