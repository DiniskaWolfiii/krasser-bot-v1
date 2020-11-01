/**
 *
 *
 * @param {import('discord.js').Client} client
 * @param {import('discord.js').Message} message
 */
module.exports.run = async (client, message, args) => {
    let messageUser = message.member;
    let taggedUser = message.mentions.members.first();
    try {
        message.delete();
        if(taggedUser) return message.channel.send(`*${messageUser} gibt ${taggedUser} einen Keks*`)
        else message.channel.send(`*${messageUser} isst genüsslich einen Keks*`)
    }

    catch (error) {
        message.channel.send("```js\n" + error + "\n```");
    }

}

module.exports.help = {
    name: 'cookie',
    usage: '!cookie <@User>',
    description: 'Gib Leuten einen Keks :)'
}