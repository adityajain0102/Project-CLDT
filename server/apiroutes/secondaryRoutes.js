
/*
    created_by: Adityavardhan.N
    created_at: 21-01-2020: 08:30 PM
    Desc: routes for word game 
*/

// import Input routes
var INPUTROUTES  = require('../apiroutes/inputRoutes');
var WORDGAME     = require('../controllers/wordGame');

/**
 * This defines the constructor for the general route class
 * @param {String} data
 * @param {object} config
 */

var _input, _config, _gameState;

function secondaryRoutes(input, options) {

    _input     =  input;
    _config    =  options['config'];
    _gameState =   options['gameState']
}

// inheiting the basic structure
secondaryRoutes.prototype = Object.create(INPUTROUTES);

secondaryRoutes.prototype.route = function() {
console.log("gameState", _gameState)
    if(_input){
        switch(_input){
          case _config.GAME_COMMANDS.TRY_AGAIN:
              WORDGAME.nextChance();
              break;
          case _config.GAME_COMMANDS.HINT:
              WORDGAME.getHint(_gameState);
              break;
          case _config.GAME_COMMANDS.QUIT:
              WORDGAME.quitGame(_gameState);
              break;
          default:
              WORDGAME.verifyAnswer(_input[0], _gameState);
        }
      }
}

// secondaryRoutes module export
module.exports = secondaryRoutes;