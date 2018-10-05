const fs = require("fs");
const makeDir = require("make-dir");
const helper = require("./utils/helper");
const config = require("./config.js");
const messages = require("./utils/messages");

helper.printYellow(messages.app_header);
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

(async () => {
  module.exports = () => {
    return new Promise(async (resolve, reject) => {
      await checkInputFolder();
      await checkOutputFolder();
      await checkInputFile();

      if (all_ok) {
        helper.printGreen("Everything alright, proceeding with application.");
      } else {
        helper.printRed(
          "One or more field of config is not valid, please check."
        );
      }

      resolve(all_ok);
    });
  };
})();

// Check and operate on input folder
function checkInputFolder() {
  return new Promise((resolve, reject) => {
    if (config.input_folder !== null || config.input_folder !== "") {
      stats.input_folder_exist = fs.existsSync(config.input_folder);
      if (stats.input_folder_exist) {
        helper.printGreen("Input folder exists");
        resolve();
      } else {
        helper.printRed("Input folder does not exist.");
        helper.printGreen("Attempting to create folder.");
        (async function() {
          await makeDir(config.input_folder);
          resolve();
        })();
      }
    } else {
      stats.input_folder_exist = true;
      helper.printGreen("Input folder exists");
      resolve();
    }
  });
}

// check and operate on output folder
function checkOutputFolder() {
  return new Promise((resolve, reject) => {
    if (config.output_path != null || config.output_path !== "") {
      stats.output_folder_exist = fs.existsSync(config.output_path);
      if (stats.output_folder_exist) {
        helper.printGreen("Output folder exists");
        resolve();
      } else {
        helper.printRed("Output folder does not exist.");
        helper.printGreen("Attempting to create folder.");
        (async function() {
          makeDir(config.output_path).then(() => {
            if (!fs.existsSync(config.output_file)) {
              fs.writeFileSync(config.output_file, "");
              helper.printGreen("Created output.csv file");
              resolve();
            }
          });
        })();
      }
    } else {
      stats.output_folder_exist = true;
      helper.printGreen("Output folder exists");
      resolve();
    }
  });
}

// operate on input file
function checkInputFile() {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < config.input_files.length; i++) {
      const input_file = config.input_files[i];
      if (input_file !== null || input_file != "") {
        stats.input_path_exist = fs.existsSync(input_file);
        if (stats.input_path_exist) {
          helper.printGreen("Input file exists");
        } else {
          helper.printRed("Input file does not exist.");
          all_ok = false;
          resolve();
        }
      }
    }
    resolve();
  });
}
