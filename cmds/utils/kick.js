const Discord = require("discord.js");

module.exports.run = (bot, message, args) => {
    let kickedUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!kickedUser) {
        return message.channel.send(nontrouvé)
    }
    let kickReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send(nonpermission)
    }
    if(kickedUser.hasPermission("MANAGE_MESSAGES")) {
        return message.channel.send(nonmod)
    }
    let kickEmbed = new Discord.MessageEmbed()
    .setColor("#000001")
    .setTitle(`${message.author.username} à expulsé l'utilisateur ${kickedUser}.`)
    .addField("Raison de l'Expulsion :", kickReason)

    message.delete()
    message.channel.send(kickEmbed)

    message.guild.member(kickedUser).kick(kickReason)
}

let nontrouvé = new Discord.MessageEmbed()
.setDescription("**Utilisateur Non trouvé.**")
.setColor("000001")

let nonpermission = new Discord.MessageEmbed()
.setDescription("**Vous n'avez pas la permission !**")
.setColor("000001")


let nonmod = new Discord.MessageEmbed()
.setDescription("**Vous ne pouvez pas warn un modérateur !**")
.setColor("000001")




module.exports.config = {
    name: "kick"
}