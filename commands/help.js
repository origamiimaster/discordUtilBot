exports.run = (client, message, args) => {
    var fieldArray = [];
    if(args.length > 0){
        let command = client.commands.get(args[0])
        if(command){
            fieldArray.push({
                name: (command.help) ? client.prefix + command.help.usage : client.prefix + args[0],
                value: (command.help) ? command.help.description : "Not Implemented"
            })    
        } else {

        }
    } else { 
        for (const [key, value] of client.commands) {
            fieldArray.push({
                name: (value.help) ? client.prefix + value.help.usage : client.prefix + key,
                value: (value.help) ? value.help.description : "Not Implemented"
            })
        }
    }
    
    const exampleEmbed = {
        color: 0x00ff33,
        title: 'Help Menu',
        // description: 'A quick help command',
        thumbnail: {
            url: 'attachment://file.jpg'
        },
        fields: fieldArray,
    };
    message.channel.send({ embed: exampleEmbed, files: [{ attachment: client.user.avatarURL(), name: 'file.jpg' }] })
        .then((msg) => {
            msg.react('⏹️')
                .then((messageReaction) => {
                    msg.createReactionCollector((reaction, user) => {
                        return reaction.emoji.name === '⏹️' && !user.bot;
                    },
                        {
                            "max": 1,
                            "time": 60000,
                        }
                    )
                        .on('collect', () => {
                            msg.delete({ "timeout": 500 });
                        })
                        .on('end', () => {
                            messageReaction.remove();
                        })
                })
        })
}
exports.init = (client) => {
    return;
}
exports.permissions = (client, message, args) => {
    return true;
}
exports.args = (client, message, args) => {
    return true;
}
exports.help = {
    name: "help",
    description: "Accesses the help menu, or specific help for a command",
    usage: "help <command>"
}