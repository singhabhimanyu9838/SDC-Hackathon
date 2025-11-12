// server/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// POST /api/auth/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, { expiresIn: '1d' });
        
        const adminData = { id: admin._id, email: admin.email, name: admin.name, created_at: admin.createdAt };
        res.json({ token, admin: adminData });

    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
});

// GET /api/auth/profile - Protected by token
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const admin = await Admin.findById(req.userId).select('-password');
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        
        const adminData = { id: admin._id.toString(), email: admin.email, name: admin.name, created_at: admin.createdAt.toISOString() };
        res.json(adminData);

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;