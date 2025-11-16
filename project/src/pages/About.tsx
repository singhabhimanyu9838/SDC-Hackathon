import { Code2, Users, Compass, Award, BookOpen, Skull } from 'lucide-react'; // Updated icons
import styles from '../styles/About.module.css'; // Importing styles for custom effects

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pt-20">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
                {/* Applied custom text gradient style for the main title */}
            <h1 className={`text-5xl font-serif font-bold mb-6 ${styles.textGradient}`}>
              The Crew's Quarters
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Unveiling the Software Development Crew of the Black Pearl.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-yellow-400">
                Who We Are
              </h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                We are the navigators of code, dedicated to charting new waters in technology. 
                Our crew is united by the quest for technical excellence and the treasure of innovation.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Our tavern—or club—serves as the home base where students hone their programming
                swords, collaborate on exciting voyages (projects), and prepare to plunder the tech
                industry's bounty. We believe in learning by sailing the high seas of code!
              </p>
            </div>
            <div className="relative">
                {/* Applied custom missionCard style */}
              <div className={`bg-amber-800 rounded-2xl p-8 text-gray-950 shadow-xl ${styles.missionCard}`}>
                <Compass className="h-16 w-16 mb-4 text-yellow-300" />
                <h3 className="text-2xl font-bold mb-4 text-yellow-300">Our Mission (The Code Map)</h3>
                <p className="text-gray-900">
                  To equip students with the finest tools (skills) and the keenest maps (knowledge) 
                    needed to conquer software development challenges and leave their mark upon the digital seas.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">
              Our Voyages (What We Do)
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: 'Chart Reading (Workshops)',
                  description: 'Hands-on training for navigation, combat, and resource gathering in web, mobile, and AI/ML.',
                  color: 'from-blue-800 to-cyan-700',
                },
                {
                  icon: Skull,
                  title: 'Treasure Hunts (Hackathons)',
                  description: 'Organized raids and coding challenges to secure valuable digital bounty and test our mettle.',
                  color: 'from-red-800 to-yellow-600',
                },
                {
                  icon: Users,
                  title: 'Swashbuckler Mentorship',
                  description: 'A collaborative spirit where old salts guide new recruits in mastering the coding sword and diplomacy.',
                  color: 'from-gray-700 to-gray-500',
                },
              ].map((item, index) => (
                <div
                  key={index}
                   
                  className={`bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${styles.sectionCard}`}
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${item.color} mb-4`}>
                   <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-yellow-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl p-12 text-gray-950 mb-16 shadow-xl">
            <h2 className="text-3xl font-bold text-center mb-12">Treasures Plundered</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Users, number: '500+', label: 'Active Crew Members' },
                { icon: Code2, number: '50+', label: 'Digital Artifacts Secured' },
                { icon: Award, number: '15+', label: 'Raids Successfully Executed' },
                { icon: Compass, number: '100+', label: 'Charts Studied (Workshops)' },
                   ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-12 w-12 mx-auto mb-4 opacity-90 text-gray-900" />
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-amber-800">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">
              Enlist for the Next Voyage
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Whether you're a landlubber or a master sailor, there's a place for you in our crew. 
              Let's sail the digital seas together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/sdc-club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-700 text-yellow-300 rounded-xl font-semibold hover:bg-gray-800 hover:shadow-lg transition-all border border-yellow-400"
              >
                <Code2 className="mr-2 h-5 w-5" />
                View the Ship's Portfolio
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}