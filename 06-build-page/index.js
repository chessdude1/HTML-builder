const fs = require("fs");
let readableStream = fs.createReadStream(
  "./06-build-page/template.html",
  "utf8"
);

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
        console.log(elem.split(""));
        data += replaceTags(elem);
      } else {
        data += elem;
      }
    });
    appendFileToDirectory("./06-build-page/project-dist/index.html", data);
  });
}

function appendFileToDirectory(directory, content) {
  fs.appendFile(directory, content, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("done");
    }
  });
}

function replaceTags(elem) {
  return `<${elem}> </${elem}>`;
}
