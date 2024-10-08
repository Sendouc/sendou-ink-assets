const fs = require("fs");
const path = require("path");
const inputFolder = path.join(__dirname, "input", "overhead");
const outputFolder = path.join(__dirname, "planner-maps-new");

fs.readdir(inputFolder, (err, files) => {
  for (const file of files) {
    const stageId = resolveStageId(file);
    const mode = resolveMode(file);
    const type = resolveType(file);

    const newFileName = `${stageId}-${mode}-${type}.png`;

    console.log(`${file} -> ${newFileName}`);

    fs.copyFileSync(
      path.join(inputFolder, file),
      path.join(outputFolder, newFileName)
    );
  }
});

const stageIdsMap = {
  Scorch: 0, // Scorch Gorge
  Eeltail: 1, // Eeltail Alley
  Hagglefish: 2, // Hagglefish Market
  Undertow: 3, // Undertow Spillway
  Mincemeat: 4, // Mincemeat Metalworks
  Hammerhead: 5, // Hammerhead Bridge
  Museum: 6, // Museum d'Alfonsino
  Mahi: 7, // Mahi-Mahi Resort
  IAA: 8, // Inkblot Art Academy
  SgS: 9, // Sturgeon Shipyard
  MaM: 10, // MakoMart
  WaW: 11, // Wahoo World
  Flounder: 12, // Flounder Heights
  Brinewater: 13, // Brinewater Springs
  Manta: 14, // Manta Maria
  Umami: 15, // Um'ami Ruins
  HPT: 16, // Humpback Pump Track
  Barnacle: 17, // Barnacle & Dime
  Crableg: 18, // Crableg Capital
  SCC: 19, // Shipshape Cargo Co.
  Bluefin: 20, // Bluefin Depot
  RRe: 21, // Robo ROM-en
  Marlin: 22, // Marlin Airport
};
function resolveStageId(fileName) {
  for (const stageCode of Object.keys(stageIdsMap)) {
    if (fileName.includes(stageCode)) {
      return stageIdsMap[stageCode];
    }
  }

  throw new Error(`Could not resolve stageId for ${fileName}`);
}

function resolveMode(fileName) {
  for (const mode of ["TW", "SZ", "TC", "RM", "CB"]) {
    if (fileName.includes(` ${mode}`)) {
      return mode;
    }
  }

  throw new Error(`Could not resolve mode for ${fileName}`);
}

function resolveType(fileName) {
  // return "MINI";
  return "OVER";
}
