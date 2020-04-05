/**
 * Handler uses when the spell command is invoked
 */

class EchoCommand {
	execute(message, args) {
        message.reply(args.join(" "));
    }
}

module.exports = EchoCommand;
