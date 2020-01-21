
/*
    created_by: Adityavardhan.N
    created_at: 21-01-2020: 10:30 PM
    Desc: routes for word game 
*/

var DICT_SERVICE = require('../services/apiservice');
var MESSAGE     = require('../utils/message');

//module npm imports

var COLORS   = require('colors/safe');
var DEFERRED = require('deferred');

// wordGame features


var wordGame = {

/**
 * initializes the game and sets the game state
 * @param {JSON} gameState 
 */


  startGame : function(gameState) {
     var self = this;
     var deferredArray;

     // enable the game
     gameState.GAME_ENABLED = true;

     // get the word
     this.getGameWordData(gameState).then(function(word){
        console.log("resp", word);
        // need to check whether gameState.WORD or response word
        deferredArray = self.getDataRelatedToWord(gameState.WORD, gameState);

        // once all the data fetched create and ask question 
        DEFERRED.map(deferredArray, function(promise){return promise;}).then(function(result){
            self.askQuestion(gameState);
        }, function(error) {
            console.log(COLORS.red(MESSAGE.GAME_START_ERROR));
        });
     }, function(error){
         console.log(COLORS.red(MESSAGE.GAME_START_ERROR));
     });
 },

 /**
  * call a random word function for game
  * @param {JSON} gameState
  */

getGameWordData : function(gameState) {
    var deferred  = DICT_SERVICE.getWordOfTheDay(),
        wordDef   = DEFERRED();

        deferred.then(function(response) {
            var body = JSON.parse(response.body);
            console.log("bodyword", body);
            if(!body.word)
                console.log(COLORS.red(MESSAGE.NO_DATA));
            else {
                // saving word in game state
                gameState.WORD = body.word;
                // resolving the promise as word set successfully
                wordDef.resolve(body.word);
            }
        }, function(error){
            console.log(COLORS.red(error.body));
            wordDef.reject();
        });
        return wordDef.promise;
},

/**
 * fetches a random word for game and its defintion, synonym and antonym
 * @param {JSON} gamestate
 */

 getDataRelatedToWord: function(word, gameState) {
     // service promises
     var definitionDef   = DICT_SERVICE.getDefinitions(word);
     synonymsDef     = DICT_SERVICE.getSynonyms(word),
     antonymsDef     = DICT_SERVICE.getAntonyms(word),
     processedDef    = DEFERRED(),
     processedSyn    = DEFERRED(),
     processedAnt    = DEFERRED(),
     defArray        = [];

     // extracting definitions
     definitionDef.then(function(response) {
         JSON.parse(response.body).forEach(function(def){
             gamestate.DEFINITIONS.push('DEFINITION'+ '|' + def.text);
         });

         //resolve when data is processed
         processedDef.resolve();
     }, function(err) {
         console.log(COLORS.red(MESSAGE.NO_DATA + 'definition'));
     });

     // extracting synonyms
     synonymsDef.then(function(response) {
         var body = JSON.parse(response.body);
         if(body.length > 0) {
             (body[0].words).forEach(function(word) {
                 gamestate.SYNONYMS.push('SYNONYM | ' + word);
             });
         }

         // resolve when data is processed
         processedSyn.resolve();
     }, function(error) {
        console.log(COLORS.red(MESSAGE.NO_DATA + ' synonyms'));
     });

     // extracting antonyms

     antonymsDef.then(function(response) {
         var body =JSON.parse(response.body);
         if(body.length > 0){
             (body[0].words).forEach(function(word) {
                 gameState.ANTONYMS.push('ANTONYM | ' + word);
             });
         }

         // resolve when data is processed
         processedAnt.resolve();
     }, function(error) {
         console.log(COLORS.red(MESSAGE.NO_DATA + 'antonyms'));
     });

     // returning the array of promises
     defArray.push(processedDef.promise);
     defArray.push(processedSyn.promise);
     defArray.push(processedAnt.promise);

     // return defArray
     return defArray;
 },

 /**
  *  invoke askQuestion function for fetched random word
  * @param {JSON} gameState
  */

  askQuestion : function(gameState) {

  }
}

// export module
module.exports = wordGame;
