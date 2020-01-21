/*
    created_by: Adityavardhan.N
    created_at: 19-01-2020: 12:25 AM
    Desc: Shows the Init message , and deals with all messages based on user choice 
*/

var Message = {
    INIT_MESSAGE: 'Welcome to Command Line Dictionary tool \n for help :  ./dict --help ',

    NO_DATA     : 'Sorry, no data for the given word',
   
    HELP_MESSAGE   : 'Available commands:\n\nFor definition:   ./dict defn <word>'
                      + '\nFor synonyms:   ./dict syn <word>\nFor antonyms:   ./dic ant <word>'
                      + '\nFor examples:   ./dict ex <word>\nFor full dictionary: ./dict <word> or ./dict dict <word>'
                      + '\nFor word of the day dictionary:   ./dict\nFor word game:   ./dict play',

    GAME_START_ERROR : 'Unable to fetch question for game please, try again',

    // heading to be displayed at start of game
    QUESTION_HEADING   : 'GUESS THE WORD BASED ON FOLLOWING INFO',

    // Answer prompt
    ENTER_ANSWER  : 'Enter Your answer:',

    // game options for user
    GAME_OPTIONS  : '\n1. Try again\n2. Hint\n3. quit',

    // game over message
    GAME_QUIT  : '\nGame is over, you may need ./dict --help',

    //try again, enter new guess
    TRY_AGAIN  : '\nEnter answer again',

    HINTS              : {
        JUMBLE_WORD    : 'HINT - JUMBLED WORD',
        DEFINITION     : 'HINT - ANOTHER DEFINITION',
        SYNONYM        : 'HINT - ANOTHER SYNONYM',
        ANTONYM        : 'HINT - ANOTHER ANTONYM'
      }
};

//export the Message
module.exports = Message;