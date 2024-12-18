import { sendEmail } from "../services/email.service.js";

export const sendEmailDefault = async (req) => {
    const { email, message, subject, type, userName } = req.body;

    if (!email || !subject || !type) {
        return {
            success: false,
            error: "Faltan parámetros requeridos: email, subject o type",
        };
    }
    try {
        let htmlTemplate = "";

        switch (type) {
            case "welcome":
                htmlTemplate = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                            }
                            a {
                                color: #FFFFFF;
                            }
                            .email-container {
                                max-width: 600px;
                                margin: 20px auto;
                                background-color: #ffffff;
                                border-radius: 10px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                overflow: hidden;
                            }
                            .email-header {
                                background-color: #A158F5;
                                color: #ffffff;
                                text-align: center;
                                padding: 20px;
                            }
                            .email-header img {
                                max-height: 50px;
                                margin-bottom: 10px;
                            }
                            .email-header h1 {
                                margin: 0;
                                font-size: 24px;
                            }
                            .email-body {
                                padding: 20px;
                                color: #333333;
                            }
                            .email-body p {
                                font-size: 16px;
                                line-height: 1.6;
                            }
                            .email-footer {
                                text-align: center;
                                padding: 15px;
                                background-color: #f9f9f9;
                                font-size: 14px;
                                color: #777777;
                                border-top: 1px solid #dddddd;
                            }
                            .button {
                                display: inline-block;
                                padding: 10px 20px;
                                margin-top: 15px;
                                background-color: #ffffff;
                                color: #A158F5;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 16px;
                                border: 3px solid #A158F5;
                            }
                            .button:hover {
                                border: 3px solid #A158F5;
                                border-radius: 20px;
                                transition: 1s;
                            }
                            .support-link {
                                color: #A158F5;
                                text-decoration: none;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="email-header">
                                <img src="https://web.appoderado.cl/assets/img/componente_estadisticas.png" alt="ISW 2024 Logo">
                                <h1>Cuenta Registrada</h1>
                            </div>
                            <div class="email-body">
                                <div class="container">
                                    <h1>¡Bienvenido a ISW 2024!</h1>
                                    <p>Hola <strong>${userName}</strong>,</p>
                                    <p>Estamos emocionados de darte la bienvenida a nuestra comunidad. Aquí podrás acceder a herramientas exclusivas y recursos diseñados para tu éxito.</p>
                                    <p>Haz clic en el botón de abajo para comenzar:</p>
                                    <a href="https://isw2024.com/auth" style="padding: 10px 20px; background-color: #A158F5; color: white; text-decoration: none; border-radius: 5px;">Accede a tu cuenta</a>
                                </div>
                            </div>
                            <div class="email-footer">
                                <p>© 2024 ISW 2024 - Todos los derechos reservados.</p>
                                <p>Si tienes alguna pregunta, visita nuestro sitio web en <a href="http://146.83.198.35:1339/" class="support-link">http://146.83.198.35:1339/</a>.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `;
                break;
            
            case "accountDeletion":
                htmlTemplate = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                            }
                            .email-container {
                                max-width: 600px;
                                margin: 20px auto;
                                background-color: #ffffff;
                                border-radius: 10px;
                                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                                overflow: hidden;
                            }
                            .email-header {
                                background-color: #F9567D;
                                color: #ffffff;
                                text-align: center;
                                padding: 20px;
                            }
                            .email-header img {
                                max-height: 50px;
                                margin-bottom: 10px;
                            }
                            .email-header h1 {
                                margin: 0;
                                font-size: 24px;
                            }
                            .email-body {
                                padding: 20px;
                                color: #333333;
                            }
                            .email-body p {
                                font-size: 16px;
                                line-height: 1.6;
                            }
                            .email-footer {
                                text-align: center;
                                padding: 15px;
                                background-color: #f9f9f9;
                                font-size: 14px;
                                color: #777777;
                                border-top: 1px solid #dddddd;
                            }
                            .button {
                                display: inline-block;
                                padding: 10px 20px;
                                margin-top: 15px;
                                background-color: #ffffff;
                                color: #F9567D;
                                text-decoration: none;
                                border-radius: 5px;
                                font-size: 16px;
                                border: 3px solid #F9567D;
                            }
                            .button:hover {
                                border: 3px solid #F9567D;
                                border-radius: 20px;
                                transition: 1s;
                            }
                            .support-link {
                                color: #F9567D;
                                text-decoration: none;
                            }
                            .container {
                                text-align: center;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="email-container">
                            <div class="email-header">
                                <img src="https://web.appoderado.cl/assets/img/componente_estadisticas.png" alt="ISW 2024 Logo">
                                <h1>Cuenta Eliminada</h1>
                            </div>
                            <div class="email-body">
                                <p>Hola <strong>${userName}</strong>,</p>
                                <p>Lamentamos informarte que tu cuenta en <strong>ISW 2024</strong> ha sido eliminada. Si esta acción no fue realizada por ti, por favor contacta inmediatamente a nuestro equipo de soporte.</p>
                                <p>Te agradecemos por haber sido parte de nuestra comunidad. Siempre estaremos disponibles para cualquier consulta o apoyo que necesites.</p>
                                <div class="container">
                                    <a href="mailto:administrador2024@gmail.cl" class="button" style="padding: 10px 20px; background-color: #F9567D; color: white; text-decoration: none; border-radius: 5px;">Contactar Soporte</a>
                                </div>
                            </div>
                            <div class="email-footer">
                                <p>© 2024 ISW 2024 - Todos los derechos reservados.</p>
                                <p>Si tienes alguna pregunta, visita nuestro sitio web en <a href="http://146.83.198.35:1339/" class="support-link">http://146.83.198.35:1339/</a>.</p>
                            </div>
                        </div>
                    </body>
                    </html>
                `;
                break;

            case "scheduleChange":
                htmlTemplate = `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f9f9f9;
                                margin: 0;
                                padding: 20px;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #fff;
                                padding: 20px;
                                border-radius: 10px;
                                border: 1px solid #ddd;
                                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                            }
                            h1 {
                                color: #3E3478;
                                font-size: 22px;
                            }
                            p {
                                color: #555;
                                font-size: 16px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Notificación de Cambio de Horario</h1>
                            <p>Hola <strong>${userName}</strong>,</p>
                            <p>Te informamos que se han realizado cambios en tu horario.</p>
                            <p>Por favor, revisa los detalles en tu cuenta:</p>
                            <a href="https://isw2024.com/horarios" style="padding: 10px 20px; background-color: #A158F5; color: white; text-decoration: none; border-radius: 5px;">Ver mi Horario</a>
                        </div>
                    </body>
                    </html>
                `;
                break;

            default:
                return {
                    success: false,
                    error: "Tipo de correo no válido.",
                };
        }

        const info = await sendEmail(
            email,
            subject,
            message,
            htmlTemplate
        );

        return {
            success: true,
            data: info,
        };
    } catch (error) {
        console.error("Error al enviar el correo:", error.message);
        return {
            success: false,
            error: error.message,
        };
    }
};
