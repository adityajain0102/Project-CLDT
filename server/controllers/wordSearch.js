/*
    created_by: Adityavardhan.N
    created_at: 19-01-2020: 07: 40 PM
    Desc: Invoke dictionary ApiService and pass the argument(word and get back the results) 
*/

var DICT_SERVICE = require('../services/apiservice');
var DICTIONARY   = require('../models/dictionary');
// wordSearch features

var wordSearch = {

    /**
     * To display definitions of given word using getDefinition dictapi service.
     * @param {String} word
     */

     displayDefinitions: (word)=> {
        var deferred = DICT_SERVICE.getDefinitions(word),
        processedData;

        deferred.then((response) => {
            processedData = _processDefinitionData(response.body);

            _getDictionaryModel(word, processedData).showDictionary();
        }, (error)=>{
            console.log(error.body);
        });
     },

     /**
      * To display synonyms of the given word using getSynonyms dictapi service
      * @param {String} word
      */

      displaySynonyms: (word) =>{
        var deferred = DICT_SERVICE.getSynonyms(word);
        deferred.then((response)=>{
          console.log(response);
        },(error)=>{
          console.log(error.body);
        });  
      },

      /**
       * feature to display antonyms of given word using getAntonyms dictapi service.
       * @param {String} word
       */

       displayAntonyms: () => {
         var deferred = DICT_SERVICE.getAntonyms(word);
         deferred.then((response)=>{
             console.log(response);
         },(error)=>{
             console.log(error.body);
         });
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

  function _processDefinitionData(defArray) {
    var definitions = [],
        data        = {},
        self        = this;

      JSON.parse(defArray).forEach((def)=> {
        definitions.push(def.partOfSpeech + ' | ' + def.text);
      });

      data['definitions'] = definitions;
      return data;
  }
// exporting module
module.exports = wordSearch;