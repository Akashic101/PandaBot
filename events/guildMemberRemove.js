const fs = require('fs');
const Discord = require(`discord.js`);
const pjson = require('../package.json');

module.exports = async (client, member) => {

    var date = new Date();

    const memberLeftEmbed = new Discord.MessageEmbed()
        .setColor('#f14e43')
        .setTitle('Member left')
        .addFields({
            name: 'Username',
            value: member.user.tag
        }, {
            name: 'Left at',
            value: date
        })
        .setThumbnail(member.user.displayAvatarURL({
            format: 'jpg'
        }))
        .setTimestamp()
        .setFooter(`${process.env.BOT_NAME} V ${pjson.version}`, process.env.BOT_PFP);
    client.channels.cache.get(process.env.SERVER_LOG_CHANNEL).send(memberLeftEmbed);
};