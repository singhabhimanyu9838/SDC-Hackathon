// server/routes/contact.js
const express = require('express');
const ContactMessage = require('../models/ContactMessage');
const router = express.Router();

// POST /api/contact - PUBLIC: Submit a new contact message
router.post('/', async (req, res) => {
    try {
        const newMessage = new ContactMessage(req.body);
        await newMessage.save();

        res.status(201).json(newMessage.toJSON());
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message' });
    }
});

module.exports = router;