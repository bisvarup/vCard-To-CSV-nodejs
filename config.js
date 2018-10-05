const path = require("path");

const input_folder = "vCards"; // input_folder: "some path"
const input_files = [];
const output_path = "output/final/lets/see";
const output_file = "output.csv";

module.exports = {
  input_folder,
  // input_file: path.join(__dirname, input_folder, input_file),
  input_files: input_files.map(f => path.join(__dirname, input_folder, f)),
  output_path: path.join(__dirname, output_path),
  output_file: path.join(__dirname, output_path, output_file)
};
