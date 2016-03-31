var inquirer = require("inquirer");

var now = new Date();

var questions = [
  {
    "type": "input",
    "name": "year",
    "message": "Year",
    "default": now.getFullYear()
  },
  {
    "type": "input",
    "name": "month",
    "message": "Month",
    "default": now.getMonth() + 1
  },
  {
    "type": "input",
    "name": "email",
    "message": "Email",
    "default": "thomas.haukland@gmail.com"
  }
];

inquirer.prompt(questions, function( answers ) {
    console.log(answers.year);
    console.log(answers.month);
});
