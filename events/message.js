const Sequelize = require(`sequelize`);
const Discord = require(`discord.js`);
const pjson = require('../package.json');

module.exports = async (client, message) => {

    const serverDB = new Sequelize(`database`, `user`, `password`, {
		host: `localhost`,
		dialect: `sqlite`,
		logging: false,
		// SQLite only
		storage: `serverDB.sqlite`,
		timestamps: false,
	});

    const messages = serverDB.define(`messages`, {
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			unique: true,
		},
		user_id: {
			type: Sequelize.STRING,
			unique: true,
		},
		username: {
			type: Sequelize.STRING,
			unique: true,
		},
		messages: {
			type: Sequelize.INTEGER,
			defaultValue: 1,
			allowNull: false,
		}
	});

    const channels = serverDB.define(`channels`, {
		id: {
			primaryKey: true,
			type: Sequelize.INTEGER,
			unique: true,
		},
		channel_id: {
			type: Sequelize.STRING,
			unique: true,
		},
		channel_name: {
			type: Sequelize.STRING,
			unique: true,
		},
		messages: {
			type: Sequelize.INTEGER,
			defaultValue: 1,
			allowNull: false,
		},
	});

    messages.sync();
    channels.sync();

    const prefix = '!';

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if(!message.author.bot || message.author.self) {
        try {
            var channelMatch = await channels.findOne({
                where: {
                    channel_id: message.channel.id
                }
            })

            if (channelMatch) {
                channelMatch.increment(`messages`, {
                    by: 1
                })
            }

            else {
                var channelMatch = await channels.create({
                    channel_id: message.channel.id,
                    channel_name: message.channel.name
                })
            }

            //--------------------------

            var memberMatch = await messages.findOne({
                where: {
                    user_id: message.author.id
                }
            })


            if (memberMatch) {
                memberMatch.increment(`messages`, {
                    by: 1
                })
            }

            else {
                var memberMatch = await messages.create({
                    user_id: message.author.id,
					username: message.author.tag,
                })
            }
        } catch (e) {
            return console.log(e);
        }
    } 

    if (!message.content.startsWith(prefix) || message.author.bot || message.author.self || !client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.modOnly) {
        if (!message.member.roles.cache.some((role) => role.id == '710239573698936904')) {
            return message.reply("This command is only available for moderators. You do not have the permissions to use it")
        }
    }

    if (command.args && !args.length) {
        return message.reply(`You didn't provide any arguments!`);
    }

    if (command.channel) {
        for (let i = 0; i < command.channel.length; i++) {
            if (message.channel.name == command.channel[i]) {
                try {
                    sendLog(command, message);
                    return command.execute(client, message, args);
                } catch (error) {
                    console.error(error);
                    message.reply('there was an error trying to execute that command!');
                }
            }
        }
        var availableChannels = `<#${message.guild.channels.cache.find(channel => channel.name == command.channel[0]).id}>`;
        for (let i = 1; i < command.channel.length; i++) {
            if (command.channel[i] == 'bottesting') continue;
            var availableChannels = availableChannels.concat(` or <#${message.guild.channels.cache.find(channel => channel.name == command.channel[i]).id}>`)
        }
        return message.reply(`The command will not work here. \n It will work in ${availableChannels}`);
    } else {
        sendLog(command, message);
        try {
            return command.execute(client, message, args);
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
    }
};

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