const Discord = require("discord.js")
const superagent = require("superagent")
 
 
module.exports.run = async (bot, message, args) => {

    message.delete()
 
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(nonpermission)
 
    let DMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
    if(!DMember) return message.channel.send(nontrouvé)
 
    let email = args.join(" ").slice(22);
    if(!email) return message.channel.send(nonmod)
 
    let MSG = new Discord.MessageEmbed()
    .setDescription("Vous venez de recevoir un mail : " + `${email}`)
    .setColor("#000001")

    let MSG1 = new Discord.MessageEmbed()
    .setDescription("LE MAIL A BIEN ETE ENVOYE A " + ` ${DMember} `)
    .setColor("#000001")

    message.channel.send(MSG1)
    DMember.send(MSG)
}

let nontrouvé = new Discord.MessageEmbed()
.setDescription("Utilisateur Non trouvé.")
.setColor("000001")

let nonpermission = new Discord.MessageEmbed()
.setDescription("Vous n'avez pas la permission !")
.setColor("000001")

let nonmod = new Discord.MessageEmbed()
.setDescription("Veuillez entré un message ! !")
.setColor("000001")
 
module.exports.config = {
    name: "dm"
}