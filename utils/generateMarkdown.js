
const { execSync } = require('child_process');

class ReadMe {
  constructor(questions) {
    this.title = questions.title;
    this.description = questions.description;
    this.installation = questions.installation;
    this.usage = questions.usage;
    this.credits = questions.credits;
    this.test = questions.test;
    this.repository = this.getGitRepository();
    this.contact = questions.contact;
  }

  getGitRepository() {
    try {
      // Run git command to get remote URL
      const result = execSync('git config --get remote.origin.url');
  
      // return formated value
      return result.toString().trim();
    } catch (error) {}
  }
   

  render (){
    let items = [];

    // Layout order of ReadMe Items
    items.push(this.renderTitle());
    items.push(this.renderDescription());
    items.push(this.renderToc());
    items.push(this.renderInstall());
    items.push(this.renderUsage());
    items.push(this.renderCredits());
    items.push(this.renderTests());
    items.push(this.renderContact());
    items.push(this.renderSignature());

    return items.join("\n");
    
  };

};

ReadMe.prototype.renderTitle = function  (){
  return this.title ? `#  ${this.title} \n` : null;
};

ReadMe.prototype.renderDescription = function  (){
  return this.description ? `##  ${this.description} \n` : null;
};

ReadMe.prototype.renderToc = function  (){
  let out = [];

  if (this.renderInstall()) out.push(`Installation`);
  if (this.rend()) out.push(`Questions`);
  if (this.renderTests()) out.push(`Testing`);

  if (this.renderContact()) out.push(`Questions`);

  return out ? `## Table of contents\n\n` + out.join(`\n`) : null
};

ReadMe.prototype.renderInstall = function  (){
  return this.installation ? `## Installation\n\n ${this.installation} \n` : null;
};

ReadMe.prototype.renderUsage = function  (){
  return this.installation ? `## Usage\n\n ${this.usage} \n` : null;
};

ReadMe.prototype.renderCredits = function (){
  return this.installation ? `## Credits\n\n ${this.contribution} \n` : null;
};

ReadMe.prototype.renderTests = function (){
  return this.installation ? `## Tests\n\n ${this.test} \n` : null;
};

ReadMe.prototype.renderContact = function (){
  let out = [];

  out.push(`---\n## Questions\n`);
  out.push(`Check out my work, feel free to adapt it to your needs or reach out to me directly.\n`);
  out.push(`[See the repository](${this.repository})\n`);
  out.push(`[Contact Me](mailto:${this.contact})\n`);
  
  return out ? out.join(`\n`) : null;
};

ReadMe.prototype.renderSignature = function (){
  const out = `---\n`;

  return out ? out : null;
};


// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  
  return `# ${data.title} ${renderLicenseBadge()}

`;
}


module.exports = ReadMe;
