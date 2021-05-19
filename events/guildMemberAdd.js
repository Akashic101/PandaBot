const fs = require('fs');
const Discord = require(`discord.js`);
const pjson = require('../package.json');

module.exports = async (client, member) => {

    const data = fs.readFileSync('./textfiles/icebreaker.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);

    var date = new Date();

    const memberJoinedEmbed = new Discord.MessageEmbed()
        .setColor('#cf8d1c')
        .setTitle('Member joined')
        .addFields({
            name: 'Username',
            value: member.user.tag
        }, {
            name: 'Joined at',
            value: date
        }, {
            name: 'Account created at',
            value: member.user.createdAt
        })
        .setThumbnail(member.user.displayAvatarURL({
            format: 'jpg'
        }))
        .setTimestamp()
        .setFooter(`${process.env.BOT_NAME} V ${pjson.version}`, process.env.BOT_PFP);
    client.channels.cache.get(process.env.SERVER_LOG_CHANNEL).send(memberJoinedEmbed);

    let role = member.guild.roles.cache.find(role => role.id == "720763494139428994")

    member.roles.add(role)

    var item = lines[Math.floor(Math.random() * lines.length)];
    return client.channels.cache.get("758341976369397761").send(`Hey <@${member.user.id}>. Welcome to The Cupboard! Please read and agree to the <#750797155928899636> in order to post in our server! Feel free to tell us a bit about yourself in <#758341976369397761>? ${item}`);
};