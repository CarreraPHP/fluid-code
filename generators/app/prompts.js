function queryProjectInfo() {
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

function prompts() {
  return {
    queryProjectInfo
  };
}

module.exports = { prompts };
