"use strict";
class Ping {
    constructor() {
        this.commandText = 'ping';
    }
    onCommand(event, parameter, options) {
        event.reply('Pong!');
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Ping;
