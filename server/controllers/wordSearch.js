/*
    created_by: Adityavardhan.N
    created_at: 19-01-2020: 07: 40 PM
    Desc: Invoke dictionary ApiService and pass the argument(word and get back the results) 
*/

// import apiservice, dictionary and message files
var DICT_SERVICE = require('../services/apiservice');
var DICTIONARY = require('../models/dictionary');
var MESSAGE = require('../utils/message');
var WATERFALL = require('async-waterfall');

// npm import
var colors = require('colors/safe');
// wordSearch features

var wordSearch = {

  /**
   * To display definitions of given word using getDefinition dictapi service.
   * @param {String} word
   */

  displayDefinitions: (word, callback) => {
    var deferred = DICT_SERVICE.getDefinitions(word),
      processedData;

    deferred.then((response) => {
      processedData = _processDefinitionData(word, response.body);
      _getDictionaryModel(word, processedData).showDictionary();

      //callback(passing function as an argument) for full dictionary
      if (callback) callback(null, word)
    }, (error) => {
      //we got the error data as JSON.stringify() format, we convert that into JSON.parse() 
      let err = JSON.parse(error.body);
      console.log("Response: ", colors.red(err.error));
    });
  },

  /**
   * To display synonyms of the given word using getSynonyms dictapi service
   * @param {String} word
   */

  displaySynonyms: (word, callback) => {
    var deferred = DICT_SERVICE.getSynonyms(word),
      processedData;

    deferred.then((response) => {
      processedData = _processDictionaryWords('synonyms', JSON.parse(response.body));
      _getDictionaryModel(word, processedData).showDictionary();

      //callback(passing function as an argument) for full dictionary
      if (callback) callback(null, word)
    }, (error) => {
      let err = JSON.parse(error.body)
      console.log("Response: ", colors.red(err.error));
    });
  },

  /**
   * feature to display antonyms of given word using getAntonyms dictapi service.
   * @param {String} word
   */

  displayAntonyms: (word, callback) => {
    var deferred = DICT_SERVICE.getAntonyms(word),
      processedData;

    deferred.then((response) => {
      processedData = _processDictionaryWords('antonyms', JSON.parse(response.body));
      _getDictionaryModel(word, processedData).showDictionary();

      //callback(passing function as an argument) for full dictionary
      if (callback) callback(null, word)
    }, (error) => {
      let err = JSON.parse(error.body)
      console.log("Response: ", colors.red(err.error));
    });
  },

  /**
   * feature to display antonyms of given word using getAntonyms dictapi service.
   * @param {String} word
   */

  displayExamples: (word, callback) => {
    var deferred = DICT_SERVICE.getExamples(word),
      processedData;

    deferred.then((response) => {
      processedData = _processExampleData(JSON.parse(response.body));
      _getDictionaryModel(word, processedData).showDictionary();

      //callback(passing function as an argument) for full dictionary
      if (callback) callback(null, word)
    }, (error) => {
      let err = JSON.parse(error.body)
      console.log("Response: ", colors.red(err.error));
    });
  },

  /**
   * To display the complete dictionary of given word like (definition, antonyms, synonyms, and examples)
   * @param {String} word
   */

  showCompleteDictionary: function (word) {
    var deferredArray = [],
      self = this;

    // calling all the features to show complete dictionary consists of synonyms, antonyms and examples
    WATERFALL([
      function (callback) {
        self.displayDefinitions(word, callback);
      },
      self.displaySynonyms,
      self.displayAntonyms,
      self.displayExamples
    ], (err, response) => {
      if (err) return console.log('Unable to show complete dictionary');
    });
  },

  /**
   * To show the complete dictionary of the word of the day. Internally calls the 
   * showCompleteDictionary function
   * @param {none} 
  */

  todaysWord: function () {
    var deferred = DICT_SERVICE.getWordOfTheDay(),
      self = this,
      body;

    deferred.then((response) => {
      body = JSON.parse(response.body);
      if (!body.word) {
        console.log(colors.red(MESSAGE.NO_DATA));
      }
      else {
        self.showCompleteDictionary(body.word);
      }
    }, (error) => {
      let err = JSON.parse(error.body);
      console.log("Response: ", colors.red(err.error));
    })
  },

  /**
   * display help commands and their usage
   */

  displayHelpCommands: () => {
    console.log(colors.green(MESSAGE.HELP_MESSAGE));
  },

  /**
   * The default action for the general routes, it handles either complete dictionary
   * of the given word or word of the day
   */

  defaultAction: function (word) {
    if (word) {
      // handling ./dict <word>
      this.showCompleteDictionary(word);
    } else {
      // handling ./dict
      this.todaysWord();
    }
  }
};

/**
 * creates and returns a dictionary model object
 * @param {String} word
 * @private
 */

function _getDictionaryModel(word, data) {
  return new DICTIONARY(word, data);
}

/**
 *  Processes the elements of definition array
 * @param {Array} defArray
 * @private
 */

function _processDefinitionData(word, defArray) {
  var definitions = [],
    data = {},
    self = this;

  JSON.parse(defArray).forEach((def) => {
    definitions.push(word + ' | ' + def.text); // displaying word with multiple definitions
  });
  data['definitions'] = definitions;
  return data;
}


/**
*  Processes the elements of example array
* @param {Array} defArray
* @private
*/

function _processExampleData(body) {
  var examples = [],
    data = {};

  if (!body.examples)
    console.log(COLORS.red(MESSAGES.NO_DATA));

  (body.examples).forEach(function (example) {
    examples.push(example.text);
  });
  data['examples'] = examples;
  return data;
}

/** 
 *  Processes the elements of related words array
 * @param {String} type
 * @private
*/

function _processDictionaryWords(type, body) {
  var dictionaryWords = [],
    data = {};

  if (body.length == 0) {
    console.log(colors.red(MESSAGE.NO_DATA));
  }
  (body[0].words).forEach((word) => {
    dictionaryWords.push(word + ',');
  });
  data[type] = dictionaryWords;
  return data;
}

// exporting module
module.exports = wordSearch;