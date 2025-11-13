// server/routes/teams.js - FINAL VERIFIED CODE

const express = require('express');
const Team = require('../models/Team');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { sendRegistrationConfirmation } = require('../services/emailService'); 

const router = express.Router();

const generateRegistrationId = () => { return `SDC-HACK-${Date.now()}`; };

// --- Multer Configuration: DISK STORAGE ---
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path.join(__dirname, '..', 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
});
// -----------------------------------------------------------------------


// POST /api/teams - PUBLIC: Create a new team registration (Fixed for Deployment Timeout)
router.post('/', upload.single('ideaPptFile'), async (req, res) => {
    let uploadedFilePath = req.file ? req.file.path : null;
    
    try {
        const teamData = req.body;
        
        // 1. VALIDATION AND PARSING
        if (!req.file) {
            return res.status(400).json({ message: 'Project Idea Document (PDF) is required.' });
        }
        
        if (teamData.team_members && typeof teamData.team_members === 'string') {
            try {
                teamData.team_members = JSON.parse(teamData.team_members);
            } catch (e) {
                return res.status(400).json({ message: 'Invalid team member data format.' });
            }
        } else {
            teamData.team_members = []; 
        }

        // 2. Populate MongoDB fields
        teamData.idea_ppt_path = uploadedFilePath; 
        teamData.registration_id = generateRegistrationId();
        
        // 3. Save to MongoDB (Must await the save)
        const newTeam = new Team(teamData);
        await newTeam.save();

        // 🔑 4. NON-BLOCKING EMAIL: Trigger the email without 'await'. This is the fix 
        // for the submission timeout error (it runs in the background).
        sendRegistrationConfirmation(
            newTeam.email, 
            newTeam.team_name, 
            newTeam.registration_id
        ); 

        res.status(201).json(newTeam.toJSON()); // Respond instantly

    } catch (error) {
        // ⚠️ CRITICAL CLEANUP: Delete the uploaded file if DB save fails
        if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
            fs.unlinkSync(uploadedFilePath);
            console.log(`Cleaned up orphaned file: ${uploadedFilePath}`);
        }
        
        console.error('CRITICAL REGISTRATION ERROR:', error);
        
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Missing required team fields or data format incorrect.' });
        }
        
        res.status(500).json({ message: 'Failed to save team registration due to a server error.' });
    }
});

// GET /api/teams - PROTECTED: Get all teams (Admin Dashboard)
router.get('/', authMiddleware, async (req, res) => {
    try {
        const teams = await Team.find().sort({ createdAt: -1 });
        const cleanTeams = teams.map(team => team.toJSON());
        
        // Generate the download URL for the frontend
        const teamsWithDownloadUrl = cleanTeams.map(team => {
            if (team.idea_ppt_path) {
                const filename = path.basename(team.idea_ppt_path);
                team.idea_ppt_download_url = `/api/teams/pdf/${filename}`; 
            }
            return team;
        });

        res.json(teamsWithDownloadUrl);

    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ message: 'Failed to fetch teams' });
    }
});

// GET /api/teams/pdf/:filename - PROTECTED: Download PDF file
router.get('/pdf/:filename', authMiddleware, (req, res) => {
    const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
    
    if (fs.existsSync(filePath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=' + req.params.filename);
        res.sendFile(filePath);
    } else {
        res.status(404).json({ message: 'File not found' });
    }
});

// DELETE /api/teams/:id - PROTECTED: Delete a team (needs cleanup)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        // 1. Delete the local file first
        if (team.idea_ppt_path && fs.existsSync(team.idea_ppt_path)) {
            fs.unlinkSync(team.idea_ppt_path);
        }

        // 2. Delete the DB record
        await Team.findByIdAndDelete(req.params.id);

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting team:', error);
        res.status(500).json({ message: 'Failed to delete team' });
    }
});

module.exports = router;