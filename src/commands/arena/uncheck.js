/**
 * uncheck
 * For removing a checked user from the arena
 */
module.exports = {
    name: 'uncheck',
    category: 'arena',
    description: 'Uncheck from the arena when in #arena-queue',
    guildOnly: true,
    deleteMessage: true,
    channel: 'arena-queue',
    execute(message, args) {
        const member = message.guild.member(message.author.id);
        message.bot.storage.get('queue')
            .then((queue) => {
                if(queue === undefined) {
                    queue = [];
                }

                const i = queue.findIndex(q => q.userID === member.id);
                if(i < 0) {
                    message.channel.send(member.displayName + " is not in the queue!");
                    return;
                }

                queue.splice(i, 1);

                message.bot.storage.set('queue', queue)
                    .then(() => {
                        message.channel.send(member.displayName + " removed from the queue!");
                    });
            });
    },
};
