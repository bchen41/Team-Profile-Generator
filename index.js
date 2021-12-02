const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");

const teamMembers = [];

function appMenu() {
  function createManager() {
    console.log("Please build your team");
    inquirer
      .prompt([
        {
          type: "input",
          name: "managerName",
          message: "What is the team manager's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
        {
          type: "input",
          name: "managerId",
          message: "What is the team manager's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          },
        },
        {
          type: "input",
          name: "managerEmail",
          message: "What is the team manager's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          },
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "What is the team manager's office number?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          },
        },
      ])
      .then((answers) => {
        // create a manager object from class Manager
        const { managerName, managerId, managerEmail, managerOfficeNumber } =
          answers;
        const manager = new Manager(
          managerName,
          managerId,
          managerEmail,
          managerOfficeNumber
        );
        // add the manager object to teamMembers
        teamMembers.push(manager);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "What is the team engineer's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
        {
          type: "input",
          name: "engineerId",
          message: "What is the team engineer's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          },
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "What is the team engineer's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          },
        },
        {
          type: "input",
          name: "engineerGitHub",
          message: "What is the team engineer's GitHub username?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
      ])
      .then((answers) => {
        // create an engineer object from class Engineer
        const { engineerName, engineerId, engineerEmail, engineerGitHub } =
          answers;
        const engineer = new Engineer(
          engineerName,
          engineerId,
          engineerEmail,
          engineerGitHub
        );
        // add the engineer object to teamMembers
        teamMembers.push(engineer);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "What is the team intern's name?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
        {
          type: "input",
          name: "internId",
          message: "What is the team intern's id?",
          validate: (answer) => {
            const pass = answer.match(/^[1-9]\d*$/);
            if (pass) {
              return true;
            }
            return "Please enter a positive number greater than zero.";
          },
        },
        {
          type: "input",
          name: "internEmail",
          message: "What is the team intern's email?",
          validate: (answer) => {
            const pass = answer.match(/\S+@\S+\.\S+/);
            if (pass) {
              return true;
            }
            return "Please enter a valid email address.";
          },
        },
        {
          type: "input",
          name: "internSchool",
          message: "What is the team intern's school?",
          validate: (answer) => {
            if (answer !== "") {
              return true;
            }
            return "Please enter at least one character.";
          },
        },
      ])
      .then((answers) => {
        // create an intern object from class Intern
        const { internName, internId, internEmail, internSchool } = answers;
        const intern = new Intern(
          internName,
          internId,
          internEmail,
          internSchool
        );
        // add the intern object to teamMembers
        teamMembers.push(intern);
        createTeam();
      });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    console.log("Successfully wrote team.html");
  }

  createManager();
}

appMenu();
