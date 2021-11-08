const fs = require("fs");
var path = require("path");

let folderName = "./03-files-in-folder/secret-folder";

getFolderData(folderName);

function getFolderData(folderName) {
  fs.readdir(folderName, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      fs.stat(folderName + "/" + file, (err, currentFile) => {
        if (currentFile.isDirectory()) {
        } else {
          console.log(
            `${
              path.parse(file).base.split(".")[0]
                ? path.parse(file).base.split(".")[0]
                : file
            } ${path.parse(file).ext} ${currentFile.size / 1024}kb`
          );
        }
      });
    });
  });
}
