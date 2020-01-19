/**
    created_by: Adityavardhan.N
    created_at: 19-01-2020: 06:30 PM
    Desc: apiservice for dictionary and wordgame
*/

// npm module imports
var DEFERRED = require('deferred');
var REQUESTIFY = require('requestify');

//local configuration file import
var CONFIG = require('../config/config');

// apihost for words
var API_HOST = 'https://fourtytwowords.herokuapp.com';

//public exposed service functions
var dictApi = {

    /**
     * Service for fetching definitions from dictapi(fourtytwowords api)
     * @param {string} word
     */

     getDefinitions: (word) => {
        var apiUrl = `${API_HOST}` + '/' + 'word/' + `${word}` + '/' + 'definitions?api_key=' + `${CONFIG.API_KEY}`,
        deferred = _callApi(apiUrl);
        return deferred;
     },

/**
 * Service for fetching synonyms from dictapi(fourtytwowords api).
 * @param {String} word
 */

    getSynonyms: function(word){
        var apiUrl = `${API_HOST}` + '/' + 'word/' + `${word}` + '/' + 'synonyms?api_key=' + `${CONFIG.API_KEY}`,
        deferred = _callApi(apiUrl);
        return deferred;
    },

/**
 * Service for fetching antonyms from dictapi(fourtytwowords api).
 * @param {String} word
 */

    getAntonyms: function(word){
        var apiUrl = `${API_HOST}` + '/' + 'word/' + `${word}` + '/' + 'antomyms?api_key=' + `${CONFIG.API_KEY}`,
        deferred = _callApi(apiUrl);
        return deferred;
    },

/**
 * Service for fetching examples from dictapi(fourtytwowords api).
 * @param {String} word
 */

    getExamples: function(word){
        var apiUrl = `${API_HOST}` + '/' + 'word/' + `${word}` + '/' + 'examples?api_key=' + `${CONFIG.API_KEY}`,
        deferred = _callApi(apiUrl);
        return deferred;
    },
};

/**
 * Private function to hit the api and return response
 * @param {String} url
 */

 function _callApi(apiUrl) {
     var deferred = DEFERRED();

     REQUESTIFY.get(apiUrl).then((response)=> {
         deferred.resolve(response);
     })
     .catch((error) =>{
         deferred.reject(error);
     });
     return deferred.promise;
 }

 // export dictApi
 module.exports = dictApi;