/**
 * check
 * For checking a user into the arena
 */
module.exports = {
    name: 'check',
    category: 'arena',
    description: 'Check for the arena when in #arena-queue',
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
                if(queue.find(q => q.userID === member.id)) {
                    message.channel.send(member.displayName + " is already in the queue!");
                    return;
                }

                queue.push(member);

                message.bot.storage.set('queue', queue)
                    .then(() => {
                        message.channel.send(member.displayName + " added to the queue!");
                    });
            });
    },
};
