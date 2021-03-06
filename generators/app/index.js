"use strict";
// const fs = require("fs");
// const path = require("path");
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const { prompts } = require("./prompts");
const { watches } = require("./watches");

module.exports = class extends Generator {
  constructor() {
    super(...arguments);
    this.context = {};
    this.log(yosay(`Welcome to the ${chalk.red("fluid-code")} generator!`));
  }

  initializing() {}

  get prompting() {
    return {
      logging: function() {
        this.log("prompt shown.......");
      },
      ...prompts()
    };
  }

  get configuring() {
    return {
      processContext() {
        // this.fs.
      },
      ...watches()
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
