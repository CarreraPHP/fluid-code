"use strict";
const fs = require("fs");
const path = require("path");
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const { prompts } = require("./prompts");

module.exports = class extends Generator {
  constructor() {
    super(...arguments);
    this.context = {};
    this.log("Transpile Generator Called...");
  }

  initializing() {}

  get prompting() {
    return {
      logging: function() {
        this.log("prompt shown.......");
      }
    };
  }

  get configuring() {
    return {
      processContext() {},
    };
  }

  // default methods, which can be of any name.

  writing() {
    //   this.fs.copy(
    //     this.templatePath("dummyfile.txt"),
    //     this.destinationPath("dummyfile.txt")
    //   );
  }

  conflicts() {
    // to handle conflicts, mostly done internally
  }

  /**
   * No need for installation, as the project is not a node or bower project.
   */
  install() {
    //   this.installDependencies();
  }

  end() {}
};
