var vCard = require("vcard-parser");

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

module.exports.parseVCard = data => {
  var card = vCard.parse(data);
  card = convertArrayOfStringToString(card);
  card = formatMeta(card);
  card = generateUnnestedJson(card);
  return card;
};
