const nodemailer = require('nodemailer');

// --- Configuration: Uses Render Environment Variables ---
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., smtp-relay.sendinblue.com
    port: process.env.SMTP_PORT, // e.g., 587
    secure: process.env.SMTP_PORT === '465', // Checks if SSL is needed
    auth: {
        user: process.env.SMTP_USER, // Brevo SID
        pass: process.env.SMTP_PASS, // Brevo Secret
    },
});

/**
 * Sends a registration confirmation email.
 * This function is designed to be called asynchronously (without 'await') 
 * so it does not block the main HTTP response thread.
 */
const sendRegistrationConfirmation = async (recipientEmail, teamName, registrationId) => {
    
    const mailOptions = {
        from: process.env.HACKATHON_EMAIL_FROM,
        to: recipientEmail,
        subject: `🎉 Registration Confirmed: SDC Hackathon 2025 - ${teamName}`,
        
        text: `Hello ${teamName},\n\nThank you for registering for the SDC Hackathon 2025!\n\nYour Registration ID is: ${registrationId}\n\nWe look forward to seeing your innovative project! Visit the hackathon page for the schedule.\n\nBest regards,\nThe SDC Team`,
        
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h2 style="color: #4c51bf;">Registration Confirmed!</h2>
                <p>Hello ${teamName},</p>
                <p>Thank you for registering for the SDC Hackathon 2025. Your participation is confirmed.</p>
                
                <div style="background-color: #f0f4ff; padding: 15px; border-radius: 6px; margin: 20px 0;">
                    <p style="font-size: 14px; color: #555;">Your Official Registration ID:</p>
                    <p style="font-size: 20px; font-weight: bold; color: #7f00ff;">${registrationId}</p>
                </div>
                
                <p>We've received your team details and your Project Idea Document. Please keep your Registration ID safe.</p>
                <p>Best regards,<br>The SDC Team</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`[Email] Confirmation sent to ${recipientEmail}`);
        return { success: true };
    } catch (error) {
        // CRITICAL: Log the failure without stopping the server.
        console.error(`[Email] FAILED to send confirmation to ${recipientEmail}. Nodemailer Error:`, error.message);
        return { success: false, error: error.message };
    }
};

module.exports = { sendRegistrationConfirmation };