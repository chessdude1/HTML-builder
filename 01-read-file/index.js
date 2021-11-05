const fs = require("fs");
let readableStream = fs.createReadStream("./01-read-file/text.txt", "utf8");
readableStream.on("data", function (chunk) {
  console.log(chunk);
});
