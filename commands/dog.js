const {
  RedditSimple
} = require('reddit-simple');

module.exports = {
  name: 'imgur',
  description: 'Sends a random image from imgur with the tag dog',
  color: '#66FFFF',
  execute(client, message, args) {

    var subredditList = [
      "dogpictures",
      "dogswithjobs",
      "WhatsWrongWithYourDog"
  ]

  var subreddit = subredditList[Math.floor(Math.random() * subredditList.length)];

    RedditSimple.RandomPost(subreddit).then(res => {
      message.channel.send(res[0].data.url)
    })
  },
};