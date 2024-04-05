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
const respoitryEmail = getGitUserEmail();

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
      name: 'credits',
      message: 'Credits (collaborators):'
    },
    {
      type: 'input',
      name: 'test',
      message: 'test instructions:'
    }
    ,
    {
      type: 'input',
      name: 'contact',
      message: 'Contact info for questions',
      default: respoitryEmail
    }
  
  ])
  .then((answers) => {
    const myReadMe = new ReadMe(answers);
    console.log(myReadMe.render());
    
  });
}


//------------------------------------------------------------
// Support functions
//------------------------------------------------------------

// Extract repository name from git
function getGitRepositoryName() {
  try {
    // Git command to get URL of remote 
    const url = execSync('git config --get remote.origin.url').toString().trim();
    
     // Extract repository name from URL
     const parts = url.split('/');
     const repositoryName = parts[parts.length - 1].replace('.git', '');
 
     return repositoryName;
  } catch (error) {}
}

// Extract repository user email name from git
function getGitUserEmail() {
  try {
    // Git command to get user email
    const result = execSync('git config --get user.email');
    return result.toString().trim();
  } catch (error) {};
  
}

//------------------------------------------------------------
// Start and initialize app
//------------------------------------------------------------
main();
