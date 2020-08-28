var pjson = require('../package.json');
const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'info',
    description: 'Sends info about the bot',
    execute(client, message, args) {

        var date = new Date();

        const helpEmbed = new Discord.MessageEmbed()
            .setColor('#a16d31')
            .setTitle(`**info**`)
            .addFields({
                name: 'Username',
                value: message.member.user.tag
            }, {
                name: 'Command',
                value: message.content
            }, {
                name: 'Date',
                value: date
            })
            .setThumbnail(message.member.user.displayAvatarURL({
                format: 'jpg'
            }))
            .setTimestamp()
            .setFooter(`${process.env.BOT_NAME} V ${pjson.version}`, process.env.BOT_PFP);
        const channel = message.client.channels.cache.get(process.env.SERVER_LOG_CHANNEL);
        channel.send(helpEmbed);

        fs.readdir('./commands', (err, files) => {
            let infoEmbed = new Discord.MessageEmbed()
                .setTitle('info')
                .setURL('https://github.com/Akashic101/SweetyPi')
                .setColor('RANDOM')
                .addFields({
                    name: 'Creator',
                    value: pjson.author,
                    inline: true
                }, {
                    name: 'Version',
                    value: pjson.version,
                    inline: true
                }, {
                    name: 'Commands',
                    value: files.length,
                    inline: true
                })

                .setTimestamp()
                .setFooter(`${process.env.BOT_NAME} V ${pjson.version}`, process.env.BOT_PFP);
            message.channel.send(infoEmbed);
        })
    },
};