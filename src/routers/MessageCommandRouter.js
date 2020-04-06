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

        // Find valid command and stop if none found
        const c = this.bot.commands.get(command)
            || this.bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
        if (!c) return;

        try {
            // Verify this is in the server
            if(c.guildOnly && message.channel.type !== 'text') {
                return message.reply("Please run that command in a server.")
            }

            // Check if the correct channel
            if(c.channel && message.channel.name !== c.channel) return;

            message.bot = this.bot;
            c.execute(message, args)
        } catch (error) {
            console.error(error);
            message.reply("There was a problem trying to execute that command!");
        }

	}
}

module.exports = MessageCommandRouter;