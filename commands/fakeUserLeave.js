module.exports = {
	name: 'fakeuserleave',
	description: 'Displays since when the bot is online',
	execute(client, message, args) {
		message.client.emit('guildMemberRemove', message.member);
	},
};