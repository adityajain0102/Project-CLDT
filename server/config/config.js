
/*
    created_by: Adityavardhan.N
    created_at: 19-01-2020: 03:00 PM
    Desc: Configuration file with API KEY 
*/

// app configuration variable

var CONFIG = {
    // fourtytwo words apikey
    API_KEY : 'b972c7ca44dda72a5b482052b1f5e13470e01477f3fb97c85d5313b3c112627073481104fec2fb1a0cc9d84c2212474c0cbe7d8e59d7b95c7cb32a1133f778abd1857bf934ba06647fda4f59e878d164',
    
    // disabled the game routes
    ENABLE_GAME_ROUTES : false,

    APP         : './dict',

    COMMANDS  : {
        DEFINITIONS  : 'defn',
        SYNONYMS     : 'syn',
        ANTONYMS     : 'ant',
        EXAMPLES     : 'ex',
        DICTIONARY   : 'dict',
        HELP         : '--help',
        PLAY         : 'play',
    },

    //Game Inputs
    GAME_COMMANDS : {
        TRY_AGAIN    : 1,
        HINT         : 2,
        QUIT         : 3
    },
};

// export module config
module.exports = CONFIG;

