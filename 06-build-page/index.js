const fs = require("fs");
const path = require("path");
let readableStream = fs.createReadStream(
  "./06-build-page/template.html",
  "utf8"
);
console.log("~~~~~~~~~");
selectiveDelete();
fs.mkdir("./06-build-page/project-dist/", (err) => {
  if (err) console.log(err);
});

fs.mkdir("./06-build-page/project-dist/assets/fonts", (err) => {
  if (err) console.log(err);
});

fs.mkdir("./06-build-page/project-dist/assets/img", (err) => {
  if (err) console.log(err);
});

fs.mkdir("./06-build-page/project-dist/assets/svg", (err) => {
  if (err) console.log(err);
});

fs.mkdir("./06-build-page/project-dist/assets", (err) => {
  if (err) console.log(err);
});

fs.mkdir("./06-build-page/project-dist/assets/fonts", (err) => {
  if (err) console.log(err);
});

fs.mkdir("./06-build-page/project-dist/assets/img", (err) => {
  if (err) console.log(err);
});

fs.mkdir("./06-build-page/project-dist/assets/svg", (err) => {
  if (err) console.log(err);
});

fs.mkdir("./06-build-page/project-dist/styles", (err) => {
  if (err) console.log(err);
});

getIndexDataAfterMutation();
function getIndexDataAfterMutation() {
  readableStream.on("data", function (chunk) {
    let data = "";
    chunk.split(/{{(.*?)}}/).forEach((elem) => {
      if (
        elem.split("").indexOf("<") === -1 &&
        elem.split("").indexOf(">") === -1 &&
        elem.split("").indexOf(" ") === -1
      ) {
        // console.log(await replaceTags(elem));
        replaceTags(elem);
      } else {
        fs.appendFile(
          "./06-build-page/project-dist/index.html",
          elem,
          (err) => {
            if (err) {
              console.log(err);
            } else {
              console.log("done");
            }
          }
        );
        // data += elem;
      }
    });
    // appendFileToDirectory("./06-build-page/project-dist/index.html", data);
  });
}

function appendFileToDirectory(directory, content) {
  fs.appendFile(directory, content, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function replaceTags(elem) {
  let nameOfFile = elem + ".html";
  fs.readFile(
    `./06-build-page/components/${nameOfFile}`,
    "utf8",
    (err, data) => {
      if (err) console.log(err);
      fs.appendFile("./06-build-page/project-dist/index.html", data, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("done");
        }
      });
    }
  );
  // fs.readFile(
  //   `./06-build-page/components/${nameOfFile}`,
  //   "utf8",
  //   (err, Content) => {
  //     test(Content);
  //   }
  // );
  // console.log(a);
  // return a;
}

// function deleteFromFolder(folderName) {
//   fs.readdir(folderName, (err, files) => {
//     if (err) {
//       console.log(err);
//     }
//     files.forEach((file) => {
//       fs.stat(path.join(folderName, file), (err, currentFile) => {
//         if (currentFile.isDirectory()) {
//           fs.rmdir(path.join(folderName, file), (err) => {
//             if (err) console.log(err);
//           });
//         } else {
//           fs.unlink(folderName + `/${file}`, (err) => {
//             if (err) console.log(err);
//           });
//         }
//       });
//     });
//   });
// }

// function deepDeleteFromFolder(folderName) {
//   fs.readdir(folderName, (err, files) => {
//     if (err) {
//       console.log(err);
//     }
//     files.forEach((file) => {
//       fs.stat(path.join(folderName, file), (err, currentFile) => {
//         if (err) console.log(err);
//         if (currentFile.isDirectory()) {
//           console.log(path.join(folderName, file));
//           console.log("~~");
//           fs.rmdir(path.join(folderName, file), (err) => {
//             if (err) {
//               deepDeleteFromFolder(folderName);
//             }
//           });
//         }
//       });
//     });
//   });
// }

function selectiveDelete() {
  simpleDeleteFromDirectory("./06-build-page/project-dist/assets/fonts");
  simpleDeleteFromDirectory("./06-build-page/project-dist/assets/img");
  simpleDeleteFromDirectory("./06-build-page/project-dist/assets/svg");
  simpleDeleteFromDirectory("./06-build-page/project-dist/styles");
  simpleDeleteFromDirectory("./06-build-page/project-dist/");
}

function simpleDeleteFromDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    console.log(files);
    files.forEach((file) => {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  });
}

// function surfaceDeleteFromFolder(surfaceFolderName) {
//   fs.readdir(surfaceFolderName, (err, files) => {
//     if (err) {
//       console.log(err);
//     }
//     files.forEach((file) => {
//       fs.stat(path.join(surfaceFolderName, file), (err, currentFile) => {
//         if (err) console.log(err);

//         if (currentFile.isDirectory()) {
//           surfaceDeleteFromFolder(path.join(surfaceFolderName, file));
//         } else
//           fs.unlink(path.join(surfaceFolderName, file), (err) => {
//             if (err) console.log(err);
//           });
//       });
//     });
//   });
// }

const directoryOldFolderFonts = "./06-build-page/assets/fonts";
const directoryNewFolderFonts = "./06-build-page/project-dist/assets/fonts";

const directoryOldFolderImg = "./06-build-page/assets/svg";
const directoryNewFolderImg = "./06-build-page/project-dist/assets/svg";

const directoryOldFolderSvg = "./06-build-page/assets/img";
const directoryNewFolderSvg = "./06-build-page/project-dist/assets/img";

getFolderData(directoryOldFolderFonts, directoryNewFolderFonts);
getFolderData(directoryOldFolderImg, directoryNewFolderImg);
getFolderData(directoryOldFolderSvg, directoryNewFolderSvg);

function getFolderData(folderName, directoryNewFolder) {
  fs.readdir(folderName, (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      fs.stat(folderName + "/" + file, (err, currentFile) => {
        fs.copyFile(
          folderName + `/${file}`,
          directoryNewFolder + `/${file}`,
          (err) => {
            if (err) console.log(err);
          }
        );
      });
    });
  });
}

getStyleFolderData("./06-build-page/styles");

function getStyleFolderData(folderName) {
  fs.readdir(folderName, (err, files) => {
    if (err) console.log(err);
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
    fs.appendFile(
      "./06-build-page/project-dist/styles/bundle.css",
      data,
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
}
