import { Command } from './command'
import { readdir } from 'fs'
import { join } from 'path'
import * as minimist from 'minimist'

interface CommandList {
  [key: string]: Command
}

export default class CommandDispatcher {

  commandList: CommandList;

  static async Create() : Promise<CommandDispatcher> {
    let instance = new CommandDispatcher()
    return await instance.initialize()
  }

  constructor() {
    this.commandList = {}
  }

  initialize(): Promise<CommandDispatcher> {
    return new Promise((resolve, reject) => {
      readdir(join(__dirname, 'commands'), (err, files) => {
        if (err) return reject(err)
        if (!files || files.length < 1) return resolve(this)
        files.forEach((file) => {
          let command: Command = new (require(join(__dirname, 'commands', file)).default)()
          this.commandList[command.commandText] = command
          return resolve(this)
        })
      })
    })
  }

  handleCommand(event: any, command: string, payload: Array<string>): void {
    console.log(this.commandList)
    if (!this.commandList[command]) return console.error('InvalidCommand:', command, ':', JSON.stringify(payload))

    let message = payload.join(' ').trim()
    let optionStartIndex = message.indexOf(' -')
    let parameter = message
    let options = {}

    if (!!~optionStartIndex) {
      parameter = message.substring(0, optionStartIndex).trim()
      options = minimist(message.substring(optionStartIndex).split(' '))
    }

    this.commandList[command].onCommand(event, parameter, options)
  }

}