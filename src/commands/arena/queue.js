/**
 * check
 * For checking a user into the arena
 */
function findInQueue(queue, name) {
    for(let i = 0; i < queue.length; i++) {
        const team = queue[i];

        for(let j = 0; j < team.members.length; j++) {
            const m = team.members[j];
            if(m.displayName.toLowerCase().includes(name.toLowerCase())) {
                return [i, j];
            }
        }
    }
    return false;
}

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

                // TODO: Include permission check for management
                const subcommand = args.shift();
                if(subcommand === 'manage') {
                    const action = args.shift();
                    switch(action) {
                        case 'group':
                            if(args.length < 2) {
                                message.channel.send("Need two or more names to create a group.");
                                return;
                            }

                            const g = args.map(n => (findInQueue(queue, n))).filter(n => !!n);
                            const move = [];
                            const skip = [];
                            for(let i = 0; i < g.length; i++) {
                                if(g[i] < 0) {
                                    message.channel.send("Could not find in queue: " + args[i]);
                                    skip.push(i);
                                    continue;
                                }

                                move.push(queue[g[i][0]].members.splice(g[i][1], 1)[0]);
                            }

                            if(move.length < 2) {
                                message.channel.send("Not enough players selected to group.");
                                return;
                            }

                            Array.prototype.push.apply(queue[g[g.length-1][0]].members, move);
                            queue = queue.filter(n => n.members.length > 0);
                            message.bot.storage.set('queue', queue).then(() => {
                                message.channel.send(`Grouped ${move.length} players together!`);
                            });

                            return;
                        case 'ungroup':
                            return;
                        case 'move':
                            return;
                    }
                    if(args[1] === 'group') {

                    }
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
                                `[${level.replace("Level ", "")}]`,
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
