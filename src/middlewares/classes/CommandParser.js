

const BaseMiddleware = require("./BaseMiddleware")

class CommandParser  extends BaseMiddleware{

    returnProperty = 'parsedCommands';

    //still needs to be implemented
    process(data){
        //do some stuff,

        //add data we processed to the incoming object
        data[this.returnProperty] = [ 'some stuff we added', 'some more stuff']
    }
}

module.exports = CommandParser;
