const path = require("path");

const input_folder = "vCards"; // input_folder: "some path"
const input_file = "john-doe.vcf";
const output_path = "output/final/lets/see";
const output_file = "output.csv";

module.exports = {
  input_folder,
  input_file: path.join(__dirname, input_folder, input_file),
  output_path: path.join(__dirname, output_path),
  output_file: path.join(__dirname, output_path, output_file)
};
