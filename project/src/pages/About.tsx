import { Code2, Users, Compass, Skull, Award, BookOpen, Cpu } from 'lucide-react'; // Original and Nautical Icons
import styles from '../styles/About.module.css'; // Importing styles for custom effects

export default function About() {
  return (
    
    <div className="min-h-screen bg-gray-950 text-gray-100 pt-20">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
                {/* Applied custom text gradient style */}
            <h1 className={`text-5xl font-serif font-bold mb-6 ${styles.textGradient}`}>
              About SDC
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Software Development Club - Where passion meets innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-yellow-400">
                Who We Are
              </h2>
              <p className="text-gray-300 mb-4 leading-relaxed">
                The Software Development Club is a student-driven community dedicated to fostering
                technical excellence and innovation. Founded by passionate developers, we bring
                together students who share a common goal: to learn, build, and create impactful
                technology solutions.
              </p>
              <p className="text-gray-300 mb-4 leading-relaxed">
                Our club serves as a platform for students to enhance their programming skills,
                collaborate on exciting projects, and prepare for successful careers in the tech
                industry. We believe in learning by doing and creating a supportive environment
                where everyone can grow.
              </p>
            </div>
            <div className="relative">
                {/* Mission card uses dark amber background */}
              <div className={`bg-amber-800 rounded-2xl p-8 text-gray-950 shadow-xl ${styles.missionCard}`}>
                <Compass className="h-16 w-16 mb-4 text-yellow-300" />
                <h3 className="text-2xl font-bold mb-4 text-yellow-300">Our Mission</h3>
                <p className="text-gray-900">
                  To empower students with the skills, knowledge, and resources needed to excel in
                  software development and make a positive impact through technology.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-yellow-400">
              What We Do
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: 'Workshops & Training',
                  description: 'Regular hands-on workshops on web development, mobile apps, AI/ML, and emerging technologies',
                  color: 'from-blue-800 to-cyan-700',
                },
                {
                  icon: Skull, // Nautical Icon Kept
                  title: 'Hackathons & Events',
                  description: 'Organize exciting hackathons, coding competitions, and tech talks to challenge and inspire',
                  color: 'from-red-800 to-yellow-600',
                },
                {
                  icon: Users,
                  title: 'Community Building',
                  description: 'Foster a collaborative environment where members can network, share ideas, and grow together',
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

          {/* Achievements Section */}
          <div className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-2xl p-12 text-gray-950 mb-16 shadow-xl">
            <h2 className="text-3xl font-bold text-center mb-12">Our Achievements</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Users, number: '500+', label: 'Active Members' },
                { icon: Code2, number: '50+', label: 'Projects Built' }, // Code2 icon kept
                { icon: Award, number: '15+', label: 'Events Organized' },
                { icon: Cpu, number: '100+', label: 'Workshops Conducted' }, // Cpu icon kept
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
              Join Our Community
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Whether you're a beginner or an experienced developer, there's a place for you in SDC.
              Let's build something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/sdc-club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-700 text-yellow-300 rounded-xl font-semibold hover:bg-gray-800 hover:shadow-lg transition-all border border-yellow-400"
              >
                <Code2 className="mr-2 h-5 w-5" />
                View Our Projects
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}