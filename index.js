const Discord = require('discord.js');
const { prefix, token, ownerID } = require('./botconfig.json');
const shelljs = require('shelljs');
const fs = require('fs');

const client = new Discord.Client();

client.commands = new Discord.Collection();

fs.readdir('./commands', (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split('.').pop() === 'js');
    if (jsfiles.length <= 0) {
        console.log('Keine Commands zum laden...');
        return;
    }
    console.log(`Loading ${jsfiles.length} commands`);

    jsfiles.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        client.commands.set(props.help.name, props);
    })
});

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity('mit krassen Wölfen🐺', { type: 'PLAYING' });
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    let cmd = client.commands.get(command);
    if (cmd) cmd.run(client, message, args);
});

client.on('guildMemberAdd', newMember => {
    let newUser = newMember.user.username;
    let welcomeMessages = [
        `WOOOP WOOOOP BICHTES! Die Party kann steigen! ${newUser} is hier!`,
        `Ach nur ${newUser} ist es, niemand wichtiges.`,
        `Macht den Landeplatz für ${newUser} frei, denn ${newUser} landet in T-10, 9, 8........ Zu langsam... JETZT!!! :rocket:`,
        `Willkommen ${newUser}. Bitte halte dich an den Hygienemaßnahmen, trage deine Mund-Nasen-Bedeckung im gesamten Server und halte den Mindestabstand von 27 Metern ein. Vielen Dank!`
    ]

    let randomNumber = Math.floor(Math.random() * welcomeMessages.length);

    let welcomeEmbed = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setThumbnail(newMember.user.displayAvatarURL())
        .setTitle('Neuer Krasser Dude ist dazu gekommen!')
        .setDescription(welcomeMessages[randomNumber]);

    let krasserChannel = newMember.guild.channels.cache.find(c => c.id === '692636574831214623');
    krasserChannel.send(welcomeEmbed);
    switch (newMember.guild.id) {
        case '565879649175994368':
            newMember.roles.add(['693595225129484289', '692482666469261403', '692482394455933008', '692435890454397059', '775417214400200734'], "Auto Role Join")
            break;
    }
})

client.on('guildMemberRemove', oldMember => {
    const userName = oldMember.user.username;
    let byeMessages = [
        `${userName} hat diesen Server verlassen :(`,
        `Die Treulose Tomate ${userName} hat uns verlassen! DIE SAU`,
        `${userName} hat sich aus dem Server GEYEETED`,
        `${userName} hat Corona und muss in Quarantäne!`
    ]
    let randomNumber = Math.floor(Math.random() * byeMessages.length);

    let byeEmbed = new Discord.MessageEmbed()
        .setColor('#FF0000')
        .setThumbnail(oldMember.user.displayAvatarURL())
        .setTitle('Krasser Dude hat den Server verlassen!')
        .setDescription(byeMessages[randomNumber]);

    let krasserChannel = oldMember.guild.channels.cache.find(c => c.id === '692636574831214623');
    krasserChannel.send(byeEmbed);
})

client.on('voiceStateUpdate', (oldState, newState) => {
    let joinToCreate = '882015730487398460';
    //if (newState.channel.guild.id !== '841784867778985996') return; // Prüfung ob Server

    if (newState.channelID === joinToCreate && newState.channel.members.array().length !== 0) {

        newState.guild.channels.create(newState.member.user.username + "'s Voice", {
            type: 'voice',
            parent: '882015433505513503',
            userLimit: 5,
            permissionOverwrites: [
                {
                    id: newState.member.user.id,
                    allow: ['MANAGE_CHANNELS', 'MOVE_MEMBERS', 'MANAGE_ROLES', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS']
                },
            ],
        })
            .then(newChannel => newState.setChannel(newChannel));

    } else if (!newState.channelID) {
        let userChannel = client.channels.cache.find(c=>c.id===oldState.channelID);
        if (oldState.channel.parentID === '882015433505513503' && userChannel.members.array().length === 0) return oldState.channel.delete();
    }
})

client.login(token);