// import primaryRoutes
var wordSearch  = require('../controllers/wordSearch');
var wordGame    = require('../controllers/wordGame');
var InputRoutes = require('../apiroutes/inputRoutes');
/**
 * This defines the constructor for the primary route class
 * @param {String} data
 * @param {object} config
 */
   var _app, _command, _word, _config, _gameState;
 function PrimaryRoutes(data, options) {
    _app       = data[0];
    _command   = data[1];
    _word      = data[2];
    _config    = options['config'];
    _gameState = options['gameState'];
 
   // console.log("after", _config, _gameState); // checking for debug we are getting _config and _gameState data or not
   }

/**
 * This defines the function to detect the command type route and call feature
 * accordingly
 */

 PrimaryRoutes.prototype.route = ()=> {
    if(_app && _app == _config.APP) {

      switch(_command) {
         case _config.COMMANDS.DEFINITIONS:
            wordSearch.displayDefinitions(_word);  // pass parameter as a value to display definitions
            break;
         case _config.COMMANDS.SYNONYMS:
            wordSearch.displaySynonyms(_word);  // pass parameter as a value to display synonyms
            break;      
         case _config.COMMANDS.ANTONYMS:
            wordSearch.displayAntonyms(_word);  // pass parameter as a value to display antonyms
            break;
         case _config.COMMANDS.EXAMPLES:
            wordSearch.displayExamples(_word);  // pass parameter as a value to display example
            break;
         case _config.COMMANDS.DICTIONARY:
            wordSearch.showCompleteDictionary(_word);
            break;
         case _config.COMMANDS.PLAY:
             wordGame.startGame(_gameState);
             break;
         case _config.COMMANDS.HELP:
            wordSearch.displayHelpCommands();  // display Help commands
            break;
         default:
            wordSearch.defaultAction(_command);
      }
    }
 };

//  exporting the class
module.exports = PrimaryRoutes;