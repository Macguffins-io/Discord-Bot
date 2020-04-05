const BaseRouter = require("./BaseRouter");
const CommandHandlerFactory = require("../factories/CommandHandlerFactory");

class MessageCommandRouter extends BaseRouter{
	
	bot = null;
	discordEvent = null;

	constructor(){
		super();
	}

	hydrate(bot, discordEvent, config) {
		this.bot = bot;
		this.discordEvent = discordEvent;
		this.config = config;

		return (this.bot && this.discordEvent && this.config);
	}
	
	handleCommand() {
	    let message = this.discordEvent;

		// Ignore Other Bots
		if (message.author.bot === true) return;
		// Check for prefix
		if (message.content.indexOf(this.config.prefix) !== 0) return;

		// Separate the query into commands plus arguments (simple)
        const args = message.content.slice(this.config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        // Stop if not a valid command
        if (!this.config.commands.hasOwnProperty(command)) return;

        const c = CommandHandlerFactory.createInstance(this.config.commands[command]);
        c.execute(message, args);

	}
}

module.exports = MessageCommandRouter;