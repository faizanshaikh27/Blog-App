const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASS
    }
})

const mail = async(to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to,
        subject,
        text
    }
    return transporter.sendMail(mailOptions)
}

const notificationService = {
    sendEmail: mail
}

module.exports = notificationService