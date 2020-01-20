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
    + '\nFor word of the day dictionary:   ./dict\nFor word game:   ./dict play'
};

//export the Message
module.exports = Message;