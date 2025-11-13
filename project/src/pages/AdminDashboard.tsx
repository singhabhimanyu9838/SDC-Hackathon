import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Download,
  Search,
  Trash2,
  LogOut,
  Loader2,
  Calendar,
  Mail,
  Phone,
  Building2,
  Code2,
  FileText, 
  Link // Icon for links
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { apiRequest } from '../lib/api';
import { Team } from '../types';

export default function AdminDashboard() {
  const { admin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !admin) {
      navigate('/admin/login');
    }
  }, [admin, authLoading, navigate]);

  useEffect(() => {
    if (admin) {
      fetchTeams();
    }
  }, [admin]);

  useEffect(() => {
    const filtered = teams.filter(
      (team) =>
        team.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.team_leader_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        team.registration_id.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTeams(filtered);
  }, [searchTerm, teams]);

  const fetchTeams = async () => {
    try {
      const data = await apiRequest<Team[]>('/teams', 'GET'); 
      setTeams(data || []);
      setFilteredTeams(data || []);
    } catch (error) {
      console.error('Error fetching teams:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team registration?')) return;

    setDeleting(id);
    try {
      await apiRequest(`/teams/${id}`, 'DELETE'); 

      setTeams(teams.filter((team) => team.id !== id));
    } catch (error) {
      console.error('Error deleting team:', error);
      alert('Failed to delete team. Please try again.');
    } finally {
      setDeleting(null);
    }
  };

  // The handleDownload function and all complex file logic have been removed.

  const exportToCSV = () => {
    // Updated headers for the new link field
    const headers = [
      'Registration ID',
      'Team Name',
      'Leader Name',
      'Email',
      'Phone',
      'College',
      'Project Idea',
      'Project Idea Link', // Uses the link field
      'Team Members',
      'GitHub',
      'LinkedIn',
      'Registration Date',
    ];

    const csvData = filteredTeams.map((team) => [
      team.registration_id,
      team.team_name,
      team.team_leader_name,
      team.email,
      team.phone,
      team.college_name,
      team.project_idea,
      team.idea_ppt_link || '', // Use the new idea_ppt_link field
      team.team_members.map((m) => `${m.name} (${m.email})`).join('; '),
      team.github_link || '',
      team.linkedin_link || '',
      new Date(team.created_at).toLocaleString(),
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `sdc-hackathon-registrations-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className={`text-4xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`}>
              Admin Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back, {admin.name}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-10 w-10 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {teams.length}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Total Teams</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-10 w-10 text-green-600" />
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {teams.reduce((acc, team) => acc + team.team_members.length + 1, 0)}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Total Participants</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-10 w-10 text-purple-600" />
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {teams.filter((t) => {
                  const today = new Date();
                  const regDate = new Date(t.created_at);
                  return regDate.toDateString() === today.toDateString();
                }).length}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Today's Registrations</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Building2 className="h-10 w-10 text-orange-600" />
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                {new Set(teams.map((t) => t.college_name)).size}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 font-medium">Colleges</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 md:mb-0">
              Registered Teams
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search teams..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 rounded-lg focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                />
              </div>
              <button
                onClick={exportToCSV}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                Export CSV
              </button>
            </div>
          </div>

          {filteredTeams.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              {searchTerm ? 'No teams found matching your search.' : 'No teams registered yet.'}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <div className="space-y-4">
                {filteredTeams.map((team) => (
                  <div
                    key={team.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                              {team.team_name}
                            </h3>
                            <p className="text-sm text-blue-600 dark:text-blue-400 font-mono">
                              {team.registration_id}
                            </p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center text-gray-700 dark:text-gray-300">
                            <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">
                              <strong>Leader:</strong> {team.team_leader_name}
                            </span>
                          </div>
                          <div className="flex items-center text-gray-700 dark:text-gray-300">
                            <Mail className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="text-sm break-all">{team.email}</span>
                          </div>
                          <div className="flex items-center text-gray-700 dark:text-gray-300">
                            <Phone className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">{team.phone}</span>
                          </div>
                          <div className="flex items-center text-gray-700 dark:text-gray-300">
                            <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="text-sm">{team.college_name}</span>
                          </div>
                        </div>

                        {team.team_members.length > 0 && (
                          <div className="mb-4">
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                              Team Members:
                            </p>
                            <div className="grid md:grid-cols-2 gap-2">
                              {team.team_members.map((member, idx) => (
                                <div
                                  key={idx}
                                  className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded px-3 py-2"
                                >
                                  {member.name} ({member.email})
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="mb-4">
                          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Project Idea:
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {team.project_idea}
                          </p>
                        </div>
                        
                        {/* --- DOWNLOAD LINK --- */}
                        {team.idea_ppt_download_url && (
                            <div className="mb-4">
                                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    Project Document Link:
                                </p>
                                <a
                                  href={team.idea_ppt_download_url} 
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
                                >
                                    <Link className="h-4 w-4 mr-2" />
                                    View Document
                                </a>
                            </div>
                        )}
                        {/* --- END DOWNLOAD BUTTON --- */}

                        <div className="flex flex-wrap gap-4 text-sm">
                          {team.github_link && (
                            <a
                              href={team.github_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              GitHub Profile
                            </a>
                          )}
                          {team.linkedin_link && (
                            <a
                              href={team.linkedin_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              LinkedIn Profile
                            </a>
                          )}
                          <span className="text-gray-500 dark:text-gray-400">
                            Registered: {new Date(team.created_at).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDelete(team.id)}
                        disabled={deleting === team.id}
                        className="mt-4 lg:mt-0 lg:ml-4 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deleting === team.id ? (
                          <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                          <Trash2 className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        </div>
      </div>  
  );
}