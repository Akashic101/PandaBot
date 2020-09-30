module.exports = {
	name: 'fakeuserjoin',
	description: 'Displays since when the bot is online',
	color: '#554F83',
	execute(client, message, args) {
		message.client.emit('guildMemberAdd', message.member);
	},
};