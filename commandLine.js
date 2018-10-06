const commandLineArgs = require("command-line-args");
const helper = require("./utils/helper");
const optionDefinitions = [
  { name: "files", type: String, multiple: true },
  { name: "folder", alias: "f", type: String },
  { name: "output", alias: "o", type: String },
  { name: "help", alias: "h", type: Boolean }
];
const options = commandLineArgs(optionDefinitions);
const config = {};
if (options.help) {
  helper.printYellow("I will help you.");
} else {
  if (options.folder) {
    config.input_folder = options.folder;
  }
  if (options.files) {
    config.input_files = options.files;
  }
  if (options.output) {
    config.output_path = options.output;
  }
}

module.exports = config;
