/**
 * Event Handler Service 
 * Hooks into the events and sends each request dynamically to the factory
 */

//factory that will dynamically generate the objects we need to determine each Command Router for each event 
const objectFactory = require("../factories/ObjectFactory.js");

const routers = require('../routers/routers');

class EventDispatcherService{
	
	registerBotForEvents(bot, events){

		for(const event of events){

			bot.on(event.type, (discordEvent) => {


				const eventRouter = objectFactory.createInstance(event.router,routers);

				if (eventRouter.hydrate(bot, discordEvent)){

					eventRouter.initialize();

				}
			})
		}
	}
}

module.exports = EventDispatcherService;

