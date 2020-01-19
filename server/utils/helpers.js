/**
    created_by: Adityavardhan.N
    created_at: 19-01-2020: 08:30 PM
    Desc: Helper functions to show output
*/

// npm imports
var colors = require('colors/safe');

// Define all the helper functions

var Helpers = {
    /**
     * This prints each element of the array
     * @param {array} array
     */
    showWordData: (heading, array)=> {
        // printing heading
        if(array.length > 0) 
            console.log(colors.green(heading));
        // printing data
        array.forEach((element)=>{
            console.log(colors.blue(element + '\n'));
        });
    }
};

// exporting helper module
module.exports = Helpers;