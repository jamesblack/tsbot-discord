import { Command } from '../command'

export default class Ping implements Command {
  commandText: string = 'ping';

  onCommand(event: any, parameter: string, options: any): void {
    event.reply('Pong!')
  }
}