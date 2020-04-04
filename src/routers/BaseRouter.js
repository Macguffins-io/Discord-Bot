/**
 * Base Router for all routers to inherit from
 */

class BaseRouter{

	//Required for all Routers
	bot = null;
	discordEvent = null;

	constructor(){

		if ( this.bot === undefined || this.discordEvent){
			throw new Error("You must implement all required class variables for Command Routers");
		}

		if ( typeof this.hydrate != 'function'){
			throw new Error("All CommmandRouters require a 'hydrate(bot,discordEvent)")
		}
	}
}

module.exports = BaseRouter;