export interface TeamMember {
  name: string;
  email: string;
}

export interface Team {
  id: string;
  team_name: string;
  team_leader_name: string;
  email: string;
  phone: string;
  college_name: string;
  team_members: TeamMember[];
  project_idea: string;
  github_link?: string;
  linkedin_link?: string;
  
  // 🔑 CHANGE: New field for the document link
  idea_ppt_link?: string;
  
  // 🔑 CHANGE: download_url now holds the same link
  idea_ppt_download_url?: string;
  
  registration_id: string;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  created_at: string;
}