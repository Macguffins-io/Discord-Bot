/**
 * ping
 * Mainly a bot test
 */
module.exports = {
    name: 'ping',
    category: 'misc',
    description: 'Ping! Make sure the bot is working.',
    execute(message, args) {
        message.channel.send('Pong!');
    },
};