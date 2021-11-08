const fs = require("fs");
const path = require("path");
let readableStream = fs.createReadStream(
  "./06-build-page/template.html",
  "utf8"
);

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

let parsedTemplate = [];

GetAllTextFromHTML();
function GetAllTextFromHTML() {
  readableStream.on("data", (chunk) => {
    parsedTemplate = chunk
      .split("{{")
      .join("$")
      .split(/[$ }}]/);

    chunk.split(/{{(.*?)}}/).forEach((elem) => {
      if (
        elem.split("").indexOf("<") === -1 &&
        elem.split("").indexOf(">") === -1 &&
        elem.split("").indexOf(" ") === -1
      ) {
        let nameOfFile = elem + ".html";
        fs.readFile(
          `./06-build-page/components/${nameOfFile}`,
          "utf-8",
          (err, data) => {
            if (err) {
              console.log(err);
            }
            objWithText[elem] = data;
          }
        );
      }
    });
  });
}

let objWithText = {
  text: 1,
};

setTimeout(() => {
  getIndexDataAfterMutation();
}, 100);

function getIndexDataAfterMutation() {
  let readableStream = fs.createReadStream(
    "./06-build-page/template.html",
    "utf8"
  );
  readableStream.on("data", function (chunk) {
    chunk.split(/{{(.*?)}}/).forEach((elem) => {
      replaceTags(elem);
    });
  });
}

// function appendFileToDirectory(directory, content) {
//   fs.appendFile(directory, content, (err) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(content);
//   });
// }

function replaceTags(elem) {
  if (elem in objWithText) {
    parsedTemplate[parsedTemplate.indexOf(elem)] = objWithText[elem];
    let currentData = parsedTemplate.join(" ");
    fs.writeFile(
      "./06-build-page/project-dist/index.html",
      currentData,
      "utf-8",
      function (err) {
        if (err) throw err;
        console.log("filelistAsync complete");
      }
    );
  }
}

function selectiveDelete() {
  simpleDeleteFromDirectory("./06-build-page/project-dist/assets/fonts");
  simpleDeleteFromDirectory("./06-build-page/project-dist/assets/img");
  simpleDeleteFromDirectory("./06-build-page/project-dist/assets/svg");
  simpleDeleteFromDirectory("./06-build-page/project-dist/styles");
  simpleDeleteFromDirectory("./06-build-page/project-dist/");
}

function simpleDeleteFromDirectory(directory) {
  fs.readdir(directory, (err, files) => {
    files.forEach((file) => {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  });
}

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
