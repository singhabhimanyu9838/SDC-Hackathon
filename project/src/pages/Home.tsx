import { Link } from 'react-router-dom';
import { Calendar, Users, Trophy, Anchor, Compass, Skull, Lightbulb, Ship } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Setting the hackathon date to November 29, 2025, at 9:00 AM
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
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
                {/* Replaced blue/purple gradient with treasure gold text */}
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-yellow-400 tracking-wider animate-pulse">
              The Great Code Voyage
            </h1>
<h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-red-400 tracking-wider animate-pulse">
              HackFest2.0
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Charting the Digital Seas: A 24-Hour Hunt for the Ultimate Code Treasure.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                // Primary button: Dark gold/amber
                className="inline-flex items-center justify-center px-8 py-4 bg-amber-600 text-gray-950 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Sign the Roll Now
                <Skull className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/hackathon"
                // Secondary button: Bordered brass accent
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-xl font-semibold text-lg hover:bg-gray-800 transition-all duration-300"
              >
                Chart the Hunt
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Days at Sea', value: timeLeft.days },
              { label: 'Hourglasses', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div
                key={item.label}
                // Counter card style: Dark background, brass border, gold text
                className="bg-gray-800 rounded-2xl p-6 shadow-xl border-2 border-amber-800 transition-shadow"
              >
                <div className="text-4xl md:text-5xl font-serif font-bold text-yellow-400 mb-2">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <div className="text-gray-400 font-medium">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">
            Why Join the Fleet?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                title: 'Plunder the Riches',
                description: 'Win incredible bounties, including gold, gadgets, and chances for internship berths.',
                gradient: 'from-amber-400 to-orange-600',
              },
              {
                icon: Users,
                title: 'Forge the Crew',
                description: 'Network with seasoned swashbucklers, engineers, and digital map-makers from allied ships.',
                gradient: 'from-gray-600 to-gray-800',
              },
              {
                icon: Lightbulb,
                title: 'Master the Compass',
                description: 'Learn the forbidden arts of code from expert captains during tactical workshops.',
                gradient: 'from-purple-800 to-pink-900',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group bg-gray-800 rounded-2xl p-8 shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border border-gray-700"
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${item.gradient} mb-6`}>
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-yellow-300">
                  {item.title}
                </h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-yellow-300 text-center">
            <div className="p-6">
              <Calendar className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">24 Hours</div>
              <div className="text-gray-400">A full day's cruise</div>
            </div>
            <div className="p-6">
              <Users className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2"> Teams</div>
              <div className="text-gray-400">Seeking fortune</div>
            </div>
            <div className="p-6">
              <Trophy className="h-12 w-12 mx-auto mb-4" />
              <div className="text-4xl font-bold mb-2">Amazing Prizes</div>
              <div className="text-gray-400">In gold and artifacts</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 text-yellow-400">
            Ship's Log: Key Highlights
            </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Compass,
                title: 'Theme: Charting the New World',
                description: 'Discover and build innovative solutions focused on the great digital unknown.',
              },
              {
                icon: Skull,
                title: 'Captain Guidance',
                description: 'Expert mentors (Captains) will provide live guidance and survival tips throughout the voyage.',
              },
              {
                icon: Trophy,
                title: 'Multiple Flags (Tracks)',
                description: 'Compete across specialized tracks: Web, Mobile, AI, and Open Seas (Open Innovation).',
              },
              {
                icon: Lightbulb,
                title: 'Shipwright Workshops',
                description: 'Attend expert sessions on using the latest nautical tools (technologies) for maximum efficiency.',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-700"
              >
                <div className="flex-shrink-0">
                  <div className="p-3 bg-amber-600 rounded-lg">
                    <item.icon className="h-6 w-6 text-gray-950" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-yellow-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 border-t border-amber-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-yellow-400">
            Ready to Set Sail?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Don't miss this opportunity to claim your fame and fortune on the digital seas!
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-10 py-5 bg-amber-600 text-gray-950 rounded-xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Sign the Crew Roll
            <Ship className="ml-2 h-6 w-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}