// src/pages/Register.tsx - FINAL FIXED CODE FOR MONGO DB MIGRATION
import { useState, FormEvent, useRef } from 'react';
import { Users, CheckCircle, Loader2, Upload } from 'lucide-react'; 
import { TeamMember, Team } from '../types';


export default function Register() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState('');
  const [error, setError] = useState('');
  
  // Ref for the file input element
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State variables use camelCase for standard React readability
  const [formData, setFormData] = useState({
    teamName: '',
    teamLeaderName: '',
    email: '',
    phone: '',
    collegeName: '',
    projectIdea: '',
    githubLink: '',
    linkedinLink: '',
  });

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: '', email: '' },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...teamMembers];
    newMembers[index][field] = value;
    setTeamMembers(newMembers);
  };

  const addMember = () => {
    if (teamMembers.length < 3) {
      setTeamMembers([...teamMembers, { name: '', email: '' }]);
    }
  };

  const removeMember = (index: number) => {
    const newMembers = teamMembers.filter((_, i) => i !== index);
    setTeamMembers(newMembers);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const pptFile = fileInputRef.current?.files?.[0];

    // Basic file validation
    if (!pptFile) {
        setError('Please upload your Project Idea Document (PDF).');
        setLoading(false);
        return;
    }
    if (pptFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed for the Project Idea Document.');
        setLoading(false);
        return;
    }
    
    // --- MAPPING STATE KEYS TO MONGOOSE SCHEMA KEYS ---
    const fieldMapping = {
        teamName: 'team_name',
        teamLeaderName: 'team_leader_name',
        email: 'email',
        phone: 'phone',
        collegeName: 'college_name',
        projectIdea: 'project_idea',
        githubLink: 'github_link',
        linkedinLink: 'linkedin_link',
    };
    // ----------------------------------------------------
    
    // --- CONVERTING TO FormData for File Upload ---
    const formDataPayload = new FormData();

    // Append file first (key must match 'ideaPptFile' used by Multer on the backend)
    formDataPayload.append('ideaPptFile', pptFile); 

    // 🔑 CRITICAL FIX: Iterate over formData and append using the snake_case key
    Object.entries(formData).forEach(([camelKey, value]) => {
        const snakeKey = fieldMapping[camelKey as keyof typeof fieldMapping];
        formDataPayload.append(snakeKey, value);
    });

    // Append team members as a JSON string
    formDataPayload.append('team_members', JSON.stringify(teamMembers.filter(m => m.name && m.email)));

//     try {
//         // NOTE: We use the basic fetch API directly for file upload.
//         const response = await fetch('http://localhost:3000/api/teams', {
//             method: 'POST',
//             body: formDataPayload, // Pass FormData directly, without Content-Type header
//         });

     try {
        // NOTE: We use the basic fetch API directly for file upload.
        const response = await fetch('https://sdc-hackathon-2-2.onrender.com/api/teams', {
            method: 'POST',
            body: formDataPayload, // Pass FormData directly, without Content-Type header
        });


        if (!response.ok) {
            const errorData = await response.json();
            // This catches the Mongoose validation error message if the mapping failed
            throw new Error(errorData.message || 'Failed to register team.');
        }

        const responseData: Team = await response.json();

      setRegistrationId(responseData.registration_id); 
      setSuccess(true);
      setFormData({
        teamName: '',
        teamLeaderName: '',
        email: '',
        phone: '',
        collegeName: '',
        projectIdea: '',
        githubLink: '',
        linkedinLink: '',
      });
      if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Clear file input
      }
      setTeamMembers([{ name: '', email: '' }]);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to register. Please check all fields.');
    } finally {
      setLoading(false);
    }
  };
    
  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black pt-20 flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Registration Successful!
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your team has been successfully registered for SDC Hackathon 2025.
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Your Registration ID</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 font-mono">
              {registrationId}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Please save this ID for future reference
            </p>
            </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            A confirmation email has been sent to {formData.email || 'your email address'}. Please check
            your inbox for further details.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Register Another Team
          </button>
        </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Team Registration
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Fill in the details to register your team for SDC Hackathon 2025
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400">
              {error}
              </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Team Name *
              </label>
              <input
                type="text"
                name="teamName"
                required
                value={formData.teamName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your team name"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Team Leader Name *
                </label>
                <input
                  type="text"
                  name="teamLeaderName"
                  required
                  value={formData.teamLeaderName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="email@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  College Name *
                </label>
                <input
                  type="text"
                  name="collegeName"
                  required
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Your college name"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Team Members (up to 3 additional members)
                </label>
                {teamMembers.length < 3 && (
                  <button
                    type="button"
                    onClick={addMember}
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    + Add Member
                  </button>
                )}
              </div>
              <div className="space-y-4">
                {teamMembers.map((member, index) => (
                  <div key={index} className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <input
                      type="text"
                      placeholder="Member name"
                      value={member.name}
                      onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                      className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Member email"
                        value={member.email}
                        onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      {teamMembers.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMember(index)}
                          className="px-3 py-2 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/40 transition-colors"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Project Idea Title *
              </label>
              <textarea
                name="projectIdea"
                required
                value={formData.projectIdea}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Brief description of your project idea (optional at this stage)"
              />
            </div>

            {/* --- NEW INPUT FIELD: PROJECT IDEA PPT FILE --- */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Project Idea Document (PDF only) *
              </label>
              <div className="flex items-center space-x-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
                <input
                  type="file"
                  name="ideaPptFile"
                  ref={fileInputRef} // Attach the ref
                  required // Make the file mandatory for submission
                  accept=".pdf" // Restrict file types
                  className="flex-1 text-sm text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300"
                />
                <Upload className="h-5 w-5 text-gray-500 dark:text-gray-400" />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Max file size: 10MB. Must be PDF format.</p>
            </div>
            {/* --- END NEW INPUT FIELD --- */}

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  GitHub Profile (Optional)
                </label>
                <input
                  type="url"
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  LinkedIn Profile (Optional)
                </label>
                <input
                  type="url"
                  name="linkedinLink"
                  value={formData.linkedinLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center">
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Registering...
                </>
              ) : (
                <>
                  <Users className="h-5 w-5" />
                  Register Team
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}