const nodemailer = require('nodemailer');

// 1. Create a transporter object using the SMTP configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// 2. Define the main function to send the confirmation email
const sendRegistrationConfirmation = async (recipientEmail, teamName, registrationId) => {
    
    const mailOptions = {
        from: process.env.HACKATHON_EMAIL_FROM,
        to: recipientEmail,
        subject: `🎉 Registration Confirmed: SDC Hackathon 2025 - ${teamName}`,
        
        // Plain text content for compatibility
        text: `Hello ${teamName},\n\nThank you for registering for the SDC Hackathon 2025!\n\nYour Registration ID is: ${registrationId}\n\nWe look forward to seeing your innovative project! Visit the hackathon page for the schedule.\n\nBest regards,\nThe SDC Team`,
        
        // HTML content for aesthetic display
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
                <p>Visit our <a href="http://localhost:5173/hackathon" style="color: #4c51bf;">Hackathon Schedule Page</a> for the latest updates.</p>
                <p>Best regards,<br>The SDC Team</p>
            </div>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`[Email] Confirmation sent to ${recipientEmail}`);
        return { success: true };
    } catch (error) {
        console.error(`[Email] Failed to send confirmation to ${recipientEmail}:`, error);
        return { success: false, error: error.message };
    }
};

module.exports = { sendRegistrationConfirmation };