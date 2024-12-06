import { sendEmail } from "../services/email.service.js";

export const sendEmailDefault = async (req) => {
    const { email, message, subject } = req.body;

    try {
        const info = await sendEmail(
            email,
            subject,
            message,
            `<p>${message}</p>`
        );

        return {
            success: true,
            data: info
        };
    } catch (error) {
        return {
            success: false,
            error: error.message
        };
    }
};