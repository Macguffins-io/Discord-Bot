/**
 * Responsible for creating evert type router instances
 */

//Routers
const routers = require('../routers/routers');

class EventTypeRouterFactory {

	static createInstance(dispatchedEventData){

		let router = null;

		if (routers.hasOwnProperty(dispatchedEventData.router) ){

			const routerClass = routers[dispatchedEventData.router];

			router = new routerClass();

		}else{
			throw new Error("The Router you tried to create is not part of the routers array")
		}
		return router;
	}
}
module.exports = EventTypeRouterFactory;