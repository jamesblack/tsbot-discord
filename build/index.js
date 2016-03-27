"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
/// <reference path="../typings/main.d.ts" />
const command_dispatcher_1 = require('./command-dispatcher');
const Discord = require('discord.js');
const client = new Discord.Client();
client.on('disconnected', (event) => {
    console.error('Disconnected:', event);
});
client.on('error', (event) => {
    console.error('Error attempting to connect:', event);
});
client.on('ready', () => {
    console.info('Connected as:', client.user.username);
});
client.login(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD).then(() => __awaiter(this, void 0, void 0, function* () {
    try {
        let dispatcher = yield command_dispatcher_1.default.Create();
        client.on('message', (event) => {
            if (event.author.id === client.user.id)
                return;
            if (event.content.trim()[0] !== '!')
                return;
            let plainMessage = event.content.trim().toLowerCase().substring(1);
            let splitMessage = plainMessage.split(' ');
            dispatcher.handleCommand(event, splitMessage[0], splitMessage.slice(1));
        });
    }
    catch (exception) {
        console.error(exception);
        throw exception;
    }
}));
