const fs = require('fs');
const pjson = require('../package.json');

var channel = require("../json/id.json");

module.exports = async (client, member) => {

    client.channels.cache.get(channel[3].id).messages.fetch(channel[2].id).then(m => {
        console.log("Cached pronoun message.");
    })
    client.channels.cache.get(channel[3].id).messages.fetch(channel[1].id).then(m => {
        console.log("Cached rules message.");
    })
    client.channels.cache.get(channel[4].id).messages.fetch(channel[5].id).then(m => {
        console.log("Cached channel message.");
    })

    fs.readdir('./commands', (err, files) => {
        console.log(`${process.env.BOT_NAME} is online with version ${pjson.version} and ${files.length} commands`);
    });
};