const ObjectsToCsv = require("objects-to-csv");
const chalk = require("chalk");
const path = require("path");
const commandLineArgs = require("command-line-args");
const { parseVCard } = require("./lib/parseCards.js");
const config = require("./config.js");
const END = "END:VCARD";

const optionDefinitions = [
  { name: "verbose", alias: "v", type: Boolean },
  { name: "files", type: String, multiple: true },
  { name: "folder", alias: "f", type: String },
  { name: "output", alias: "o", type: String },
  { name: "help", alias: "h", type: Boolean }
];
const options = commandLineArgs(optionDefinitions);

(async () => {
  await require("./bootstrap")();
  const vCardFile = config.input_file;

  var lineReader = require("readline").createInterface({
    input: require("fs").createReadStream(vCardFile)
  });
  let vCards = [];
  let buffer = "";

  /**
   * Read the file line by line and push each line
   * to an array. Till there is data keep making this array.
   */
  lineReader.on("line", function(line) {
    if (line !== END) buffer += line + "\r\n";
    else {
      vCards.push(parseVCard(buffer));
      buffer = "";
    }
  });

  lineReader.on("close", () => {
    let keys = {};
    for (let i = 0; i < vCards.length; i++) keys = detectKeys(vCards[i], keys);
    keys = Object.keys(keys);
    vCards = normalizeCards(vCards, keys);
    saveCSVtoDisk(vCards);
  });
})();

/**
 * Save a vCard array of csv to disk
 * @param {Array} vCards
 */
function saveCSVtoDisk(vCards) {
  (async () => {
    let csv = new ObjectsToCsv(vCards);
    const OUTPUT_PATH = config.output_file;
    await csv.toDisk(OUTPUT_PATH);
    console.log("saved csv to disk");
  })();
}

/**
 *
 * @param {*} vCards
 * @param {*} keys
 */
function normalizeCards(vCards, keys) {
  for (let i = 0; i < vCards.length; i++) {
    for (let j = 0; j < keys.length; j++) {
      if (!vCards[i][keys[j]]) {
        vCards[i][keys[j]] = null;
      }
    }
  }
  return vCards;
}

/**
 *
 * @param {*} obj
 * @param {*} keys
 */
function detectKeys(obj, keys = {}) {
  Object.keys(obj).forEach(o => {
    if (keys[o] === undefined) keys[o] = true;
  });
  return keys;
}
