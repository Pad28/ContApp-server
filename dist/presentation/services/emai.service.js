"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = require("../../config");
const domain_1 = require("../../domain");
class EmailService {
    // Enviar correo
    sendEmail(config) {
        const { addressee, html, subject } = config;
        const transporter = nodemailer_1.default.createTransport({
            service: "Gmail",
            auth: {
                user: config_1.envs.GMAIL_USER,
                pass: config_1.envs.GMAIL_KEY,
            }
        });
        const mailOptions = {
            from: config_1.envs.GMAIL_USER,
            to: addressee,
            subject,
            html,
        };
        transporter.sendMail(mailOptions, (error) => {
            if (error)
                return domain_1.RequestError.internalServerError();
        });
    }
}
exports.EmailService = EmailService;
