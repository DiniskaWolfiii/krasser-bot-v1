/**
 *
 *
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').Message} message
 */
module.exports.run = async (client, message, args) => {

    try {
        const {ownerID} = require('./../botconfig.json');
        const shelljs = require('shelljs');
    
        if(message.author.id !== ownerID) return message.reply('DU BIST NICHT WOLFIII. HALTS MAUL! :c');
    
        message.channel.send(':zzz: Be right back!')
        .then(msg => {
            client.destroy();
            shelljs.exec('pm2 restart krasser-bot');
        })
    } catch (error) {
        message.channel.send("```js\n" + error + "\n```");
    }


}

module.exports.help = {
    name: 'reboot',
    usage: '!reboot',
    description: 'Startet den Bot neu.'
}