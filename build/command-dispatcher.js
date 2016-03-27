"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const fs_1 = require('fs');
const path_1 = require('path');
const minimist = require('minimist');
class CommandDispatcher {
    constructor() {
        this.commandList = {};
    }
    static Create() {
        return __awaiter(this, void 0, Promise, function* () {
            let instance = new CommandDispatcher();
            return yield instance.initialize();
        });
    }
    initialize() {
        return new Promise((resolve, reject) => {
            fs_1.readdir(path_1.join(__dirname, 'commands'), (err, files) => {
                if (err)
                    return reject(err);
                if (!files || files.length < 1)
                    return resolve(this);
                files.forEach((file) => {
                    let command = new (require(path_1.join(__dirname, 'commands', file)).default)();
                    this.commandList[command.commandText] = command;
                    return resolve(this);
                });
            });
        });
    }
    handleCommand(event, command, payload) {
        console.log(this.commandList);
        if (!this.commandList[command])
            return console.error('InvalidCommand:', command, ':', JSON.stringify(payload));
        let message = payload.join(' ').trim();
        let optionStartIndex = message.indexOf(' -');
        let parameter = message;
        let options = {};
        if (!!~optionStartIndex) {
            parameter = message.substring(0, optionStartIndex).trim();
            options = minimist(message.substring(optionStartIndex).split(' '));
        }
        this.commandList[command].onCommand(event, parameter, options);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommandDispatcher;
