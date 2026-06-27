"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
exports.sendMail = sendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const email_templetes_js_1 = require("./email.templetes.js");
const common_1 = require("@nestjs/common");
const transport = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_APP_SENDER,
        pass: process.env.MAIL_APP_PASSWORD,
    },
});
async function sendMail({ to, subject, data, }) {
    await transport
        .sendMail({
        from: process.env.MAIL_APP_SENDER,
        to,
        subject,
        html: (0, email_templetes_js_1.sendOtp)(data),
    })
        .catch(() => {
        throw new common_1.HttpException('error in sending email', 400);
    });
}
const generateOtp = () => {
    return Math.floor(Math.random() * 100000);
};
exports.generateOtp = generateOtp;
//# sourceMappingURL=nodeMailer.js.map