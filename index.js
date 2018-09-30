const ObjectsToCsv = require("objects-to-csv");
const { parseVCard } = require("./parseCards.js");

const END = "END:VCARD";

const vCardFile = "./john-doe.vcf";
var lineReader = require("readline").createInterface({
  input: require("fs").createReadStream(vCardFile)
});
let vCards = [];
let buffer = "";
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

function saveCSVtoDisk(vCards) {
  (async () => {
    let csv = new ObjectsToCsv(vCards);
    const OUTPUT_PATH = "./output.csv";
    await csv.toDisk(OUTPUT_PATH);
    console.log("saved csv to disk");
  })();
}

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

function detectKeys(obj, keys = {}) {
  Object.keys(obj).forEach(o => {
    if (keys[o] === undefined) keys[o] = true;
  });
  return keys;
}
