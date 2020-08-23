const SlackBot = require ('slackbots')
const axios = require ('axios')


const bot = new SlackBot({
  token:'xoxb-1323193742788-1323909076996-zZ2m1Ig69UnsQBAJRNgjFwL6',
  name: 'jokebot2'
});

// Start handler

bot.on('start',()=>{
  const params ={
    icon_emoji:':smiley:'
  }
  bot.postMessageToChannel('geral','Get ready to laugh with @Jokebot',params)
})

//Error handler
bot.on('error',()=> console.log(err));

//Message handler
bot.on('message',(data)=>{
  if(data.type !=='message'){
    return
  }
  handleMessage(data.text)
})

// Respondes to data
function handleMessage (message){

  if(message.includes(' chucknorris')){
    chuckJoke();
  }

  else if(message.includes(' programming')){
    programmingJoke();
  }
  else if(message.includes(' random')){
    randomJoke()

  }

  else if(message.includes(' help')){
    runHelp()

  }


}

// Tell a Yo mama Joke
function programmingJoke (){
  axios.get('https://official-joke-api.appspot.com/jokes/programming/random').then(res =>{
    console.log('the res', res)
    const joke = `${res.data[0].setup} \n ${res.data[0].punchline}`;
    const params ={
      icon_emoji:':laughing:'
    }
    bot.postMessageToChannel('geral',`programin: ${joke}`,params)

  })
}


// Tell a Chuck Norris Joke
function chuckJoke (){
  axios.get( 'http://api.icndb.com/jokes/random').then(res =>{
    const joke = res.data.value.joke;

    const params ={
      icon_emoji:':laughing:'
    }
    bot.postMessageToChannel('geral',`Chuck Norris: ${joke}`,params)

  })
}


// Tell a Random joke
function randomJoke (){
  const rand= Math.floor(Math.random()*2) +1;
  if(rand===1){
    chuckJoke();
  }
  if(rand===2){
    programmingJoke();
  }
}

//Show help text

function runHelp(){

  const params ={
    icon_emoji:':question:'
  }
  bot.postMessageToChannel('geral',`Type @jokebot with either 'chucknorris', 'programming' or 'random' to get a joke`,params)
}