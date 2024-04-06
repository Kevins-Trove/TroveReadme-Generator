//------------------------------------------------------------
// license
//
// Main class to create and format markdown file associated
// with a project.
//------------------------------------------------------------

//------------------------------------------------------------
// Packages
//------------------------------------------------------------

//------------------------------------------------------------
// Class declaration
//------------------------------------------------------------
class License {
  constructor() {
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

License.prototype.licenseBadgeList = function(search){
    return Object.keys(licenseBadges);;
};

License.prototype.licenseBadge = function(license) {
    
    // Check if the provided license is in the mapping
    // Return a generic badge if no match
    if (license in licenseBadges) {
      return licenseBadges[license];
    } else {
      return '[![License](https://img.shields.io/badge/License-Unknown-lightgrey.svg)](https://opensource.org/licenses/UNKNOWN)';
    }
  }
  
module.exports = License;
  