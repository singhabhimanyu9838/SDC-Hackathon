import { Calendar, Clock, Trophy, Users, CheckCircle, Award, MapPin, Lightbulb } from 'lucide-react';

export default function Hackathon() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black pt-20">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SDC Hackfest2.0 2025
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A 24-hour innovation marathon bringing together brilliant minds to solve real-world problems
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Calendar,
                title: 'Date',
                value: 'December 15-16, 2025',
                color: 'from-blue-500 to-cyan-500',
              },
              {
                icon: Clock,
                title: 'Duration',
                value: '24 Hours Non-Stop',
                color: 'from-purple-500 to-pink-500',
              },
              {
                icon: MapPin,
                title: 'Venue',
                value: 'College Campus',
                color: 'from-orange-500 to-red-500',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${item.color} mb-4`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white mb-16">
            <div className="flex items-center mb-6">
              <Lightbulb className="h-10 w-10 mr-4" />
              <h2 className="text-3xl font-bold">Theme: Releasing Soon... </h2>
            </div>
            <p className="text-lg text-blue-100 mb-4">
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
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                  <span>{area}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Event Timeline
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
                    time: 'Day 1 - 1:00 PM',
                    title: 'Lunch Break',
                    description: 'Complimentary lunch for all participants',
                  },
                  {
                    time: 'Day 1 - 3:00 PM',
                    title: 'Workshop Session',
                    description: 'Technical workshop on AI/ML tools and frameworks',
                  },
                  {
                    time: 'Day 1 - 8:00 PM',
                    title: 'Dinner & Midnight Snacks',
                    description: 'Fuel up for the night coding session',
                  },
                  {
                    time: 'Day 2 - 9:00 AM',
                    title: 'Final Sprint',
                    description: 'Last two hours to complete your project',
                  },
                  {
                    time: 'Day 2 - 11:00 AM',
                    title: 'Submission Deadline',
                    description: 'Submit your project and presentation',
                  },
                  {
                    time: 'Day 2 - 12:00 PM',
                    title: 'Presentations & Judging',
                    description: 'Present your solution to the judges',
                  },
                  {
                    time: 'Day 2 - 4:00 PM',
                    title: 'Closing Ceremony',
                    description: 'Winner announcement and prize distribution',
                  },
                ].map((event, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-32">
                      <div className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {event.time}
                      </div>
                    </div>
                    <div className="flex-grow bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                      <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Competition Tracks
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Web Development',
                  description:
                    'Build responsive web applications using modern frameworks like React, Vue, or Angular',
                },
                {
                  title: 'Mobile Applications',
                  description:
                    'Create native or cross-platform mobile apps for Android and iOS',
                },
                {
                  title: 'Artificial Intelligence',
                  description:
                    'Develop AI/ML solutions using TensorFlow, PyTorch, or other ML frameworks',
                },
                {
                  title: 'Blockchain & Web3',
                  description:
                    'Build decentralized applications and smart contracts on various blockchain platforms',
                },
                {
                  title: 'IoT & Hardware',
                  description:
                    'Create innovative IoT solutions combining hardware and software',
                },
                {
                  title: 'Open Innovation',
                  description:
                    'Any other innovative solution that doesn\'t fit the above categories',
                },
              ].map((track, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {track.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{track.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              Judging Criteria
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { title: 'Innovation', percentage: '30%', description: 'Uniqueness and creativity' },
                { title: 'Impact', percentage: '25%', description: 'Social value and usefulness' },
                {
                  title: 'Implementation',
                  percentage: '25%',
                  description: 'Technical complexity',
                },
                {
                  title: 'Presentation',
                  percentage: '20%',
                  description: 'Clarity and delivery',
                },
              ].map((criteria, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg"
                >
                  <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                    {criteria.percentage}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                    {criteria.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{criteria.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-12 text-white">
            <div className="text-center mb-12">
              <Trophy className="h-16 w-16 mx-auto mb-4" />
              <h2 className="text-4xl font-bold mb-4">Prizes & Rewards</h2>
              <p className="text-xl text-white/90">Total prize pool worth 20,000+</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                {
                  place: '1st Place',
                  prize: 'Goodies',
                  extras: ['Trophy & Certificates','Mentorship Session', 'Swag Kit'],
                },
                {
                  place: '2nd Place',
                  prize: '₹',
                  extras: ['Trophy & Certificates','Mentorship Session', 'Swag Kit'],
                },
                {
                  place: '3rd Place',
                  prize: '₹',
                  extras: ['Trophy & Certificates', 'Mentorship Session', 'Swag Kit'],
                },
              ].map((winner, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border-2 border-white/20"
                >
                  <Award className="h-12 w-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{winner.place}</h3>
                  <div className="text-3xl font-bold mb-4">{winner.prize}</div>
                  <div className="space-y-2">
                    {winner.extras.map((extra, i) => (
                      <div key={i} className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        <span className="text-sm">{extra}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-lg">
                Plus special prizes for best projects in each track and best all-girls team!
              </p>
            </div>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
              Rules & Guidelines
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg max-w-4xl mx-auto">
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Team size: 2-4 members (Atleast one girl compulsory)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>All team members must be current college students</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Projects must be built from scratch during the hackathon</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Use of existing libraries and frameworks is allowed</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>All code must be pushed to a public GitHub repository</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                  <span>Projects must align with the hackathon theme</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
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
