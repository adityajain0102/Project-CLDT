/**
    created_by: Adityavardhan.N
    created_at: 19-01-2020: 09:30 PM
    Desc: Dictionary model to show object data
*/

// npm imports
var COLORS = require('colors/safe');

// imports
var HELPERS = require('../utils/helpers');

/**
 * This defines the constructor for the word dictionary model class
 * @param {String} word
 * @param {Object} data
 */
var _word, _definitions, _antonyms, _synonyms, _examples;
function Dictionary(word, data) {
    // private members
    _word = word;
    _definitions = data['definitions'] ? data['definitions'] : [];
    _antonyms = data['antonyms'] ? data['antonyms'] : [];
    _synonyms = data['synonyms'] ? data['synonyms'] : [];
    _examples = data['examples'] ? data['examples'] : [];
}

/**
 * This defines the function to display the dictionary data
 * @param {object} config
 */

Dictionary.prototype.showDictionary = () => {
    //printing the word
    console.log(COLORS.green('word: ' + _word + '\n'));

    //printing definitions
    HELPERS.showWordData('DEFINITIONS', _definitions);

    //printing synonyms
    HELPERS.showWordData('Synonyms', _synonyms);

    //printing antonyms
    HELPERS.showWordData('Antonyms', _antonyms);

    //printing examples
    HELPERS.showWordData('Examples', _examples);
};

// export dictionary module
module.exports = Dictionary;