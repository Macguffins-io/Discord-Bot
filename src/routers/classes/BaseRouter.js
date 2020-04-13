/**
 * Base Router for all routers to inherit from
 */

class BaseRouter{

	//Required for all Routers
	bot = null;
	discordEvent = null;

	properties = [
		'bot',
		'discordEvent',
	];
	methods = [
		'hydrate',
		'initialize',
	];

	constructor(){

		for(const property of [...this.properties,...this.methods]){
			// if (this[property] === null){
			// 	console.log(`${property} not found on router`);
			// 	throw new Error ("Please implement all required properties and methods in your EventRouter")	
			// }
		}

	}
}

module.exports = BaseRouter;