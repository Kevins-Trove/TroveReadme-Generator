//------------------------------------------------------------
// Packages
//------------------------------------------------------------
const inquirer = require('inquirer');
const fs = require('fs');
const ReadMe = require('./utils/generateMarkdown');
const { execSync } = require('child_process');

//------------------------------------------------------------
// Default values
//------------------------------------------------------------
const respoitryName = getGitRepositoryName();

//------------------------------------------------------------
// Main
//------------------------------------------------------------
function main() {
inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Project title?',
      default: respoitryName
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
    },
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


//------------------------------------------------------------
// Support functions
//------------------------------------------------------------

// Get Git repository name
function getGitRepositoryName() {
  try {
    // Run git command to get remote URL
    const url = execSync('git config --get remote.origin.url').toString().trim();
    
     // Extract repository name from URL
     const parts = url.split('/');
     const repositoryName = parts[parts.length - 1].replace('.git', '');
 
     return repositoryName;
  } catch (error) {}
}


//------------------------------------------------------------
// Start and initialize app
//------------------------------------------------------------
main();
