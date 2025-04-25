const nodemailer = require('nodemailer');

// Config Mailtrap transporter
const transporter = nodemailer.createTransport({
    host: 'live.smtp.mailtrap.io',
    port: 587,
    auth: {
        user: 'smtp@mailtrap.io',
        pass: 'e731fde1b8165377aaea40dd4c56e82b'
    }
});

const sendEmail = (toEmail) => {
    const mailOptions = {
        from: 'your-email@example.com', // Replace with your sender email
        to: toEmail,
        subject: 'Sac State Room Finder Code',
        text: 'Your verification code is: 00000' // You can customize this message
    };

    return transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };
