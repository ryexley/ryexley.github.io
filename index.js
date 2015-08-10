var path = require("path");
var ResumeBuilder = require("./build");
var resumeData = require("./resume.json");

ResumeBuilder.generate({ data: resumeData });
