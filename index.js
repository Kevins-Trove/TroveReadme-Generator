#!/usr/bin/env node

//------------------------------------------------------------
// Packages
//------------------------------------------------------------
const inquirer = require('inquirer');
const ReadMe = require('./utils/generateMarkdownClass');
const { execSync } = require('child_process');
const License = require('./utils/licenseClass');

//------------------------------------------------------------
// Default values
//------------------------------------------------------------
const respoitryName = getGitRepositoryName();
const respoitryEmail = getGitUserEmail();
const editor = 'notepad.exe';

//------------------------------------------------------------
// Start and initialize app
//------------------------------------------------------------
main();

//------------------------------------------------------------
// Main
//------------------------------------------------------------
function main() {
  console.log(`----------------------------------------------------------------------`);
  console.log('\x1b[33m%s\x1b[0m',`Trove README generator`);
  console.log('\x1b[33m%s\x1b[0m',`Answer dynamic prompts to autogenerate README.md file.`);
  console.log(`----------------------------------------------------------------------`);
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
        message: 'Project description?',
        editor: "code"
      },
      {
        type: 'list',
        name: 'license',
        message: 'License for project?',
        choices: new License().licenseBadgeList(),
        default: "MIT"
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
        message: 'Testing instructions:'
      },
      {
        type: 'input',
        name: 'contact',
        message: 'Contact info for questions',
        default: respoitryEmail
      }
    
    ])
    .then((answers) => {
      const myReadMe = new ReadMe(answers);
      myReadMe.writeToFile();
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


