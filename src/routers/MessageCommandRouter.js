const BaseRouter = require("./BaseRouter")

class MessageCommandRouter extends BaseRouter{
	
	bot = null;
	discordEvent = null;

	constructor(){
		super();
	}

	hydrate(bot,discordEvent){
		this.bot = bot;
		this.discordEvent = discordEvent;

		return (this.bot && this.discordEvent);
	}
	
	handleCommand(){

		//Ignore Other Bots
		if (this.discordEvent.author.bot === false){

			/*
				So from here, we have discordEvent that we can respond to. ( reply() / send() ),
				but I would like to invoke another factory here that can farm out the various
				commands that come through message events.
			*/
		
			//Simple example
			this.discordEvent.reply("Hey, nice message");

		}
	}
}

module.exports = MessageCommandRouter;