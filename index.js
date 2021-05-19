require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
var pjson = require('./package.json');
const {
    format
} = require('path');
const requireAll = require(`require-all`);
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const files = requireAll({
    dirname: `${__dirname}/events`,
    filter: /^(?!-)(.+)\.js$/
});

for (const name in files) {
    const event = files[name];
    client.on(name, event.bind(null, client));
}
    const channel_message = '750840764640002058';
    const rules_message = '750835131995914331';
    const pronoun_message = '750836581757091900';

    const token = process.env.DISCORD_TOKEN;

    client.login(token)

    client.on("messageReactionRemove", async (reaction, user) => {

        switch (reaction.message.id) {
            case rules_message:
                if (reaction.emoji.name == '✅') {
                    reaction.message.guild.members.fetch(user)
                        .then((member) => {
                            member.roles.remove('720763494139428994').catch(console.error)
                        })
                }
                break;
            case pronoun_message:
                switch (reaction.emoji.name) {
                    case '🌿':
                        reaction.message.guild.members.fetch(user)
                            .then((member) => {
                                member.roles.remove('751104080914677891').catch(console.error)
                                member.setNickname(`${member.user.username}`)
                            })
                        break;
                    case '🌵':
                        reaction.message.guild.members.fetch(user)
                            .then((member) => {
                                member.roles.remove('751104348981035109').catch(console.error)
                                member.setNickname(`${member.user.username}`)
                            })
                        break;
                    case '🌱':
                        reaction.message.guild.members.fetch(user)
                            .then((member) => {
                                member.roles.remove('751104393356771408').catch(console.error)
                                member.setNickname(`${member.user.username}`)
                            })
                        break;
                }
                break;
            case channel_message:
                switch (reaction.emoji.name) {
                    case '📽️':
                        reaction.message.guild.members.fetch(user)
                            .then((member) => {
                                return member.roles.remove('751105438602231859').catch(console.error)
                            })
                        break;
                    case '🍩':
                        reaction.message.guild.members.fetch(user)
                            .then((member) => {
                                return member.roles.remove('751105739187028081').catch(console.error)
                            })
                        break;
                    case '😺':
                        reaction.message.guild.members.fetch(user)
                            .then((member) => {
                                return member.roles.remove('751105762641576096').catch(console.error)
                            })
                        break;
                    case '🟩':
                        reaction.message.guild.members.fetch(user)
                            .then((member) => {
                                return member.roles.remove('751105714700943420').catch(console.error)
                            })
                        break;
                }
                break;
        }
    })

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
            .addFields({
                name: 'User',
                value: reaction.message.author,
                inline: true
            }, {
                name: 'Message',
                value: reaction.message.content,
                inline: true
            })
            .setFooter(`${process.env.BOT_NAME} V${pjson.version}`, process.env.BOT_PFP);

        switch (reaction.emoji.name) {
            case '1️⃣':
                reportEmbed.addField('Rule', reaction.emoji.name, true)
                reportEmbed.addField('Link', `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, true)
                client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
                break;
            case '2️⃣':
                reportEmbed.addField('Rule', reaction.emoji.name, true)
                reportEmbed.addField('Link', `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, true)
                client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
                break;
            case '3️⃣':
                reportEmbed.addField('Rule', reaction.emoji.name, true)
                reportEmbed.addField('Link', `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, true)
                client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
                break;
            case '4️⃣':
                reportEmbed.addField('Rule', reaction.emoji.name, true)
                reportEmbed.addField('Link', `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, true)
                client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
                break;
            case '5️⃣':
                reportEmbed.addField('Rule', reaction.emoji.name, true)
                reportEmbed.addField('Link', `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, true)
                client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
                break;
            case '6️⃣':
                reportEmbed.addField('Rule', reaction.emoji.name, true)
                reportEmbed.addField('Link', `https://discord.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id}`, true)
                client.channels.cache.get(process.env.OFFICE).send(reportEmbed);
                break;
        }

        switch (reaction.message.id) {
            case pronoun_message:
                switch (reaction.emoji.name) {
                    case '🌿':
                        reaction.message.guild.members.fetch(user)
                            .then((member) => {
                                member.roles.add('751104080914677891').catch(console.error)
                                member.setNickname(`(he/him) ${member.user.username}`)
                            })
                        break;
                    case '🌵':
                        reaction.message.guild.members.fetch(user)
                            .then((member) => {
                                member.roles.add('751104348981035109').catch(console.error)
                                member.setNickname(`(she/her) ${member.user.username}`)
                            })
                        break;
                    case '🌱':
                        reaction.message.guild.members.fetch(user)
                            .then((member) => {
                                member.roles.add('751104393356771408').catch(console.error)
                                member.setNickname(`(they/them) ${member.user.username}`)
                            })
                        break;
                }
                break;
            case channel_message:
                switch (reaction.emoji.name) {
                    case '📽️':
                        reaction.message.guild.members.fetch(user)
                            .then((member) => {
                                return member.roles.add('751105438602231859').catch(console.error)
                            })
                        break;
                    case '🍩':
                        reaction.message.guild.members.fetch(user)
                            .then((member) => {
                                return member.roles.add('751105739187028081').catch(console.error)
                            })
                        break;
                    case '😺':
                        reaction.message.guild.members.fetch(user)
                            .then((member) => {
                                return member.roles.add('751105762641576096').catch(console.error)
                            })
                        break;
                    case '🔪':
                        reaction.message.guild.members.fetch(user)
                            .then((member) => {
                                return member.roles.add('760899033131778159').catch(console.error)
                            })
                        break;
                }
        }
    })


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
    return client.channels.cache.get(process.env.SERVER_LOG_CHANNEL).send(messageDeletedEmbed);
});


function sendLog(command, message) {

    var d = new Date();

    var serverLogEmbed = new Discord.MessageEmbed()
        .setTitle(`**${command.name}**`)
        .setColor(command.color)
        .setDescription(command.description)
        .addFields({
            name: `Username`,
            value: message.member.user.tag
        }, {
            name: `Command`,
            value: message.content
        }, {
            name: `channel`,
            value: `<#${message.channel.id}>`
        }, {
            name: `Date`,
            value: `${d.getDate()}.${d.getMonth()}.${d.getFullYear()} at ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
        }, {
            name: `link`,
            value: `https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`
        })
        .setThumbnail(message.member.user.displayAvatarURL({
            format: 'jpg'
        }))
        .setTimestamp()
        .setFooter(process.env.BOT_NAME + ' V' + pjson.version, process.env.PROFILE_PICTURE);

    var channel = message.client.channels.cache.get(process.env.SERVER_LOG_CHANNEL);
    channel.send(serverLogEmbed);
}