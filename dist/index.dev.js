"use strict";

var SlackBot = require('slackbots');

var axios = require('axios');

var bot = new SlackBot({
  token: 'xoxb-1323193742788-1323909076996-zZ2m1Ig69UnsQBAJRNgjFwL6',
  name: 'jokebot2'
}); // Start handler

bot.on('start', function () {
  var params = {
    icon_emoji: ':smiley:'
  };
  bot.postMessageToChannel('geral', 'Get ready to laugh with @Jokebot', params);
}); //Error handler

bot.on('error', function () {
  return console.log(err);
}); //Message handler

bot.on('message', function (data) {
  if (data.type !== 'message') {
    return;
  }

  handleMessage(data.text);
}); // Respondes to data

function handleMessage(message) {
  if (message.includes(' chucknorris')) {
    chuckJoke();
  } else if (message.includes(' programming')) {
    programmingJoke();
  } else if (message.includes(' random')) {
    randomJoke();
  } else if (message.includes(' help')) {
    runHelp();
  }
} // Tell a Yo mama Joke


function programmingJoke() {
  axios.get('https://official-joke-api.appspot.com/jokes/programming/random').then(function (res) {
    console.log('the res', res);
    var joke = "".concat(res.data[0].setup, " \n ").concat(res.data[0].punchline);
    var params = {
      icon_emoji: ':laughing:'
    };
    bot.postMessageToChannel('geral', "programin: ".concat(joke), params);
  });
} // Tell a Chuck Norris Joke


function chuckJoke() {
  axios.get('http://api.icndb.com/jokes/random').then(function (res) {
    var joke = res.data.value.joke;
    var params = {
      icon_emoji: ':laughing:'
    };
    bot.postMessageToChannel('geral', "Chuck Norris: ".concat(joke), params);
  });
} // Tell a Random joke


function randomJoke() {
  var rand = Math.floor(Math.random() * 2) + 1;

  if (rand === 1) {
    chuckJoke();
  }

  if (rand === 2) {
    programmingJoke();
  }
} //Show help text


function runHelp() {
  var params = {
    icon_emoji: ':question:'
  };
  bot.postMessageToChannel('geral', "Type @jokebot with either 'chucknorris', 'programming' or 'random' to get a joke", params);
}