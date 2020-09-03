module.exports = {
	name: 'fakeuserjoin',
	description: 'Displays since when the bot is online',
	execute(client, message, args) {
		message.client.emit('guildMemberAdd', message.member);
	},
};