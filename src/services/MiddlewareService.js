/**
 * Controls all middleware interaction. 
 * Single middleware files will rarely ( and should not be interfaced with)
 */

const objectFactory = require("../factories/ObjectFactory.js");

const middlewares = require("../middlewares/middlewares");

 class MiddlewareService {


    processMiddleware(data){

        for(const middlewareClass of Object.keys(middlewares)){ 

            const middleware = objectFactory.createInstance(middlewareClass,middlewares);

            middleware.process(data)

        }

        return data;
    }
 }

 module.exports = MiddlewareService;