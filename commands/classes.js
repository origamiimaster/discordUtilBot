exports.run = async (client, message, args) => {
    if(exports.subCommands[args[0]]){
        exports.subCommands[args[0]](client,message,args);
    } else {
        client.commands.get("help").run(client,message,["classes"])
    }
}
exports.args = (client, message, args) => {
    return args.length >= 1;
}
exports.help = {
    name: "classes",
    description: "Checks the class chats status.",
    usage: "classes list | add | groupadd | vc"
}
exports.permissions = (client, message, args) => {
    return message.member.hasPermission(['MANAGE_ROLES', 'MANAGE_CHANNELS'])
}
exports.subCommands = {};
exports.subCommands["list"] = async (client, message, args) => {
    message.channel.send("List")
    exports.getClassChannels(client,message)
}
exports.getClassChannels = (client,message) =>{
    if(!message.guild.available) return;
    let categories = message.guild.channels.cache.filter(channel => channel.name.startsWith("Class Chats") && channel.type == "category")
    message.channel.send(categories.array()[0].toString())

}