/**
 * check
 * For checking a user into the arena
 */
module.exports = {
    name: 'queue',
    category: 'arena',
    description: 'See the arena queue when in #arena-queue',
    guildOnly: true,
    deleteMessage: true,
    channel: 'arena-queue',
    execute(message, args) {
        message.bot.storage.get('queue')
            .then((queue) => {
                if(queue === undefined) {
                    queue = [];
                }

                if(queue.length === 0) {
                    message.channel.send("Nobody is in the queue yet! Type `&check` to enter.");
                    return;
                }

                data = ["**Colosseum Queue**"];
                data.push(
                    queue.map((q, i) => {
                        return `${i+1}. ` + q.members.map(m => {
                            const member = message.guild.member(m.userID);
                            const role = member.roles.cache.find(r => r.name.startsWith("Level"));
                            const level = role ? role.name : "N/A";

                            return [
                                q.name,
                                member.displayName,
                                `[${level}]`,
                                (q.type === 'solo' ? '*SOLO*' : null)
                            ].filter(x => !!x).join(' ');
                        }).join(', ')
                    }).join("\n")
                );
                data.push("\nType `&check` to add yourself to the queue!");
                message.channel.send(data.join("\n"));
            });
    },
};
