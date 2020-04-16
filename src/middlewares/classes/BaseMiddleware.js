/**
 * Base Middleware for all middlewares to inherit from
 */

class BaseMiddleware{

    properties = [
		'returnProperty'
    ];
	methods = [
		'process',
	];

	constructor(){


		//TODO: Verify the created middleware has each of the class props / functions

	}
}

module.exports = BaseMiddleware;