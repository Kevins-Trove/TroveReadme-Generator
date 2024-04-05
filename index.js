// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const ReadMe = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
//const questions = [];
// TODO: Create a function to write README file
function writeToFile(fileName, data) {

}


// TODO: Create a function to initialize app
function init() {
    //prompt(question).then()
    inquirer
  .prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Project title?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Project description?'
    },
    {
      type: 'input',
      name: 'installation',
      message: 'Installation instructions:'
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Usage information:'
    },
    {
      type: 'input',
      name: 'contribution',
      message: 'Contribution guidelines:'
    }
    ,
    {
      type: 'input',
      name: 'test',
      message: 'test instructions:'
    }
  ])
  .then((answers) => {
    const myReadMe = new ReadMe(answers);
    myReadMe.render();
  });
}



// Function call to initialize app
init();
