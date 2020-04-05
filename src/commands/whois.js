/**
 * whois
 * Print out a character and some basic information from the server
 */
module.exports = {
    name: 'whois',
    description: 'Look up a character',
    usage: '<character>',
    aliases: ['who'],
    guildOnly: true,
    execute(message, args) {
        if(args.length === 0) {
            message.channel.send('No character name given!');
            return;
        }

        const c = args.shift();

        // Add the following user information
        if(['add', 'update', 'delete'].indexOf(c) >= 0) {
            if(!args.length) {
                message.channel.send("No character name given!");
                return;
            }

            // TODO: Check permissions to make sure the user is able to change these

            const cname = args.shift();
            message.channel.send(`${c}: ${cname}`);

            if(["add", "update"].indexOf(c) >= 0) {
                let char = {};

                if(c === "update") {
                    // TODO: Fetch existing `char` value based on approximate `cname` and merge
                }

                // TODO: Read in parameters to figure out new `char` values
                // NOTE: Do not overwrite existing character name based on `char` unless it's an add

                // TODO: Push new `char` object based on character name
            }

            return;
        }

        message.channel.send('Lookup: ' + c);
        // TODO: Fetch existing `char` based on approximate `c` and print
    },
};
