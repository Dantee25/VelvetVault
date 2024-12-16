const express = require('express');
const nodemailer = require('nodemailer');

require('dotenv').config({ path: './backend/.env' });

const router = express.Router();

// Nodemailer configuration for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        //user: process.env.GMAIL_EMAIL, // Your Gmail address
        //pass: process.env.GMAIL_PASSWORD, // Your Gmail App Password
        user: process.env.GMAIL_EMAIL, // Your Gmail address
        pass: process.env.GMAIL_PASSWORD, // Your Gmail App Password
    },
});

// Email Notification Endpoint
router.post('/notify', async (req, res) => {
    const { name, email, phone, message } = req.body;

    // Email message options
    const emailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: process.env.GMAIL_EMAIL,
        subject: 'New Contact Form Submission',
        text: `You have received a new message from your contact form:\n\n
Name: ${name}\n
Email: ${email || 'N/A'}\n
Phone: ${phone || 'N/A'}\n
Message: ${message}`,
    };

    try {
        // Send email
        await transporter.sendMail(emailOptions);
        res.status(200).send('Email notification sent successfully.');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email notification.');
    }
});

module.exports = router;
