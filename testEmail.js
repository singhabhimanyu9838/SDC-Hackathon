require('dotenv').config();
const nodemailer = require('nodemailer');

console.log('--- Testing SMTP Connection ---');
console.log(`User: ${process.env.SMTP_USER}`);

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465', 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    tls: {
        rejectUnauthorized: false // Helps bypass some local SSL/firewall issues for testing
    }
});

async function verifyConnection() {
    try {
        await transporter.verify();
        console.log('\n✅ SMTP Connection Successful!');
        console.log('You can now use the registration form.');
    } catch (error) {
        console.error('\n❌ SMTP Connection FAILED!');
        console.error('Nodemailer Error Details:', error.message);
        console.log('\n--- Troubleshooting Steps ---');
        console.log('1. Check server/.env: Ensure SMTP_PASS (App Password) is correct and has NO spaces.');
        console.log('2. Check Gmail: Make sure the App Password is still active/not revoked.');
        console.log('3. Check Firewall: Temporarily disable Windows Defender/Antivirus to rule out local blocks.');
    }
}

verifyConnection();