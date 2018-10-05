const chalk = require("chalk");

module.exports.printYellow = (...data) => {
  console.log(chalk.yellow(data));
};

module.exports.printRed = (...data) => {
  console.log(chalk.red(data));
};

module.exports.printGreen = (...data) => {
  console.log(chalk.green(data));
};
