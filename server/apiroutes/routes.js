/**
    created_by: Adityavardhan.N
    created_at: 19-01-2020: 04:30 PM
    Desc: Routes for endpoints 
*/

// local import from apiroutes
var PRIMARY_ROUTES   = require('./primaryRoutes');
var SECONDARY_ROUTES = require('./secondaryRoutes');

/**
 *  This defines selection of route type , takes two parameters
 * @param {string} data
 * @param {object} config
 */

 function Routes(data, config, gameState) {
    //if either data or config not present return 
    if(!data || !config || !gameState) {
        return;
    }

  // options to be passed to routes
  var options   = {
    config    : config,
    gameState : gameState
  };

    // split the data to extract app(./dict), command and word
    data = data.split(' ');

    // select the type of routes either primary or word game related
    if(config['ENABLE_GAME_ROUTES'] == false) {
        new PRIMARY_ROUTES(data, options).route();
    }
    else if(config['GAME_ENABLED'] == true) {
        new SECONDARY_ROUTES(data, options).route();
    }
};

module.exports = Routes;