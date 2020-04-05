/**
 * Responsible for creating evert type router instances
 */

const commands = require('../commands/commands');

class CommandHandlerFactory{

	static createInstance(commandHandler){
		let command = null;

		if (commands.hasOwnProperty(commandHandler)){
            const commandClass = commands[commandHandler];
            command = new commandClass();
		} else {
          throw new Error("The Command you tried to create is not part of the commands array")
        }
        return command;
	}
}
module.exports = CommandHandlerFactory;
