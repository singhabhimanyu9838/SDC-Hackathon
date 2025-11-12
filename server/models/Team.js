// server/models/Team.js
const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
}, { _id: false });

const TeamSchema = new mongoose.Schema({
    team_name: { type: String, required: true },
    team_leader_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    college_name: { type: String, required: true },
    project_idea: { type: String, required: true },
    idea_ppt_path: { type: String, default: '' },
    team_members: { type: [TeamMemberSchema], default: [] }, 
    github_link: { type: String, default: '' },
    linkedin_link: { type: String, default: '' },
    registration_id: { type: String, required: true, unique: true }, 
}, { 
    timestamps: true,
    toJSON: { 
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id.toString();
            ret.created_at = ret.createdAt.toISOString();
            ret.updated_at = ret.updatedAt.toISOString();
            delete ret._id;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }
});

module.exports = mongoose.model('Team', TeamSchema);