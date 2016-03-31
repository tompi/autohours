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
  },
  {
    "type": "input",
    "name": "client",
    "message": "Client",
    "default": "Skagenfondene"
  },
  {
    "type": "input",
    "name": "project",
    "message": "Project",
    "default": "CIP"
  },
  {
    "type": "input",
    "name": "description",
    "message": "Description",
    "default": "CIP"
  }
];

exports.getParameters = (callback) => {
  inquirer.prompt(questions, callback);
};

exports.confirm = (stay, callback) => {
  var confirmQuestion = {
    "type": "confirm",
    "name": "confirm",
    "message": "Really?",
    "default": true
  }
  inquirer.prompt(confirmQuestion, (answers) => {
    if (answers.confirm) {
      callback();
    }
  });
}
