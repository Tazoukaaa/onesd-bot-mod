const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./db/config.json")
const fs = require("fs");

bot.commands = new Discord.Collection();

// ---------------------------------------------------------------------------- \\

fs.readdir("./cmds/utils/", (err, files) => {
    if(err) console.log(err);
 
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("[UTILS COMMANDS]: Aucune commande trouvée")
        return;
    }
 
    jsfile.forEach((f, i) => { 
        let props = require(`./cmds/utils/${f}`); 
        console.log(`[UTILS COMMANDS]: ${f} ok !`);
        bot.commands.set(props.config.name, props)  
})});

// ---------------------------------------------------------------------------- \\

fs.readdir("./cmds/owner/", (err, files) => {
    if(err) console.log(err);
 
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
        console.log("[OWNER COMMANDS]: Aucune commande trouvée")
        return;
    }
 
    jsfile.forEach((f, i) => { 
        let props = require(`./cmds/owner/${f}`); 
        console.log(`[OWNER COMMANDS]: ${f} ok !`);
        bot.commands.set(props.config.name, props)  
})});

// ---------------------------------------------------------------------------- \\

bot.on("ready", async () => {
    console.log(`(${bot.user.username}) = En ligne.`)

    let statuses = [
        "1SD - Modération",
        "Bot reserved for moderation!"
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"})
    }, 5000)
})

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;
    let prefix = config.prefix
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = bot.commands.get(command.slice(prefix.length))
    if(commandFile) commandFile.run(bot, message, args)

})




bot.login(config.token)