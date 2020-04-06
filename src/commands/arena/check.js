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

                const qi = 1+queue.findIndex(g => g.members.find(m => m.userID === member.id));
                if(qi > 0) {
                    message.channel.send(`${member.displayName} is number ${qi} in queue.`);
                    return;
                }

                const type = args.length && args[0] === 'solo' ? 'solo' : 'team';
                queue.push({ members: [member], type: type });

                message.bot.storage.set('queue', queue)
                    .then(() => {
                        message.channel.send(member.displayName + " added to the queue!");
                    });
            });
    },
};
