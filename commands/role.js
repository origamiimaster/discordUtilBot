exports.run = async (client, message, args) => {
    let member = message.guild.members.cache.find((member) => {
        if (member.nickname) {
            return member.nickname.toLowerCase() === args[0].toLowerCase() || member.user.username.toLowerCase() === args[0].toLowerCase()
        } else {
            return member.user.username.toLowerCase() === args[0].toLowerCase() || member.id === args[0].slice(2,20)
        }
    })
    if (!member){
        message.channel.send(`GuildMember ${args[0]} not found.`)
        return
    }
    //step 2: find the role
    let role = message.guild.roles.cache.find((role)=>{
        return role.name === args[1] || role.id === args[1].slice(3,21);
    })
    if(!role){
        message.channel.send(`GuildRole ${args[1]} not found.`)
        return
    }
    if(member.roles.cache.has(role.id)){
        message.channel.send(`Member already has role. Remove it?`)
        .then((msg)=>{
            msg.react("👍")
            .then((yes)=>{
                msg.react("👎")
                .then((no)=>{
                    msg.createReactionCollector((reaction, user) => {
                        return !user.bot;
                    },
                        {
                            "max": 1,
                            "time": 60000,
                        }
                    )
                        .on('collect', (reaction) => {
                            
                            if(reaction === yes){
                                no.remove()
                                member.roles.remove(role)
                                .then((member)=>{
                                    msg.edit("Member already has role. Removing it...Success")
                                })
                                .catch(console.error)            
                            } else if (reaction === no){
                                yes.remove()
                            } else {
                                console.log("error")
                            }
                        })
                        .on('end', () => {
                            try {
                                no.remove();    
                            }catch{
                            }
                        })
                })
                .catch(console.error)
            })
            .catch(console.error)
        })
        .catch(console.error)
    } else {
        message.channel.send(`Member does not have role. Adding it.`)
        .then((msg)=>{
            member.roles.add(role)
            .then((member)=>{
                msg.edit("Member does not have role. Adding it... Success")
            })
            .catch(console.error)
        })
        .catch(console.error)
    }
}
exports.args = (client, message, args) => {
    return args.length >= 2;
}
exports.help = {
    name: "role",
    description: "Adds a user to role or removes them.",
    usage: "role <user> <role>"
}
exports.permissions = (client, message, args) => {
    return message.member.hasPermission(['MANAGE_ROLES']) //|| message.member.roles.cache.has("LATER")
}
