import nodemailer from "nodemailer";
import { envs } from "../../config";
import { RequestError } from "../../domain";

// Como se vera el objeto de configuracion para enviar correos
interface EmailProperties {
    addressee: string; // Destanatario del correo
    subject: string; // Sujeto del correo
    html: string; // Cuerpo HTML del correo
}

export class EmailService {

    // Enviar correo
    public sendEmail(config: EmailProperties) {
        const { addressee, html, subject } = config;

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: envs.GMAIL_USER,
                pass: envs.GMAIL_KEY,
            }
        });

        const mailOptions = {
            from: envs.GMAIL_USER,
            to: addressee,
            subject,
            html,
        }
        transporter.sendMail(mailOptions, (error) => {
            if(error) return RequestError.internalServerError();
        });
    }

}

