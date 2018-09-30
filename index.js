var vCard = require("vcard-parser");
const util = require("util");
const fs = require("fs");

fs.readFile("john-doe.vcf", (err, data) => {
  if (err) throw err;
  else {
    data = data.toString();
    var card = convertArrayOfStringToString(vCard.parse(data));
    card = formatMeta(card);
    card = generateUnnestedJson(card);
    console.log(card);
    fs.writeFile("formated.txt", JSON.stringify(card, null, 2), () => {
      if (err) throw err;
    });
  }
});

function isArrayOfString(ar) {
  let bool = true;
  ar.forEach(e => {
    if (typeof e !== "string") bool = false;
  });
  if (bool) return true;
  return false;
}

function convertArrayOfStringToString(obj) {
  Object.keys(obj).forEach(o => {
    if (obj[o] instanceof Array) {
      if (isArrayOfString(obj[o])) {
        obj[o] = obj[o].join(" ").trim();
      } else {
        if (typeof obj[o] === "object")
          obj[o] = convertArrayOfStringToString(obj[o]);
      }
    } else if (typeof obj[o] === "object") {
      obj[o] = convertArrayOfStringToString(obj[o]);
    }
  });
  return obj;
}

function formatMeta(obj) {
  Object.keys(obj).forEach(e => {
    if (e.toString() === "meta") {
      let meta = obj[e];
      Object.keys(meta).forEach(m => {
        obj[m] = meta[m];
      });
      delete obj[e];
    } else if (typeof obj[e] === "object") {
      obj[e] = formatMeta(obj[e]);
    }
  });
  return obj;
}

function generateUnnestedJson(obj) {
  var json = {};
  Object.keys(obj).forEach(o => {
    let ar = obj[o];
    let str = o.toString();
    ar.forEach(elem => {
      if (elem["type"]) {
        json[str + " " + elem["type"]] = elem["value"];
      } else {
        json[str] = elem["value"];
      }
    });
  });
  return json;
}
