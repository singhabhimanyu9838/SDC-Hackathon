import { Code2, Users, Rocket, Award, BookOpen, Cpu } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black pt-20">
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About SDC
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Software Development Club - Where passion meets innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Who We Are
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                The Software Development Club is a student-driven community dedicated to fostering
                technical excellence and innovation. Founded by passionate developers, we bring
                together students who share a common goal: to learn, build, and create impactful
                technology solutions.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                Our club serves as a platform for students to enhance their programming skills,
                collaborate on exciting projects, and prepare for successful careers in the tech
                industry. We believe in learning by doing and creating a supportive environment
                where everyone can grow.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <Code2 className="h-16 w-16 mb-4" />
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-blue-100">
                  To empower students with the skills, knowledge, and resources needed to excel in
                  software development and make a positive impact through technology.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
              What We Do
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: BookOpen,
                  title: 'Workshops & Training',
                  description:
                    'Regular hands-on workshops on web development, mobile apps, AI/ML, and emerging technologies',
                  color: 'from-blue-500 to-cyan-500',
                },
                {
                  icon: Rocket,
                  title: 'Hackathons & Events',
                  description:
                    'Organize exciting hackathons, coding competitions, and tech talks to challenge and inspire',
                  color: 'from-purple-500 to-pink-500',
                },
                {
                  icon: Users,
                  title: 'Community Building',
                  description:
                    'Foster a collaborative environment where members can network, share ideas, and grow together',
                  color: 'from-orange-500 to-red-500',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${item.color} mb-4`}>
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-white mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Our Achievements</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: Users, number: '500+', label: 'Active Members' },
                { icon: Rocket, number: '50+', label: 'Projects Built' },
                { icon: Award, number: '15+', label: 'Events Organized' },
                { icon: Cpu, number: '100+', label: 'Workshops Conducted' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-12 w-12 mx-auto mb-4 opacity-90" />
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Join Our Community
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Whether you're a beginner or an experienced developer, there's a place for you in SDC.
              Let's build something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/sdc-club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:shadow-lg transition-all"
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
