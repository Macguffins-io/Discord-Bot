/**
 * Entry Point for Application
 */

// For filesystem access
const fs = require('fs');

// Use discord.js as a framework
const Discord = require("discord.js");

// For our storage solution
const Keyv = require("keyv");

// Create the Bot Instance
const bot = new Discord.Client();

// Get Bot Token and private settings
const { token, storage } = require("../secrets.json");

// Get configuration like prefix and events
const { prefix, events } = require("../config.json");

// Event Dispatcher that will take the events we want, and farm them out to the respective services
const EventDispatcherService = require('./services/EventDispatcherService.js');

// Lets go
bot.login(token).then( tokenConfirmation => {

    if (tokenConfirmation === token){
        // Prepare the commands for the client
        bot.commands = new Discord.Collection();
        const commandFiles = fs.readdirSync('./src/commands', {withFileTypes: true})
            .flatMap(f => f.isDirectory() ? fs.readdirSync('./src/commands/' + f.name).flatMap(f2 => f.name + "/" + f2) : f.name)
            .filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${file}`);
            console.log("Added command: " + file);
            bot.commands.set(command.name, command);
        }

        // Prepare bot storage
        if(storage.type === 'redis') {
            bot.storage = new Keyv(`${storage.type}://${storage.user}:${storage.pass}@${storage.host}:${storage.port}`)
            console.log("Storage set to: " + storage.type);
        } else if(storage.type === 'sqlite') {
            bot.storage = new Keyv(`${storage.type}://${storage.path}`);
            console.log("Storage set to: " + storage.type);
        } else {
            bot.storage = new Keyv();
            console.log("Storage set to: local");
        }

        // Prepare bot prefix
        bot.prefix = prefix;
        console.log("Prefix set to: " + prefix);

        // Use the dispatcher to generate events
        const eventDispatcher = new EventDispatcherService();
        eventDispatcher.registerBotForEvents(bot, events);

    } else {
        throw "Unable to log bot into Discord. Tokens did not match";
    }
}).catch( err => {
    console.log(err);
});