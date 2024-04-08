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
  console.log('\x1b[33m%s\x1b[0m',` The deafult text editor will be opened to enter blocks of text.`);
  console.log('\x1b[33m%s\x1b[0m',` Close and save the editor to submit text block.`);
  console.log(`----------------------------------------------------------------------`);
  inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Project title?',
        default: respoitryName
      },
      {
        type: 'editor',
        name: 'description',
        message: 'Project description?',
        filter: function(value) {
          // Normalize line endings
          return value.trim().replace(/\r\n|\r|\n/g, '\n');
        }
      },
      {
        type: 'list',
        name: 'license',
        message: 'License for project?',
        choices: new License().licenseBadgeList(),
        default: "MIT"
      },
      {
        type: 'editor',
        name: 'installation',
        message: 'Installation instructions:',
        filter: function(value) {
          // Normalize line endings
          return value.trim().replace(/\r\n|\r|\n/g, '\n');
        }
      },
      {
        type: 'editor',
        name: 'usage',
        message: 'Usage information:',
        filter: function(value) {
          // Normalize line endings
          return value.trim().replace(/\r\n|\r|\n/g, '\n');
        }
      },
      {
        type: 'editor',
        name: 'credits',
        message: 'Credits (collaborators):',
        filter: function(value) {
          // Normalize line endings
          return value.trim().replace(/\r\n|\r|\n/g, '\n');
        }
      },
      {
        type: 'editor',
        name: 'test',
        message: 'Testing instructions:',
        filter: function(value) {
          // Normalize line endings
          return value.trim().replace(/\r\n|\r|\n/g, '\n');
        }
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


