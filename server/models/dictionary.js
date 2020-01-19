/**
    created_by: Adityavardhan.N
    created_at: 19-01-2020: 09:30 PM
    Desc: Dictionary model to show object data
*/

// npm imports
var COLORS  = require('colors/safe');

// imports
var HELPERS = require('../utils/helpers');

/**
 * This defines the constructor for the word dictionary model class
 * @param {String} word
 * @param {Object} data
 */

 function Dictionary(word, data) {
    //  if(!data || word) {
    //      return;
    //  }

     // private members
     this._word = word;
     this._definitions = data['definitions']? data['definitions']:[];
     this._antonyms = data['antonyms']? data['antonyms']:[];
     this._synonyms = data['synonyms']? data['synonyms']:[];
     this._examples = data['examples']? data['examples']:[];
 }

 /**
  * This defines the function to display the dictionary data
  * @param {object} config
  */

  Dictionary.prototype.showDictionary = () => {
      //printing the word
      console.log(COLORS.green('word: ' + this._word + '\n'));

      //printing definitions
      HELPERS.showWordData('DEFINITIONS', this._definitions);

      //printing synonyms
      HELPERS.showWordData('Synonyms', this._synonyms);

      //printing antonyms
      HELPERS.showWordData('Antonyms', this._antonyms);

      //printing examples
      HELPERS.showWordData('Examples', this._examples);
  };

// export dictionary module
 module.exports = Dictionary;