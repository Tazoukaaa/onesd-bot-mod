const Discord = require("discord.js");

module.exports.run = (bot, message, args) => {
    let bannedUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
    if(!bannedUser) {
        return message.channel.send(nontrouvé)
    }
    let banReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(nonpermission)
    }
    if(bannedUser.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(nonmod)
    }
    let banEmbed = new Discord.MessageEmbed()
    .setColor("#000001")
    .setTitle(`${message.author.username} à banni l'utilisateur ${bannedUser}.`)
    .addField("Raison du Bannissement :", banReason)

    message.delete()
    message.channel.send(banEmbed)

    message.guild.member(bannedUser).ban({reason : banReason})
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
    name: "ban"
}