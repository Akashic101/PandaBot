/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

var pjson = require(`../package.json`);
const Sequelize = require(`sequelize`);
const ChartJsImage = require(`chartjs-to-image`);
const Canvas = require(`canvas`);
const fs = require(`fs`);
const Discord = require(`discord.js`);

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

module.exports = {
	name: `serverinfo`,
	modOnly: true,
	args: false,
	description: `Sends info about the server`,
	color: `#a664fe`,
	async execute(client, message, args) {

		var channelCount;

		var chartURL = ``;

		var memberArray = [];
		var messageArray = [];
		var memberCount;

		const serverEmbed = {
			color: `#FFE338`,
			timestamp: new Date(),
			footer: {
				text: `${process.env.BOT_NAME} V ${pjson.version}`,
				icon_url: process.env.BOT_PFP,
			},
		};

		await messages.findAndCountAll().then(result => {
			memberCount = result.count;
		});

		messages.findAll({
			order: [
				[`messages`, `DESC`],
			]
		}).then(async result => {

			for (var i = 0; i < memberCount; i++) {
				memberArray.push(result[i].dataValues.username);
				messageArray.push(result[i].dataValues.messages);
			}

			const chart = new ChartJsImage();
			chart.setConfig({
				type: `doughnut`,
				data: {
					labels: memberArray,
					datasets: [{
						label: `User`,
						borderColor: `#fffff`,
						borderWidth: 1,
						data: messageArray,
					}]
				},
				options: {
					plugins: {
						colorschemes: {
							scheme: `office.Inkwell6`
						},
						datalabels: {
							color: `white`
						},

					},
					legend: {
						labels: {
							backgroundColor: `#36393F`,
							fontColor: `white` //set your desired color
						}
					},
					title: {
						display: true,
						text: `Messages send by user`,
						fontStyle: `bold`,
						fontSize: 40,
						fontColor: `white`
					}
				},
				borderColor: `#fffff`,
			}).setWidth(1280)
				.setHeight(720)
				.setBackgroundColor(`#36393F`);

			chart.toFile(`./images/messages.png`);
		});

		serverEmbed.image = {
			url: chartURL,
		};

		await channels.findAndCountAll().then(result => {
			channelCount = result.count;
		});

		var channel_messagesArray = [];
		var channel_nameArray = [];

		channels.findAll({
			order: [
				[`messages`, `DESC`],
			]
		}).then(result => {
			var stringbuilder = `**Channel-Info** \n`;
			for (var i = 0; i < channelCount; i++) {
				channel_messagesArray.push(result[i].dataValues.messages);
				channel_nameArray.push(result[i].dataValues.channel_name);
				stringbuilder = stringbuilder + (`<#${result[i].dataValues.channel_id}>: ${result[i].dataValues.messages} messages send \n`);
			}
			fs.writeFile(`./textfiles/channel.txt`, stringbuilder, (error) => {
				if (error) throw err;
			});

			const chart = new ChartJsImage();
			chart.setConfig({
				type: `doughnut`,
				data: {
					labels: channel_nameArray,
					datasets: [{
						label: `User`,
						borderColor: `#fffff`,
						borderWidth: 1,
						data: channel_messagesArray,
					}]
				},
				options: {
					plugins: {
						colorschemes: {
							scheme: `office.Inkwell6`
						},
						datalabels: {
							color: `white`
						},

					},
					legend: {
						labels: {
							backgroundColor: `#36393F`,
							fontColor: `white` //set your desired color
						}
					},
					title: {
						display: true,
						text: `Messages send by channel`,
						fontStyle: `bold`,
						fontSize: 40,
						fontColor: `white`
					}
				},
				borderColor: `#fffff`,
			}).setWidth(1280)
				.setHeight(720)
				.setBackgroundColor(`#36393F`);

			chart.toFile(`./images/channels.png`);
		});

		var messagesCount;

		await messages.findAndCountAll().then(result => {
			messagesCount = result.count;
		});

		messages.findAll({
			order: [
				[`messages`, `DESC`],
			]
		}).then(result => {
			var stringbuilder = `\n **Member-Info** \n`;
			for (var i = 0; i < messagesCount; i++) {
				stringbuilder = stringbuilder + `P${i+1}: <@${result[i].dataValues.user_id}> with ${result[i].dataValues.messages} messages send this month \n`;
			}
			fs.writeFile(`./textfiles/messages.txt`, stringbuilder, (error) => {
				if (error) throw err;
			});
		});

		var canvas = Canvas.createCanvas(1280 * 2, 720);
		var ctx = canvas.getContext(`2d`);

		var messagesImage = await Canvas.loadImage(`./images/messages.png`);
		ctx.drawImage(messagesImage, 0, 0, 1280, 720);

		var channelsImage = await Canvas.loadImage(`./images/channels.png`);
		ctx.drawImage(channelsImage, 1280, 0, 1280, 720);

		var buffer = canvas.toBuffer(`image/png`);
		fs.writeFileSync(`./images/serverInfo.png`, buffer);

		var attachment = new Discord.MessageAttachment(canvas.toBuffer(), `image.png`);

		fs.readFile(`./textfiles/channel.txt`, (error, channelString) => {
			var serverInfoEmbed = new Discord.MessageEmbed()
				.setDescription(channelString.toString())
				.attachFiles(attachment)
				.setColor(`#FFE338`)
				.setTimestamp()
                .setFooter(`${process.env.BOT_NAME} V ${pjson.version}`, process.env.BOT_PFP);
			serverInfoEmbed.setDescription(channelString.toString());
			fs.readFile(`./textfiles/messages.txt`, (error, messageString) => {
				serverInfoEmbed.setDescription(serverInfoEmbed.description + messageString.toString());
				message.channel.send(serverInfoEmbed);
			});
		});
	},
};

function getMonth() {
	const today = new Date();
	var month = new Array();
	month[0] = `January`;
	month[1] = `February`;
	month[2] = `March`;
	month[3] = `April`;
	month[4] = `May`;
	month[5] = `June`;
	month[6] = `July`;
	month[7] = `August`;
	month[8] = `September`;
	month[9] = `October`;
	month[10] = `November`;
	month[11] = `December`;

	return month[today.getMonth()];
}