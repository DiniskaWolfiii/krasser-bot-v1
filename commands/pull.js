/**
 *
 *
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').Message} message
 */
module.exports.run = async (client, message, args) => {
    const {ownerID} = require('./../botconfig.json');
    const shelljs = reuqire('shelljs');

    if(message.author.id !== ownerID) return message.reply('DU BIST NICHT WOLFIII. HALTS MAUL! :c');

    message.channel.send(':bulb: Pulling...')
    .then(msg => {
        shelljs.cd('/home/wolfiii/bots/krasser-bot')
        shelljs.exec('git pull origin master')
        msg.edit(':bulb: Pulled!');
    })

}

module.exports.help = {
    name: 'pull',
    usage: '!pull',
    description: 'Zieht den Code von der GitHub Repository auf die VPS runter'
}