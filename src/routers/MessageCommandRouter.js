const BaseRouter = require("./BaseRouter");

class MessageCommandRouter extends BaseRouter{
	
	bot = null;
	discordEvent = null;

	constructor(){
		super();
	}

	hydrate(bot, discordEvent) {
		this.bot = bot;
		this.discordEvent = discordEvent;

		return (this.bot && this.discordEvent);
	}
	
	handleCommand() {
	    let message = this.discordEvent;

		// Ignore Other Bots
		if (message.author.bot === true) return;
		// Check for prefix
		if (message.content.indexOf(this.bot.prefix) !== 0) return;

		// Separate the query into commands plus arguments (simple)
        const args = message.content.slice(this.bot.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        // Stop if not a valid command
        if (!this.bot.commands.has(command)) return;

        try {
            this.bot.commands.get(command).execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply("There was a problem trying to execute that command!");
        }

	}
}

module.exports = MessageCommandRouter;