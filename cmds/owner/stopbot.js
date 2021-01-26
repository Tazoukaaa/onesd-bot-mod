const Discord = require('discord.js')

    module.exports.run = (client, message, args) => {

        message.delete().catch(err => {
            if(err) console.log(`[Erreur] ${err}`);
        });

        message.delete()
        
        if (message.author.id !== '660549195463131186') { message.channel.send('Uh, tu n\'es pas l\'owner du bot.'); }

        else {
            message.channel.send('Arrêt du robot correctement initialisé!')
                .then(() => process.exit(0));
        }
    };
    
    module.exports.config = {
        name: 'stop'
    };