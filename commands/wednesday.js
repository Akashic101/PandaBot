var pjson = require('../package.json');
const Discord = require('discord.js');

module.exports = {
    name: 'wednesday',
    description: 'Sends a Wednesday-meme',
    color: '#D9C9A8',
    execute(client, message, args) {
        const wednesdayEmbed = new Discord.MessageEmbed()
        .setColor('#E1CFB4')
        .setTitle(`**It's Wednesday my dudes**`)
        .setImage(args[0])
        .setTimestamp()
        .setFooter(`${process.env.BOT_NAME} V ${pjson.version}`, process.env.BOT_PFP);
        client.channels.cache.get('521894550680109083').send(wednesdayEmbed);
    },
};