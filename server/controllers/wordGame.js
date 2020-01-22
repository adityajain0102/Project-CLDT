
/*
    created_by: Adityavardhan.N
    created_at: 21-01-2020: 10:30 PM
    Desc: routes for word game 
*/

var DICT_SERVICE = require('../services/apiservice');
var MESSAGE = require('../utils/message');
var UTILS = require('../utils/helpers');
var WORDSEARCH = require('../controllers/wordSearch');
//module npm imports

var COLORS = require('colors/safe');
var DEFERRED = require('deferred');

// wordGame features
var wordGame = {

    /**
     * initializes the game and sets the game state
     * @param {JSON} gameState 
     */


    startGame: function (gameState) {
        var self = this;
        // enable the game
        gameState.GAME_ENABLED = true;

        // get the word
        this.getGameWordData(gameState).then(function (word) {
            // need to check whether gameState.WORD or response word
            self.getDataRelatedToWord(gameState.WORD, gameState, () => {

                if (gameState.DEFINITIONS.length > 0) self.askQuestion(gameState);

            });
        }, function (error) {
            console.log(COLORS.red(MESSAGE.GAME_START_ERROR));
        });
    },

    /**
     * call a random word function for game
     * @param {JSON} gameState
     */

    getGameWordData: function (gameState) {
        var deferred = DICT_SERVICE.getWordOfTheDay(),
            wordDef = DEFERRED();

        deferred.then(function (response) {
            var body = JSON.parse(response.body);
            if (!body.word)
                console.log(COLORS.red(MESSAGE.NO_DATA));
            else {
                // saving word in game state
                gameState.WORD = body.word;
                // resolving the promise as word set successfully
                wordDef.resolve(body.word);
            }
        }, function (error) {
            console.log(COLORS.red(error.body));
            wordDef.reject();
        });
        return wordDef.promise;
    },

    /**
     * fetches a random word for game and its defintion, synonym and antonym
     * @param {JSON} gamestate
     */

    getDataRelatedToWord: function (word, gameState, callback) {
        // service promises
        var definitionDef = DICT_SERVICE.getDefinitions(word),
            synonymsDef = DICT_SERVICE.getSynonyms(word),
            antonymsDef = DICT_SERVICE.getAntonyms(word)

        Promise.all([definitionDef, synonymsDef, antonymsDef]).then(function (values) {

            var body = JSON.parse(values[0].body);
            var body1 = JSON.parse(values[1].body)[0];
            var body2 = JSON.parse(values[2].body)[0];

            for (var i = 0; i < 10; i++) {
                if (body[i].text) gameState.DEFINITIONS.push('DEFINITION' + '|' + body[i].text);
                if (body1.words[i]) gameState.SYNONYMS.push('SYNONYM | ' + body1.words[i]);
                if (body2.words[i]) gameState.ANTONYMS.push('ANTONYM | ' + body2.words[i]);
            }
            callback()
        });
    },

    /**
     *  invoke askQuestion function for fetched random word
     * @param {JSON} gameState
     */
    askQuestion: function (gameState) {
        var question = [];
        // taking definition
        if (gameState.DEFINITIONS.length > 0) {
            question.push(gameState.DEFINITIONS.pop());
        }
        // if synonym present take it otherwise take antonym
        if (gameState.SYNONYMS.length > 0) {
            question.push(gameState.SYNONYMS.pop());
        }
        else if (gameState.ANTONYMS.length > 0) {
            question.push(gameState.ANTONYMS.pop());
        }
        // Display the question
        UTILS.showWordData(MESSAGE.QUESTION_HEADING, question);
        console.log(COLORS.green(MESSAGE.ENTER_ANSWER));
        // enable answer
        gameState.ENABLE_ANSWER = true;
    },

    /**
     * ask the question for fetched random question
     * @param {String} answer
     * @param {JSON} gameState
     */

    verifyAnswer: function (answer, gameState) {
        var answerStatus;

        // first check against the word

        if (gameState.WORD.toLowerCase() == answer.toLowerCase())
            answerStatus = true;

        // verify against asked synonyms of the word
        (gameState.SYNONYMS).forEach((synonym) => {
            if (synonym.toLowerCase() == answer.toLowerCase()) {
                answerStatus = true;
            }
        });

        // display relevant message according to the answer status
        if (answerStatus) {
            console.log(COLORS.green('\nCorrect answer'));
            this.quitGame(gameState);
        }
        else {
            console.log(COLORS.red('\nWrong answer'));
            console.log(COLORS.green(MESSAGE.GAME_OPTIONS));
        }
    },
    /**
     *  quit the game and reset the game state
     * @param {JSON} gameState
    */
    quitGame: function (gameState) {
        // display word and its full dictionary, reusing the wordSearch feature
        WORDSEARCH.showCompleteDictionary(gameState.WORD);
        console.log(COLORS.green(MESSAGE.GAME_QUIT));

        // reset the game state
        gameState.GAME_ENABLED = false;
        gameState.WORD = null;
        gameState.DEFINITIONS = [];
        gameState.SYNONYMS = [];
        gameState.ANTONYMS = [];
        gameState.HINT_COUNTER = 0;
    },

    /**
     * Displays message as try again to user, in response to user input 1
     */

    nextChance: function () {
        console.log(COLORS.green(MESSAGE.TRY_AGAIN));
    },

    /**
     * hint for the game 
     * @param {JSON} gameState
     */

    getHint: function (gameState) {
        var hintCount = gameState.HINT_COUNTER,
            hint = [],
            message;

        switch (hintCount) {
            case 0:
                hint.push(UTILS.getJumbleWord(gameState.WORD));
                message = MESSAGE.HINTS.JUMBLE_WORD;
                break;
            case 1:
                hint.push(gameState.DEFINITIONS.pop());
                message = MESSAGE.HINTS.JUMBLE_WORD;
            case 2:
                hint.push(gameState.SYNONYMS.pop());
                message = MESSAGE.HINTS.SYNONYM;
                break;
            case 3:
                hint.push(gameState.ANTONYMS.pop());
                message = MESSAGE.HINTS.ANTONYM;
                break;
        }

        // if no hint is available then provide the jumble word
        if (hintCount > 0 && typeof hint[0] == 'undefined') {
            hint[0] = UTILS.getJumbleWord(gameState.WORD);
            message = MESSAGE.HINTS.JUMBLE_WORD;
        }

        // printing the hint
        UTILS.showWordData(message, hint);

        // updating the value of  hint counter
        if (hint == 3)
            gameState.HINT_COUNTER = 0;
        else
            gameState.HINT_COUNTER = gameState.HINT_COUNTER + 1;
    }
}


// export module
module.exports = wordGame;
