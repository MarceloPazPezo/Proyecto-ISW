import nodemailer from "nodemailer";
import { emailConfig } from "../config/configEnv.js";

export const sendEmail = async (to, subject, text, html) => {
    try {
        if (!emailConfig.service || !emailConfig.user || !emailConfig.pass) {
            throw new Error("Faltan credenciales de configuración de correo.");
        }

        const transporter = nodemailer.createTransport({
            service: emailConfig.service,
            auth: {
                user: emailConfig.user,
                pass: emailConfig.pass,
            },
        });

        const mailOptions = {
            from: `"Ingeniería de Software 2024 - 2" <${emailConfig.user}>`,
            to,
            subject,
            text: text || "",
            html: html || "",
        };

        const result = await transporter.sendMail(mailOptions);

        return result;
    } catch (error) {
        console.error("Error enviando el correo: %s", error.stack || error.message);
        throw new Error("Error enviando el correo: " + error.message);
    }
};
