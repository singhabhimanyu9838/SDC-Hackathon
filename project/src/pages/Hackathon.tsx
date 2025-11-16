import { Calendar, Clock, Trophy, Users, CheckCircle, Skull, Compass, MapPin, Anchor, Lightbulb, Ship } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hackathon() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pt-20">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif font-bold mb-6 text-yellow-400">
              The Great Code Treasure Hunt
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A 24-hour voyage across the digital ocean, seeking solutions and glory.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Calendar,
                title: 'Set Sail Date',
                value: 'December 15-16, 2025',
                color: 'from-blue-700 to-sky-700',
              },
              {
                icon: Clock,
                title: 'Duration of Storm', // Fixed syntax error here
                value: '24 Hours Non-Stop',
                color: 'from-red-900 to-amber-700',
              },
              {
                icon: MapPin,
                title: 'Port of Call',
                value: 'College Campus',
                color: 'from-green-700 to-lime-700',
              },
            ].map((item, index) => (
              <div
                key={index}
                // Pirate card styling
                className="bg-gray-800 rounded-xl p-6 shadow-xl transition-all border border-amber-800"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${item.color} mb-4`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-amber-900/50 rounded-2xl p-8 md:p-12 text-gray-100 mb-16 border border-amber-600 shadow-2xl">
            <div className="flex items-center mb-6">
              <Anchor className="h-10 w-10 mr-4 text-yellow-300" />
              <h2 className="text-3xl font-bold text-yellow-300">The Map's Theme: Charting the Unknown</h2>
            </div>
            <p className="text-lg text-gray-300 mb-4">
              Your quest: Build powerful solutions that address real-world challenges—or, the dark, unexplored 
                corners of the digital map. Focus areas include finding digital artifacts in:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Navigating Health (Healthcare & Accessibility)',
                'Teaching the Cabin Boy (Education & Skill Development)',
                'Protecting the Sea (Environmental Sustainability)',
                'Plunder Control (Financial Inclusion)',
                'Feeding the Crew (Agriculture & Food Security)',
                'Surviving the Kraken (Disaster Management)',
              ].map((area, index) => (
                <div key={index} className="flex items-center text-yellow-200">
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-yellow-400" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">
              Tide Schedule (Event Timeline)
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    time: 'Day 1 - 9:00 Bells',
                    title: 'Boarding the Ship',
                    description: 'Crew check-in, distribution of rations, and last-minute recruitment.',
                  },
                  {
                    time: 'Day 1 - 10:00 Bells',
                    title: 'Captain\'s Address',
                    description: 'Official welcome, theme announcement, and rules of engagement.',
                  },
                  {
                    time: 'Day 1 - 11:00 Bells',
                    title: 'Code Cannons Fired!',
                    description: 'The 24-hour coding voyage begins.',
                  },
                  {
                    time: 'Day 2 - 11:00 Bells',
                    title: 'Artifact Submission',
                    description: 'Final submission deadline for all digital artifacts and maps (projects).',
                  },
                  {
                    time: 'Day 2 - 12:00 PM',
                    title: 'Trial by Captains',
                    description: 'Presentations and judging by the panel of master pirates.',
                  },
                  {
                    time: 'Day 2 - 4:00 PM',
                    title: 'Dividing the Bounty',
                    description: 'Closing ceremony and prize distribution.',
                  },
                ].map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-32">
                      <div className="text-sm font-semibold text-amber-500">
                        {event.time}
                      </div>
                    </div>
                    <div className="flex-grow bg-gray-800 rounded-lg p-4 shadow-md border border-gray-700">
                      <h3 className="font-bold text-lg mb-1 text-yellow-300">
                        {event.title}
                      </h3>
                      <p className="text-gray-400">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">
              Competition Flags (Tracks)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'The Coastal Map (Web Development)',
                  description: 'Construct interactive maps and interfaces for the crew using modern frameworks.',
                },
                {
                  title: 'Scrying Glass Apps (Mobile Applications)',
                  description: 'Develop communication and tracking tools for quick use on deck (mobile apps).',
                },
                {
                  title: 'Kraken Hunting (Artificial Intelligence)',
                  description: 'Develop intelligent systems for pattern recognition and automated navigation.',
                },
                {
                  title: 'Forbidden Coinage (Blockchain & Web3)',
                  description: 'Build decentralized ledgers for secure treasure distribution and contract management.',
                },
                {
                  title: 'Ship\'s Rigging (IoT & Hardware)',
                  description: 'Create innovative hardware and software systems to manage the ship’s vital functions.',
                },
                {
                  title: 'Open Seas (Open Innovation)',
                  description: 'Any other innovative digital artifact found in the boundless ocean.',
                },
              ].map((track, index) => (
                <div
                  key={index}
                  className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-700"
                >
                  <h3 className="text-xl font-bold mb-3 text-yellow-300">
                    {track.title}
                  </h3>
                  <p className="text-gray-400">{track.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">
              Articles of Engagement (Rules)
            </h2>
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg max-w-4xl mx-auto border border-gray-700">
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Crew size: 2-4 members (at least one female swashbuckler required)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>All crew must be current students of the academy</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Artifacts (Projects) must be crafted entirely during the voyage</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Existing charts (libraries/frameworks) may be used</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                 <span>The final treasure map (code) must be pushed to a public logbook (GitHub)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Projects must follow the official Code Map Theme</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Trial duration: 5 minutes presentation + 3 minutes questioning</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}