const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let WriteStream = fs.createWriteStream("./02-write-file/writeText.txt", "utf8");

rl.question("Enter your text", () => {
  rl.on("line", (userInput = "\n") => {
    if (userInput == "exit") {
      rl.close();
    } else {
      WriteStream.write(userInput + "\n");
    }
  });
});

rl.on("SIGINT", () => {
  rl.close();
});

rl.on("close", () => {
  console.log("Bye");
});
