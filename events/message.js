module.exports = (client, message) => {
    if (message.author.bot) return;
    //If the prefix isn't the first thing, then ignore.  also bots ^
    if (message.content.indexOf(client.prefix) !== 0) return;
    //Split up the message. Typically commands come in the form prefix command arg1 arg2 arg3 ...
    // let args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    // const re = /[^\s"']+|"([^"]*)"|'([^']*)'/g
    // const re = /\w+|"[\w\s]*"/
    const re = /(?:[^\s"]+|"[^"]*")+/g
    let args = message.content.slice(client.prefix.length).match(re)
    for(let i =0 ; i< args.length; i++){
        if(args[i].startsWith('"')&&args[i].endsWith('"')){
            args[i] = args[i].substring(1,args[i].length-1)
        }

    }
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command);
    if (!cmd) return;
    //check argument syntax
    if (cmd.args && !cmd.args(client, message, args)) {
        message.channel.send("Incorrect Usage. Try " + client.prefix + cmd.help.usage)
        return;
    }
    //check permissions
    if (cmd.permissions && !cmd.permissions(client, message, args)) {
        message.channel.send("You lack the permissions for this role.");
        return;
    }
    cmd.run(client, message, args);
}