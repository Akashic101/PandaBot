require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
var pjson = require('./package.json');
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const token = process.env.DISCORD_TOKEN;

const prefix = '!';

client.login(token)

client.once('ready', () => {
    fs.readdir('./commands', (err, files) => {
        console.log(`Bot ${process.env.BOT_NAME} is online with version ${pjson.version} and ${files.length} commands`);
    });
});

//Gets called whenever a user joins the server
client.on('guildMemberAdd', (member) => {

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
});

//Gets called whenever a user leaves the server
client.on('guildMemberRemove', (member) => {

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
});

client.on("messageReactionAdd", async (reaction, user) => {

    if (reaction.partial) {
        try {
            await reaction.fetch();
        } catch (error) {
            return console.log('Something went wrong when fetching the message: ', error);
        }
    }

    let reportEmbed = new Discord.MessageEmbed()
        .setTitle('**Report**')
        .setColor('#CC0000')
        .setTimestamp()
    reportEmbed.addFields({
            name: 'User',
            value: reaction.message.author,
            inline: true
        }, {
            name: 'Message',
            value: reaction.message.content,
            inline: true
        }, {
            name: 'Link',
            value: `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`,
            inline: true

        })
        .setFooter(`${process.env.BOT_NAME} V ${pjson.version}`, process.env.BOT_PFP);

    switch (reaction.emoji.name) {
        case '1️⃣':
            reportEmbed.addField('Rule', reaction.emoji.name, true)
            return client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
        case '2️⃣':
            reportEmbed.addField('Rule', reaction.emoji.name, true)
            return client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
        case '3️⃣':
            reportEmbed.addField('Rule', reaction.emoji.name, true)
            return client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
        case '4️⃣':
            reportEmbed.addField('Rule', reaction.emoji.name, true)
            return client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
        case '5️⃣':
            reportEmbed.addField('Rule', reaction.emoji.name, true)
            return client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
        case '6️⃣':
            reportEmbed.addField('Rule', reaction.emoji.name, true)
            return client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
        case '7️⃣':
            reportEmbed.addField('Rule', reaction.emoji.name, true)
            return client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
        case '8️⃣':
            reportEmbed.addField('Rule', reaction.emoji.name, true)
            return client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
        case '9️⃣':
            reportEmbed.addField('Rule', reaction.emoji.name, true)
            return client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
        case '0️⃣':
            reportEmbed.addField('Rule', reaction.emoji.name, true)
            return client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
    }


    var d = new Date();
    if (reaction.message.id === '712781048504647791') {
        reaction.message.guild.members.fetch(user)
            .then((member) => {
                member.roles.add('712001337440862269').catch(console.error)
                    .then(() => {
                        let readyEmbed = new Discord.MessageEmbed()
                            .setTitle('**Member agreed to rules**')
                            .setDescription(`**${member.user.tag}** agreed to the rules at ` + d + ". He is in the server since " + Math.round((d - member.joinedAt) / 1000) + " seconds")
                            .setColor("7F0000")
                            .setTimestamp()
                            .setFooter(`${process.env.BOT_NAME} V ${pjson.version}`, process.env.BOT_PFP);
                        client.channels.cache.get(process.env.SERVER_LOG_CHANNEL).send(readyEmbed);
                    });
            });
    }
});

client.on('messageDelete', async message => {

    if (!message.guild) return;
    const fetchedLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: 'MESSAGE_DELETE',
    });

    const deletionLog = fetchedLogs.entries.first();

    if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

    const {
        executor,
        target
    } = deletionLog;

    const messageDeletedEmbed = new Discord.MessageEmbed()
        .setTitle('**Deleted message**')
        .setColor("#c3032b")
        .setTimestamp()
        .setFooter(`${process.env.BOT_NAME} V ${pjson.version}`, process.env.BOT_PFP);

    if (target.id === message.author.id) {
        messageDeletedEmbed.setDescription(`A message by **${message.author.tag}** was deleted by **${executor.tag}**.`)
        messageDeletedEmbed.setThumbnail(message.author.displayAvatarURL({
            format: 'jpg'
        }))
    } else {
        messageDeletedEmbed.setDescription(`A message by **${message.author.tag}** was deleted, but I don't know by who`);
        messageDeletedEmbed.setThumbnail(message.author.displayAvatarURL({
            format: 'jpg'
        }))
    }
    client.channels.cache.get(process.env.SERVER_LOG_CHANNEL).send(messageDeletedEmbed);
});


client.on('message', async message => {

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!message.content.startsWith(prefix) || message.author.bot || message.author.self || !client.commands.has(command)) return;

    try {
        client.commands.get(command).execute(client, message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
})