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

                const qi = queue.findIndex(g => g.members.find(m => m.userID === member.id));
                if(qi < 0) {
                    message.channel.send(member.displayName + " is not in the queue!");
                    return;
                }

                const gi = queue[qi].members.findIndex(m => m.userID === member.id);
                queue[qi].members.splice(queue[qi].members[gi], 1);
                queue = queue.filter(g => g.members.length > 0);

                message.bot.storage.set('queue', queue)
                    .then(() => {
                        message.channel.send(member.displayName + " removed from the queue!");
                    });
            });
    },
};
