import { Link } from 'react-router-dom';
import { Calendar, Users, Trophy, ArrowRight, Zap, Target, Lightbulb } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const hackathonDate = new Date('2025-11-29T09:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = hackathonDate - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
              SDC Hackathon 2025
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Join us for an epic 24-hour coding marathon where innovation meets creativity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Register Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/hackathon"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 rounded-xl font-semibold text-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why Participate?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: 'Amazing Prizes',
                description: 'Win exciting prizes worth ₹1,00,000+ including cash rewards, gadgets, and internship opportunities',
                gradient: 'from-yellow-400 to-orange-500',
              },
              {
                icon: Users,
                title: 'Network & Collaborate',
                description: 'Connect with like-minded developers, designers, and entrepreneurs from different colleges',
                gradient: 'from-blue-400 to-cyan-500',
              },
              {
                icon: Lightbulb,
                title: 'Learn & Grow',
                description: 'Get mentored by industry experts and learn cutting-edge technologies through workshops',
                gradient: 'from-purple-400 to-pink-500',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${item.gradient} mb-6`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-white text-center">
            <div className="p-6">
              <Calendar className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">24 Hours</div>
              <div className="text-blue-100">Non-stop coding</div>
            </div>
            <div className="p-6">
              <Users className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">500+ Teams</div>
              <div className="text-blue-100">From across the nation</div>
            </div>
            <div className="p-6">
              <Trophy className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">₹1L+ Prizes</div>
              <div className="text-blue-100">To be won</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Hackathon Highlights
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Target,
                title: 'Theme: AI for Social Good',
                description: 'Build innovative AI-powered solutions that address real-world social challenges and make a positive impact on society',
              },
              {
                icon: Zap,
                title: 'Live Mentorship',
                description: 'Get guidance from industry professionals, startup founders, and experienced developers throughout the event',
              },
              {
                icon: Trophy,
                title: 'Multiple Tracks',
                description: 'Compete in Web Development, Mobile Apps, AI/ML, Blockchain, and Open Innovation categories',
              },
              {
                icon: Lightbulb,
                title: 'Workshops & Sessions',
                description: 'Attend exclusive workshops on emerging technologies, product development, and pitch presentation skills',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex-shrink-0">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            Ready to Innovate?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Don't miss this opportunity to showcase your skills, learn from experts, and win amazing prizes!
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Register Your Team Now
            <ArrowRight className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
