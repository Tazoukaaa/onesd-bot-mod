const Discord = require("discord.js")
const fs = require("fs")
let warns = JSON.parse(fs.readFileSync("./db/warnings.json", "utf8"));
 
module.exports.run = async (bot, message, args) => {

    message.delete()

    let warnEmbed = new Discord.MessageEmbed()
    .setDescription(`**Pour être clear warn, veuillez contactez les administrateur.**`)
    .setColor("#0000FF")
 

    message.channel.send(warnEmbed)
}
 


module.exports.config  = {
    name: "warnings"
}