const fs = require("fs");
var path = require("path");

let folderName = "./05-merge-styles/styles";

getFolderData(folderName);

function getFolderData(folderName) {
  fs.readdir(folderName, (err, files) => {
    if (err) console.log(err);
    deleteFromFolder(folderName);
    files.forEach((file) => {
      fs.stat(folderName + "/" + file, (err, currentFile) => {
        if (path.parse(file).ext == ".css") {
          copyFileСontent(file, folderName);
        }
        if (currentFile.isDirectory()) {
          getFolderData(folderName + "/" + file);
        }
      });
    });
  });
}

function copyFileСontent(file, directory) {
  fs.readFile(directory + "/" + file, "utf8", (err, data) => {
    if (err) throw err;
    fs.appendFile("./05-merge-styles/project-dist/bundle.css", data, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("done");
      }
    });
  });
}

function deleteFromFolder(directoryToFile) {
  fs.readdir("./05-merge-styles/project-dist", (err, files) => {
    if (files[0] == "bundle.css") {
      files[0];
      fs.unlink("./05-merge-styles/project-dist/bundle.css", (err) => {
        console.log(err | "done");
      });
    }
  });
}
