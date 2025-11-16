import { Calendar, Clock, Trophy, Users, CheckCircle, Skull, Compass, MapPin, Anchor, Lightbulb, Ship, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hackathon() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pt-20">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-serif font-bold mb-6 text-yellow-400">
              SDC Hackfest 2.0 Details
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A 24-hour innovation marathon bringing together brilliant minds.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Calendar,
                title: 'Event Date',
                value: 'December 15-16, 2025',
                color: 'from-blue-700 to-sky-700',
              },
              {
                icon: Clock,
                title: 'Duration', 
                value: '24 Hours Non-Stop',
                color: 'from-red-900 to-amber-700',
              },
              {
                icon: MapPin,
                title: 'Venue',
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
              <Lightbulb className="h-10 w-10 mr-4 text-yellow-300" />
              <h2 className="text-3xl font-bold text-yellow-300">Theme: Open Innovation</h2>
            </div>
            <p className="text-lg text-gray-300 mb-4">
              Build innovative solutions that address real-world social challenges and create
              a positive impact on society. Focus areas include:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                'Healthcare & Accessibility',
                'Education & Skill Development',
                'Environmental Sustainability',
                'Financial Inclusion',
                'Agriculture & Food Security',
                'Disaster Management',
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
              Event Schedule
            </h2>
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {[
                  {
                    time: 'Day 1 - 9:00 AM',
                    title: 'Registration & Check-in',
                    description: 'Team registration, breakfast, and networking',
                  },
                  {
                    time: 'Day 1 - 10:00 AM',
                    title: 'Opening Ceremony',
                    description: 'Welcome address, theme reveal, and rules explanation',
                  },
                  {
                    time: 'Day 1 - 11:00 AM',
                    title: 'Hacking Begins!',
                    description: 'Start building your innovative solutions',
                  },
                  {
                    time: 'Day 2 - 11:00 AM',
                    title: 'Artifact Submission',
                    description: 'Final submission deadline for all digital artifacts and maps (projects).',
                  },
                  {
                    time: 'Day 2 - 12:00 PM',
                    title: 'Presentations & Judging',
                    description: 'Presentations and judging by the panel of experts.',
                  },
                  {
                    time: 'Day 2 - 4:00 PM',
                    title: 'Closing Ceremony',
                    description: 'Winner announcement and prize distribution.',
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
              Competition Tracks
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Web Development',
                  description: 'Build responsive web applications using modern frameworks like React, Vue, or Angular',
                },
                {
                  title: 'Mobile Applications',
                  description: 'Create native or cross-platform mobile apps for Android and iOS',
                },
                {
                  title: 'Artificial Intelligence',
                  description: 'Develop AI/ML solutions using TensorFlow, PyTorch, or other ML frameworks',
                },
                {
                  title: 'Blockchain & Web3',
                  description: 'Build decentralized ledgers for secure treasure distribution and contract management.',
                },
                {
                  title: 'IoT & Hardware',
                  description: 'Create innovative hardware and software systems to manage the ship’s vital functions.',
                },
                {
                  title: 'Open Innovation',
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
              Rules & Guidelines
            </h2>
            <div className="bg-gray-800 rounded-xl p-8 shadow-lg max-w-4xl mx-auto border border-gray-700">
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Team size: 2-4 members (at least one girl compulsory)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>All team members must be current college students</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Projects must be built from scratch during the hackathon</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Existing charts (libraries/frameworks) may be used</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>The final project code must be pushed to a public GitHub repository</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Projects must align with the hackathon theme</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Presentation time: 5 minutes per team + 3 minutes Q&A</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}