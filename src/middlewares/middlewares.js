/**
 * All middleware will be gathered here and exported together
 */

const CommandParser = require("./classes/CommandParser");

//This is the default order that middlewares will be processed in
module.exports =  {
    CommandParser,
};