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

                data = ["**Queue**"];
                let i = 1;
                for(const q of queue) {
                    const member = message.guild.member(q.userID);
                    const roles = member.roles.cache.find(r => r.name.startsWith("Level"));
                    const level = roles ? roles.name : "N/A";
                    data.push([i.toString() + ". " + member.displayName, level].join(" - "));
                    i++;
                }
                data.push("\nType `&check` to add yourself to the queue!");
                message.channel.send(data.join("\n"));
            });
    },
};
