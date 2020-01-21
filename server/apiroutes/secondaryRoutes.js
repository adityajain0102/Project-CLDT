
/*
    created_by: Adityavardhan.N
    created_at: 21-01-2020: 08:30 PM
    Desc: routes for word game 
*/

// import Input routes
var INPUTROUTES  = require('../apiroutes/inputRoutes');

/**
 * This defines the constructor for the general route class
 * @param {String} data
 * @param {object} config
 */

var _input, _config, _options;

function secondaryRoutes(input, options) {

    _input   =  input;
    _config  =  options['config'];
    _options =   options['gameState']
}

// inheiting the basic structure
secondaryRoutes.prototype = Object.create(INPUTROUTES);

secondaryRoutes.prototype.route = function() {

    if(_input){
        switch(_input){
          case _config.GAME_COMMANDS.TRY_AGAIN:
              break;
          case _config.GAME_COMMANDS.HINT:
              break;
          case _config.GAME_COMMANDS.QUIT:
              break;
        }
      }
}

// secondaryRoutes module export
module.exports = secondaryRoutes;