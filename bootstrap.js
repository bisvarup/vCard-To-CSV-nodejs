const fs = require("fs");
const makeDir = require("make-dir");
const helper = require("./utils/helper");
const config = require("./config.js");
const messages = require("./utils/messages.json");

helper.printYellow(`
///////////////////////////////////////////
//                                       //
//   Bootstraping Application            //
//   Created By: Bisvarup Mukherjee      //
//                                       //
///////////////////////////////////////////
`);
console.log(config);
helper.printYellow(messages["bootstrap_init"]);

/**
 * Check if the input folder exists
 * Check if the output folder exist
 * check if the input file exist
 *
 */

const stats = {
  input_folder_exist: null,
  output_folder_exist: null,
  input_path_exist: null
};

let all_ok = true;

// Check and operate on input folder
if (config.input_folder !== null || config.input_folder !== "") {
  stats.input_folder_exist = fs.existsSync(config.input_folder);
  if (stats.input_folder_exist) helper.printGreen("Input folder exists");
  else {
    helper.printRed("Input folder does not exist.");
    helper.printGreen("Attempting to create folder.");
    (async function() {
      await makeDir(config.input_folder);
    })();
  }
} else {
  stats.input_folder_exist = true;
  helper.printGreen("Input folder exists");
}

// check and operate on output folder
if (config.output_path != null || config.output_path !== "") {
  stats.output_folder_exist = fs.existsSync(config.output_path);
  if (stats.output_folder_exist) helper.printGreen("Output folder exists");
  else {
    helper.printRed("Output folder does not exist.");
    helper.printGreen("Attempting to create folder.");
    (async function() {
      await makeDir(config.output_path);
    })();
  }
} else {
  stats.output_folder_exist = true;
  helper.printGreen("Output folder exists");
}

// operate on input file
if (config.input_file !== null || config.input_file != "") {
  stats.input_path_exist = fs.existsSync(config.input_file);
  if (stats.input_path_exist) {
    helper.printGreen("Input file exists");
  } else {
    helper.printRed("Input file does not exist.");
    all_ok = false;
  }
}

if (all_ok) {
  helper.printGreen("Everything alright, proceeding with application.");
} else {
  helper.printRed("One or more field of config is not valid, please check.");
}

module.exports = all_ok;
