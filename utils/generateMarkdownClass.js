//------------------------------------------------------------
// generateMarkdownClass
//
// Main class to create and format markdown file associated
// with a project.
//------------------------------------------------------------

//------------------------------------------------------------
// Packages
//------------------------------------------------------------
const { execSync } = require('child_process');
const fs = require('fs');
const License = require('./license');

//------------------------------------------------------------
// Class declaration
//------------------------------------------------------------
class ReadMe {
  constructor(questions) {
    this.title = questions.title;
    this.description = questions.description;
    this.installation = questions.installation;
    this.usage = questions.usage;
    this.credits = questions.credits;
    this.test = questions.test;
    this.license = questions.license;
    this.repository = this.getGitRepository();
    this.contact = questions.contact;
  }
};

//------------------------------------------------------------
// Global variables
//------------------------------------------------------------
const licenseBadges = {
  'MIT': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
  'Apache 2.0': '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
  'GPL': '[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)',
  'IPL': '[![License: IPL 1.0](https://img.shields.io/badge/License-IPL_1.0-blue.svg)](https://opensource.org/licenses/IPL-1.0)',
  'MPL': '[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)'
};

//------------------------------------------------------------
// Class function prototypes
//------------------------------------------------------------

// Controling function for readme layout
ReadMe.prototype.render = function (){
  let items = [];

  // Layout order of ReadMe Items
  items.push(this.renderTitle());
  items.push(this.renderDescription());
  items.push(this.renderToc());
  items.push(this.renderInstall());
  items.push(this.renderUsage());
  items.push(this.renderCredits());
  items.push(this.renderLicense());
  items.push(this.renderTests());
  items.push(this.renderContact());
  items.push(this.renderSignature());

  return items.join("\n");
  
};


// Write to file, calls render function
ReadMe.prototype.writeToFile = function (fileName){
  const items = this.render();

  fs.writeFile(fileName, items, (err) => {
    if (err) {
      console.error('Error:', err);
      return;
    }
    console.log('Data has been written to the file.');
  });

};

// Read file and parse by headers into class
ReadMe.prototype.readFileToClass = function(filename, callback) {
  
  fs.readFile(filename, 'utf8', (err, data) => {
    if (err) {
      callback(err, null);
      return;
    }
    
    // Split the data by header
    const dataArray = data.split('##');
    
    dataArray.forEach(item => {
      console.log(`Item =  ${item}`);
  });
    
    callback(null, dataArray);
  });
}

ReadMe.prototype.getGitRepository = function() {
  try {
    // Run git command to get remote URL
    const result = execSync('git config --get remote.origin.url');

    // return formated value
    return result.toString().trim();
  } catch (error) {}
}

ReadMe.prototype.renderTitle = function  (){
  return this.title ? `#  ${this.title} \n` : null;
};

ReadMe.prototype.renderDescription = function  (){
  return this.description ? `## Description \n ${this.description} \n` : null;
};

ReadMe.prototype.renderToc = function  (){
  let out = [];

  if (this.renderInstall()) out.push(`- [Installation](#installation)`);
  if (this.renderUsage()) out.push(`- [Usage](#usage)`);
  if (this.renderCredits()) out.push(`- [Credits](#credits)`);
  if (this.renderTests()) out.push(`- [Testing](#testing)`);
  if (this.renderLicense()) out.push(`- [License](#license)`);
  if (this.renderContact()) out.push(`- [Questions](#questions)`);
  
  return out ? `## Table of contents \n${out.join("\n")} \n`  : null
};

ReadMe.prototype.renderInstall = function  (){
  return this.installation ? `## Installation \n ${this.installation} \n` : null;
};

ReadMe.prototype.renderUsage = function  (){
  return this.installation ? `## Usage \n ${this.usage} \n` : null;
};

ReadMe.prototype.renderCredits = function (){
  return this.installation ? `## Credits \n ${this.credits} \n` : null;
};

ReadMe.prototype.renderTests = function (){
  return this.installation ? `## Tests \n ${this.test} \n` : null;
};

ReadMe.prototype.renderContact = function (){
  let out = [];

  out.push(`## Questions \n`);
  out.push(`Check out my work, feel free to adapt it to your needs or reach out to me directly.\n`);
  out.push(`[See the repository](${this.repository})\n`);
  out.push(`[Contact Me](mailto:${this.contact})\n`);
  
  return out ? out.join(`\n`) : null;
};

ReadMe.prototype.renderLicense = function (license){
  //this.license = new License().licenseBadge(license);
  return this.license ? `## License \n ${new License().licenseBadge(this.license)} \n` : null;
  
};

ReadMe.prototype.renderSignature = function (){
  const out = `--- \n`;

  return out ? out : null;
};



module.exports = ReadMe;

