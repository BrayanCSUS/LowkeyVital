const express = require('express');
const mailgun = require('mailgun-js');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mg = mailgun({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.MAILGUN_DOMAIN });

// In-memory storage for the verification code
let verificationCode = null;

// Function to generate a random 5-digit code
const generateVerificationCode = () => {
    const code = Math.floor(Math.random() * 100000); // Generates a number between 0 and 99999
    return code.toString().padStart(5, '0'); // Pads the number with leading zeros to ensure it's 5 digits
};

app.post('/send-email', (req, res) => {
    const { email } = req.body;

    // Generate a new verification code
    verificationCode = generateVerificationCode();

    const data = {
        from: 'CSUS Room Finder <LowkeyVital@sandbox39db97213a4c49df8b03aab8956cdfa0.mailgun.orgm>',
        to: email,
        subject: 'Verification Code',
        text: `Your verification code is: ${verificationCode}`,
    };

    mg.messages().send(data, (error, body) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Failed to send email', error: error.message });
        }
        console.log('Email sent successfully:', body);
        res.status(200).json({ message: 'Email sent successfully' });
    });
});

// Endpoint to verify the code
app.post('/verify-code', (req, res) => {
    const { code } = req.body;

    if (code === verificationCode) {
        res.status(200).json({ message: 'Verification successful' });
    } else {
        res.status(400).json({ message: 'Invalid verification code' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
