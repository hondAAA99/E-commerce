"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventEmitter = void 0;
const node_events_1 = require("node:events");
const mail_enum_js_1 = __importDefault(require("../../enum/mail.enum.js"));
exports.eventEmitter = new node_events_1.EventEmitter();
exports.eventEmitter.on(mail_enum_js_1.default.sendMail, (fn) => {
    return fn();
});
//# sourceMappingURL=email.event.js.map