const Discord = require("discord.js")
const fs = require("fs")
let warns = JSON.parse(fs.readFileSync("./db/warnings.json", "utf8"));
 
module.exports.run = async (bot, message, args) => {

    message.delete()
 
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(nonpermission)
    if(!message.guild.me.hasPermission("ADMINISTRATOR")) return (nonpermission1)
 
    let member = message.mentions.members.first()
    if(!member) return message.channel.send(nontrouvé)
    if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send(nonmod)
    let reason = args.slice(1).join(" ")
    if(!reason) return message.channel.send(nonraison)
    if(!warns[member.id]) warns[member.id] = {
        warns: 0
    }
    warns[member.id].warns++;
 
    fs.writeFileSync("./db/warnings.json", JSON.stringify(warns))
 
    let warnEmbed = new Discord.MessageEmbed()
    .setDescription(`${member} a reçu un avertissement pour : **${reason}**.`)
    .setColor("#0000FF")
 

    message.channel.send(warnEmbed)
}
 
let nontrouvé = new Discord.MessageEmbed()
.setDescription("**Utilisateur Non trouvé.**")
.setColor("000001")

let nonpermission = new Discord.MessageEmbed()
.setDescription("**Vous n'avez pas la permission !**")
.setColor("000001")
let nonpermission1 = new Discord.MessageEmbed()
.setDescription("**Je n'ai pas la permission d'effectuer cette action !**")
.setColor("000001")

let nonmod = new Discord.MessageEmbed()
.setDescription("**Vous ne pouvez pas warn un modérateur !**")
.setColor("000001")

let nonraison = new Discord.MessageEmbed()
.setDescription("**Veuillez citez une raison !**")
.setColor("000001")


module.exports.config  = {
    name: "warn"
}