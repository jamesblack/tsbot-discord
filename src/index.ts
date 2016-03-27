/// <reference path="../typings/main.d.ts" />
import CommandDispatcher from './command-dispatcher'

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

client.login(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD).then(async () => {
  try {
    let dispatcher = await CommandDispatcher.Create()
    client.on('message', (event : any) : void => {
      if (event.author.id === client.user.id) return
      if (event.content.trim()[0] !== '!') return
      let plainMessage = event.content.trim().toLowerCase().substring(1)
      let splitMessage = plainMessage.split(' ')
      dispatcher.handleCommand(event, splitMessage[0], splitMessage.slice(1))
    })
  } catch (exception) {
    console.error(exception)
    throw exception
  }
})