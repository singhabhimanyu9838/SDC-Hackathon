// server/setupAdmin.js

require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin'); // Import the Admin model
const MONGODB_URI = process.env.MONGODB_URI;

// --- CONFIGURATION ---
const ADMIN_EMAIL = 'singhabhimanyu9838@gmail.com'; // CHANGE THIS EMAIL
const ADMIN_PASSWORD = 'SinghSDC9838.'; // CHANGE THIS PASSWORD
const ADMIN_NAME = 'SDC Lead Admin';
// ---------------------

async function setup() {
    console.log('Connecting to MongoDB...');
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('MongoDB Connected.');

        // 1. Check if admin user already exists
        const existingAdmin = await Admin.findOne({ email: ADMIN_EMAIL });

        if (existingAdmin) {
            console.log(`Admin user with email "${ADMIN_EMAIL}" already exists.`);
            // Optionally, update the name if you change the config above
            // existingAdmin.name = ADMIN_NAME;
            // await existingAdmin.save();
        } else {
            // 2. Create the new admin user
            const newAdmin = new Admin({
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD, // Password will be hashed automatically by the model's pre-save hook
                name: ADMIN_NAME,
            });

            await newAdmin.save();
            console.log(`\n🎉 SUCCESS: Admin user created!`);
            console.log(`Email: ${ADMIN_EMAIL}`);
            console.log(`Password: ${ADMIN_PASSWORD} (Hashed in DB)`);
        }

    } catch (error) {
        console.error('\n❌ ERROR during Admin setup:', error.message);
        console.error('Please ensure your MONGODB_URI in server/.env is correct and Network Access is configured on Atlas.');
    } finally {
        mongoose.connection.close();
        console.log('Connection closed.');
    }
}

setup();