const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT || 587, // Default to 587 if not specified
            secure: process.env.MAIL_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        let info = await transporter.sendMail({
            from: `"StudyNotion || CodeHelp - by Kirti" <${process.env.MAIL_USER}>`,
            to: email,
            subject: title,
            html: body,
        });

        console.log('Email sent:', info.response);
        return { success: true, response: info.response };
    } catch (error) {
        console.error('Error occurred while sending email:', error.message);
        return { success: false, error: error.message };
    }
};

module.exports = mailSender;
