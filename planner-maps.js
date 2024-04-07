const fs = require("fs");
const path = require("path");
const inputFolder = path.join(__dirname, "input");
const outputFolder = path.join(__dirname, "planner-maps");

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
  ScG: 0, // Scorch Gorge
  EtA: 1, // Eeltail Alley
  HfM: 2, // Hagglefish Market
  UtS: 3, // Undertow Spillway
  MmM: 4, // Mincemeat Metalworks
  HhB: 5, // Hammerhead Bridge
  MdA: 6, // Museum d'Alfonsino
  MMR: 7, // Mahi-Mahi Resort
  IAA: 8, // Inkblot Art Academy
  SgS: 9, // Sturgeon Shipyard
  MaM: 10, // MakoMart
  WaW: 11, // Wahoo World
  FlH: 12, // Flounder Heights
  BwS: 13, // Brinewater Springs
  MtM: 14, // Manta Maria
  UaR: 15, // Um'ami Ruins
  HPT: 16, // Humpback Pump Track
  B_D: 17, // Barnacle & Dime
  CrC: 18, // Crableg Capital
  SCC: 19, // Shipshape Cargo Co.
  BfD: 20, // Bluefin Depot
  RRe: 21, // Robo ROM-en
  MaP: 22, // Marlin Airport
};
function resolveStageId(fileName) {
  for (const stageCode of Object.keys(stageIdsMap)) {
    if (fileName.includes(`_${stageCode}_`)) {
      return stageIdsMap[stageCode];
    }
  }

  throw new Error(`Could not resolve stageId for ${fileName}`);
}

function resolveMode(fileName) {
  for (const mode of ["TW", "SZ", "TC", "RM", "CB"]) {
    if (fileName.includes(`_${mode}_`)) {
      return mode;
    }
  }

  throw new Error(`Could not resolve mode for ${fileName}`);
}

function resolveType(fileName) {
  if (fileName.includes("_td_blank")) {
    return "OVER";
  }

  if (fileName.includes("_map_blank")) {
    return "MINI";
  }

  if (fileName.includes("_map_object")) {
    return "ITEMS";
  }

  throw new Error(`Could not resolve type for ${fileName}`);
}
