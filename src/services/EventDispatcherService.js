/**
 * Event Handler Service 
 * Hooks into the events and sends each request dynamically to the factory
 */

//factory that will dynamically generate the objects we need to determine each Command Router for each event 
const EventTypeCommandRouterFactory = require("../factories/EventTypeCommandRouterFactory.js");

class EventDispatcherService{
	
	registerBotForEvents(bot, events){

		for(const event of events){

			bot.on(event.type, (discordEvent) => {

				const commandRouter = this.getEventTypeCommandRouter(event);

				if (commandRouter.hydrate(bot, discordEvent)){
					commandRouter.handleCommand();
				}
			} )
		}
	}
	getEventTypeCommandRouter(event){
		return  EventTypeCommandRouterFactory.createInstance(event);
	}

}

module.exports = EventDispatcherService;

