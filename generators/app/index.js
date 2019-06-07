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
    this.log(yosay(`Welcome to the ${chalk.red("fluid-code")} generator!`));
  }

  initializing() {}

  get prompting() {
    return {
      logging: function() {
        this.log("prompt shown.......");
      },
      queryProjectInfo: function() {
        const done = this.async();
        const isFlutterProject = {
          type: "confirm",
          name: "isFlutterProject",
          message: "Are we inside an Flutter Project?",
          default: true
        };
        const pubSpecPath = {
          type: "input",
          name: "pubSpecYamlPath",
          message: "Path to the pubspec.yaml file?",
          default: "./pubspec.yaml"
        };
        const dartLibPath = {
          type: "input",
          name: "dartLibPath",
          message: "Base Dart Library path for Application?",
          default: "./lib"
        };
        const srcTranspilePath = {
          type: "input",
          name: "srcTranspilePath",
          message: "Path where the fluid code is available?",
          default: "./.fluid"
        };

        this.prompt([
          isFlutterProject,
          pubSpecPath,
          dartLibPath,
          srcTranspilePath
        ]).then(answers => {
          this.context = { ...this.context, ...answers };
          done();
        });
      }
    };
  }

  get configuring() {
    return {
      processContext() {},
      handleFileUpdate() {
        fs.watch(this.context.srcTranspilePath, (eventType, filename) => {
          console.log(`event type is: ${eventType}`);
          if (filename) {
            console.log(`filename provided: ${filename}`);
          } else {
            console.log("filename not provided");
          }
        });
      }
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
