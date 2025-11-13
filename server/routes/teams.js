// server/routes/teams.js - FINAL FUNCTIONAL CODE FOR LINK SUBMISSION

const express = require('express');
const Team = require('../models/Team');
const authMiddleware = require('../middleware/auth');
// Removed: multer, path, fs as we are no longer handling file uploads
const { sendRegistrationConfirmation } = require('../services/emailService'); 

const router = express.Router();

const generateRegistrationId = () => { return `SDC-HACK-${Date.now()}`; };

// POST /api/teams - PUBLIC: Create a new team registration (Accepts JSON payload)
// This route now expects the frontend to send data as application/json.
router.post('/', async (req, res) => {
    try {
        const teamData = req.body;
        
        // 1. Validation/Cleanup (Ensure team_members is an array)
        if (!Array.isArray(teamData.team_members)) {
            teamData.team_members = [];
        }

        // 2. Populate MongoDB fields
        teamData.registration_id = generateRegistrationId();
        
        // 3. Save to MongoDB (Must await the save)
        const newTeam = new Team(teamData);
        await newTeam.save();

        // 🔑 4. NON-BLOCKING EMAIL: Trigger the email without 'await'. This prevents the timeout/hanging error.
        sendRegistrationConfirmation(
            newTeam.email, 
            newTeam.team_name, 
            newTeam.registration_id
        ); 

        res.status(201).json(newTeam.toJSON()); // Respond instantly to the client

    } catch (error) {
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
        
        // Map the stored link to the download field for the frontend
        const teamsWithDownloadUrl = cleanTeams.map(team => {
            team.idea_ppt_download_url = team.idea_ppt_link; 
            return team;
        });

        res.json(teamsWithDownloadUrl);

    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({ message: 'Failed to fetch teams' });
    }
});

// REMOVED: The GET /api/teams/pdf/:filename route is no longer included.

// DELETE /api/teams/:id - PROTECTED: Delete a team
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        // No file cleanup needed
        await Team.findByIdAndDelete(req.params.id);

        res.status(204).send();
    } catch (error) {
        console.error('Error deleting team:', error);
        res.status(500).json({ message: 'Failed to delete team' });
    }
});

module.exports = router;