"use strict";
const fs = require("fs");
const path = require("path");
const ts = require("typescript");

function handleFileUpdate() {
  fs.watch(this.context.srcTranspilePath, (eventType, fileName) => {
    console.log(`event type is: ${eventType}`);
    if (fileName) {
      console.log(`fileName provided: ${fileName}`);
    } else {
      console.log("fileName not provided");
    }

    switch (eventType) {
      case "rename":
      case "change":
      default:
        handleModificationToFile.apply(this, [
          this.context.srcTranspilePath,
          fileName
        ]);
        break;
    }
  });
}

function getFileRelativePath() {

}

function handleModificationToFile(basePath, fileName) {
  const file = path.join(basePath, fileName);
  const root = this.destinationPath("./.fluid-parse");
  const fileFolder = path.dirname(fileName);
  const destFolder = path.join(root, fileFolder);
  const destFile = path.join(root, `${fileName}.json`);
  
  this.log(
    "statments are available below",
    basePath,
    fileName,
    file
  );

  const fileContent = fs.readFileSync(file, { encoding: "utf-8" });
  const src = ts.createSourceFile(
    fileName,
    fileContent,
    ts.ScriptTarget.ESNext,
    false,
    ts.ScriptKind.TSX
  );

  console.log(
    "statments are available below",
    destFile,
    destFolder
  );

  try {
    fs.accessSync(destFolder, fs.constants.F_OK);
  } catch (e) {
    fs.mkdirSync(destFolder, { recursive: true, flag: '' });
  }
  fs.writeFileSync(destFile, JSON.stringify(src, null, 4), {
    encoding: "utf-8",
    flag: "w+"
  });
}

module.exports = {
  watches() {
    return {
      handleFileUpdate
    };
  }
};
