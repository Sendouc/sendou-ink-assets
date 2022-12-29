// iterate through files in planner-maps directory and log them to console
var fs = require("fs");
var path = require("path");
var dir = path.join(__dirname, "..", "planner-maps");
var files = fs.readdirSync(dir);

for (const file of files) {
  const addition = file.includes("td_blank")
    ? "OVER"
    : file.includes("map_blank")
    ? "MINI"
    : "ITEMS";

  // modes are TW, SZ, TC, RM, CB
  const mode = file.includes("TW")
    ? "TW"
    : file.includes("SZ")
    ? "SZ"
    : file.includes("TC")
    ? "TC"
    : file.includes("RM")
    ? "RM"
    : "CB";

  let number = Number(file.split("m")[0].replace("s", "")) - 1;

  // already renamed this file
  if (Number.isNaN(number)) continue;

  if (number === 13) number = 12;
  else if (number === 12) number = 13;

  console.log("old name", file);
  console.log("new name", `${number}-${mode}-${addition}.png`);

  // rename
  fs.renameSync(
    path.join(__dirname, "..", "planner-maps", file),
    path.join(
      __dirname,
      "..",
      "planner-maps",
      `${number}-${mode}-${addition}.png`
    )
  );
}
