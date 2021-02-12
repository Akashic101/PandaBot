const fs = require('fs');

module.exports = {
    name: 'prompt',
    description: 'Posts a random question regarding a personal achievement to answer.',
    modOnly: false,
    color: '#790db1',
    execute(client, message, args) {
        const data = fs.readFileSync('./textfiles/achieves.txt', 'UTF-8');
        const lines = data.split(/\r?\n/);
        var item = lines[Math.floor(Math.random() * lines.length)];
        message.reply(item);
    },
};