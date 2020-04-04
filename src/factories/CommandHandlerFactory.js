/**
 * Responsible for creating evert type router instances
 */

import SpellCommand from "../commands/SpellCommand.js"

const commands = [
	SpellCommand	
];

export default class CommandHandlerFactory{

	static createInstance(commandHandler){

		let handler = null;

		if (commands.includes(commandHandler) ){

			handler= new commandHandler();

		}
		return handler;
	}
}
