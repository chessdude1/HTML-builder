const fs = require("fs");
const path = require("path");

fs.mkdir(path.join("./04-copy-directory/", "files-copy"), (err) => {
  console.log(err | "ok");
});

const directoryNewFolder = "./04-copy-directory/files-copy";
const directoryOldFolder = "./04-copy-directory/files";

deleteFromFolder(directoryNewFolder);

function deleteFromFolder(folderName) {
  fs.readdir(folderName, (err, files) => {
    if (err) {
      console.log(err);
    }
    files.forEach((file) => {
      fs.unlink(folderName + `/${file}`, (err) => {
        console.log(err | "ok");
      });
    });
  });
}

getFolderData(directoryOldFolder);
function getFolderData(folderName) {
  fs.readdir(folderName, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      fs.stat(folderName + "/" + file, (err, currentFile) => {
        fs.copyFile(
          directoryOldFolder + `/${file}`,
          directoryNewFolder + `/${file}`,
          (err) => {
            console.log(err | "ok");
          }
        );
      });
    });
  });
}
