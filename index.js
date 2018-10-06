const ObjectsToCsv = require("objects-to-csv");
const path = require("path");
const { parseVCard } = require("./lib/parseCards.js");
const fs = require("fs");
const config = require("./config.js");
const helper = require("./utils/helper");
const END = "END:VCARD";

const commandOptions = require("./commandLine");
(async () => {
  const proceed = await require("./bootstrap")();
  if (!proceed) {
    helper.printRed(
      "Sorry one or more of the essential requirements to run this application is not met. Please see the previous messages and retry again."
    );
    process.exit(0);
  }
  const vCardFiles = config.input_files;

  /**
   * If the user provided a list of files then
   * just iterate through the files and add a
   * readline listener to each of them.
   *
   * If a folder is given then operate on each file of the
   * folder but check before if the file is a
   * valid vcf file or not.
   */

  if (vCardFiles.length > 0) {
    /**
     * There can be more than one file so for that purpose
     * run a loop for all the files in the array.
     */
    vCardFiles.forEach(vCardFile => {
      lineReader = require("readline").createInterface({
        input: fs.createReadStream(vCardFile)
      });
    });
    initiateReadingFiles();
  } else {
    // do it for every file in the input directory
    fs.readdir(config.input_folder, "utf8", (err, files) => {
      if (err) {
        console.log({ err });
      } else {
        files.filter(f => f.endsWith("vcf")).forEach(vCardFile => {
          lineReader = require("readline").createInterface({
            input: fs.createReadStream(
              path.join(config.input_folder, vCardFile)
            )
          });
        });
        initiateReadingFiles();
      }
    });
  }
})();

function initiateReadingFiles() {
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
}

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
