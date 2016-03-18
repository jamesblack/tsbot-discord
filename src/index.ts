/// <reference path="../typings/main.d.ts" />

const Discord = require('discord.js')

const client = new Discord.Client()

client.on('disconnected', (event : any) => {
  console.error('Disconnected:', event)
})

client.on('error', (event : String) => {
  console.error('Error attempting to connect:', event)
})

client.on('ready', () => {
  console.info('Connected as:', client.user.username)
})

client.login(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD)

client.on('message', (event : any) : void => {
  console.log(event.content.trim())
  // if (event.author.id === client.user.id) return
  // if (!!~event.content.trim().indexOf('state of')) {
  //   event.client.reply(event, 'It seems you are making a shit-post asking about the state of X game. If you have scrolled to page two of the subreddit you would have found your answer.')
  //   .then(() => {
  //     event.client.reply(event, 'You have been banned from /r/MMORPG')
  //   })
  // }
})