const fs = require('fs');
var pjson = require('../package.json');
const Discord = require('discord.js');

module.exports = {
    name: 'artprompt',
    description: 'Sends a random artprompt',
    modOnly: false,
    color: '#ff66cc',
    execute(client, message, args) {
        const colorsData = fs.readFileSync('textfiles/colors.txt', 'UTF-8');
        const themesData = fs.readFileSync('textfiles/themes.txt', 'UTF-8');
        const animalsData = fs.readFileSync('textfiles/animals.txt', 'UTF-8');
        const adjectivesData = fs.readFileSync('textfiles/adjectives.txt', 'UTF-8');

        const colorsLines = colorsData.split(/\r?\n/);
        const themesLines = themesData.split(/\r?\n/);
        const animalsLines = animalsData.split(/\r?\n/);
        const adjectivesLines = adjectivesData.split(/\r?\n/);

        const artpromptEmbed = new Discord.MessageEmbed()
            .setColor('#5db76e')
            .setTitle(`**Draw something using these prompts:**`)
            .setDescription('You don\'t need to use all of them of course :)')
            .addFields({
                name: 'Color',
                value: colorsLines[Math.floor(Math.random() * colorsLines.length)]
            }, {
                name: 'Theme',
                value: themesLines[Math.floor(Math.random() * themesLines.length)]
            }, {
                name: 'Animal',
                value: animalsLines[Math.floor(Math.random() * animalsLines.length)]
            }, {
                name: 'Adjective or emotion',
                value: adjectivesLines[Math.floor(Math.random() * adjectivesLines.length)]
            })
            .setTimestamp()
            .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);
        message.channel.send(artpromptEmbed);
    },
};