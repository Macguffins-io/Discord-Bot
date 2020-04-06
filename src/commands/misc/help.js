/**
 * help
 * Display a dynamic printout of all the commands
 */
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Show this help text',
    category: 'misc',
    aliases: ['commands'],
    execute(message, args) {
        const data = [];
        const { commands, prefix } = message.client;

        if(!args.length) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Macguffins IO Help')
                .setAuthor('Macguffins, Ltd.', '', 'https://macguffins.io')
                .setDescription('Here are the commands you can use. Type `&help <command>` for more information on a particular command!')
                .addFields(
                    commands.reduce((r, c) => (r.find(i => i.category === c.category) ? r.find(i => i.category === c.category).commands.push(c) : r.push({ category: c.category, commands : [c]}), r), [])
                        .map(c => ({name : c.category, value: c.commands.map(i => `\`${i.name}\` - ${i.description}`).join("\n") }))
                );

            return message.author.send(helpEmbed)
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply("I've sent you a DM with my commands!")
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply("I couldn't find that command.");
        }

        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setTitle(`Help: ${command.name}`)
            .setAuthor('Macguffins, Ltd.', '', 'https://macguffins.io')
            .setDescription(command.description)
            .addFields([
                { name: "Name", value: command.name },
                command.aliases ? { name: "Aliases", value: command.aliases.join(", ") } : null,
                command.usage ? { name: "Usage", value: `${prefix}${command.name} ${command.usage}`} : null,
                command.channel ? { name: "Channel", value: `#${command.channel}`} : null
            ].filter(x => !!x));
        message.channel.send(helpEmbed);
    }
};
