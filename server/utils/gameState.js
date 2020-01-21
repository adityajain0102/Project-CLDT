
/*
    created_by: Adityavardhan.N
    created_at: 21-01-2020: 10:00 PM
    Desc: state of the game at any point of time
*/

var GameState = {

    // toggle game on and off
    GAME_ENABLED  : false,

    // number of hints given
    HINT_COUNTER  : 0,

    // the word to play game for
    WORD           : null,

    //definitions of word
    DEFINITIONS    : [],

    //synonyms of word
    SYNONYMS       : [],

    // antonyms of word
    ANTONYMS       : []
}


// export module

module.exports = GameState;