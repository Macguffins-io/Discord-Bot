/**
 * Entry Point for Application
 */

//Use discord.js 
const Discord = require("discord.js");

//Bot Instance
const bot = new Discord.Client();

//Get Bot Token
const { token } = require("../secrets.json");

//Get Events we want to subscribe to
const { events } = require("../config.json");

//Event Dispatcher that will take the events we want, and farm them out to the respective services
 const EventDispatcherService = require('./services/EventDispatcherService.js');

//Lets go
 bot.login(token).then( tokenConfirmation => {

         if (tokenConfirmation === token){

             const eventDispatcher = new EventDispatcherService();
             eventDispatcher.registerBotForEvents(bot, events);

         } else {
             throw "Unable to log bot into Discord. Tokens did not match";
         }
     }
 ).catch( err => {
    console.log(err);
 });