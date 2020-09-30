module.exports = {
	name: 'fakeuserleave',
	description: 'Displays since when the bot is online',
	color: '#B22222',
	execute(client, message, args) {
		message.client.emit('guildMemberRemove', message.member);
	},
};