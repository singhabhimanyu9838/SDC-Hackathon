import { Link } from 'react-router-dom';
import {
  Calendar, Users, Trophy, Anchor, Compass, Skull, Lightbulb,
  Ship, MapPin, Linkedin
} from 'lucide-react';
import { useEffect, useState } from 'react';

// --- Team Data (Uniform Image Paths) ---
const teamMembers = [
  { name: 'Anas Khan', role: 'Graphic Designer Lead', img: "team/coordinators/Anas.png", linkedin: 'https://www.linkedin.com/in/anaskhan02/' },
  { name: 'Nitin Kumar Singh', role: 'CP Lead', img: 'team/coordinators/nitin.jpg', linkedin: 'https://www.linkedin.com/in/nitin-kumar-singh-a29464205/' },
  { name: 'Anivesh Tyagi', role: 'Data science Lead', img: 'team/coordinators/Anivesh.png', linkedin: 'https://www.linkedin.com/in/aniveshtyagi/' },
  { name: 'Sejal Pal', role: 'Web Dev Lead', img: 'team/coordinators/Sejal.png', linkedin: 'https://www.linkedin.com/in/sejalpal/' },
  { name: 'Abhimanyu Singh', role: 'SDC Website Manager', img: 'team/coordinators/Abhimanyu.png', linkedin: 'https://www.linkedin.com/in/abhimanyu-singh-95a55s/' },
  { name: 'Sakshi Singh', role: 'AI/ML Lead', img: 'team/coordinators/Sakshi.png', linkedin: 'https://www.linkedin.com/in/sakshi-singh-4883922a5/' },
];

const mentors = [
  { name: 'Jiwanshu Kumar', role: 'DSA Head', img: 'team/jiwanshu.jpg', linkedin: 'https://www.linkedin.com/in/jiwanshu-%E2%80%8E-9b848725a/' },
  { name: 'Nihal Jaiswal', role: 'Machine Learning Head', img: 'team/nihal.jpg', linkedin: 'https://www.linkedin.com/in/nihal-jaiswal-908b52257/' },
  { name: 'Prajjwal Srivastava', role: 'DSA Head', img: 'team/prajwal.jpg', linkedin: 'https://www.linkedin.com/in/prajjwalsri/' },
  { name: 'Deepak Kanujiya', role: 'Social Media & Marketing Head', img: 'team/deepak.jpg', linkedin: 'https://www.linkedin.com/in/deepak-kanoujiya-927b4b257/' },
  { name: 'Anchal Chaurasiya', role: 'Website Manager', img: 'team/anchal.jpg', linkedin: 'https://www.linkedin.com/in/anchal-chaurasiya-693b53257/' },
  { name: 'Aman Sharma', role: 'Graphics Designer Head', img: 'team/aman.jpg', linkedin: 'https://www.linkedin.com/in/aman-sharma-a8bb00257/' },
  { name: 'Hrishabh Gupta', role: 'CP Head(java)', img: 'team/Hrishabh.jpg', linkedin: 'https://www.linkedin.com/in/hrishabh-gupta-50442821a/' },
  { name: 'Aditya Singh', role: 'Web developer Head', img: 'team/aditya.jpg', linkedin: 'https://www.linkedin.com/in/aditya-singh-03bb48257/' },
];

// ----------------------------------------------
// Team Card Component (Helper)
// ----------------------------------------------
interface MemberProps {
  member: {
    name: string;
    role: string;
    img: string;
    linkedin: string;
  }
}

// const TeamCard: React.FC<MemberProps> = ({ member }) => (
//   <div className="p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-amber-600/50 dark:border-amber-800/50 text-center hover:shadow-amber-500/20 transition-shadow">
//     {/* Uniform asset path; display placeholder if image fails */}
//     <img
//       src={`/assets/img/${member.img}`}
//       alt={member.name}
//       onError={(e) => {
//         e.currentTarget.onerror = null;
//         e.currentTarget.src = `https://placehold.co/150x150/573215/FFF?text=${member.name.split(' ').map(n => n[0]).join('')}`;
//       }}
//       className="w-full h-49 object-cover rounded-lg mb-4 mx-auto border-2 border-yellow-400"
//     />
//     <h2 className="text-xl font-bold text-gray-900 dark:text-yellow-300">{member.name}</h2>
//     <h5 className="text-sm text-amber-600 mb-3">{member.role}</h5>
//     <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
//       className="text-gray-400 hover:text-yellow-400 transition-colors flex justify-center items-center gap-1">
//       <Linkedin size={18} />
//     </a>
//   </div>
// );

const TeamCard: React.FC<MemberProps> = ({ member }) => (
    <div className="p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-amber-600/50 dark:border-amber-800/50 text-center hover:shadow-amber-500/20 transition-shadow">
        <img 
            // 🔑 FIX: Changed h-48 to h-60, and object-cover to object-contain 
            src={`/assets/img/${member.img}`} 
            alt={member.name} 
            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = `https://placehold.co/150x150/573215/FFF?text=${member.name.split(' ').map(n => n[0]).join('')}` }} 
            className="w-full h-60 object-contain object-position-top rounded-lg mb-4 mx-auto border-2 border-yellow-400" 
        />
        <h2 className="text-xl font-bold text-gray-900 dark:text-yellow-300">{member.name}</h2>
        <h5 className="text-sm text-amber-600 mb-3">{member.role}</h5>
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
      className="text-gray-400 hover:text-yellow-400 transition-colors flex justify-center items-center gap-1">
      <Linkedin size={18} />
      </a>
    </div>
);

// ----------------------------------------------
// Prize Card Component (Helper)
// ----------------------------------------------
interface PrizeProps {
  place: string;
  prize: string;
  image: string;
  description: string;
}

const PrizeCard: React.FC<PrizeProps> = ({ place, prize, image, description }) => (
  <div className="prize-card p-6 bg-white dark:bg-gray-700 rounded-xl shadow-2xl border-4 border-amber-600 text-center">
    <img src={image} alt={place} className="w-20 h-20 mx-auto mb-4" />
    <h4 className="text-2xl font-bold text-gray-900 dark:text-yellow-300 mb-2">{place}</h4>
    <p className="text-xl text-amber-500 mb-4">{prize}</p>
    <p className="text-gray-600 dark:text-gray-400">{description}</p>
  </div>
);

// ----------------------------------------------
// Home Component
// ----------------------------------------------
export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    over: false
  });

  useEffect(() => {
    const hackathonDate = new Date('2025-12-10T09:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = hackathonDate - now;

      if (distance < 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          over: true,
        });
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        over: false,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">

      {/* 🏴‍☠️ 1. BANNER/HERO SECTION */}
      <section id="home-section" className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center">
          <video autoPlay muted loop id="background-video" className="w-full h-full object-cover">
            <source src="../public/assets/videos/pirate_back.mov" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gray-950 opacity-60"></div>
        </div>

        <div className="relative z-10 pt-24 pb-16 px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center">
          {/* <img src="/assets/img/new_assets/WhatsApp_Image_2025-04-03_at_22.32.21_0297acc1-removebg-preview.png" alt="Hackfest Logo" className="w-56 mb-8 mt-12 md:mt-0" /> */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-serif font-bold mb-4 
text-amber-600 dark:text-yellow-400 tracking-wide drop-shadow-xl">
  HACKFEST2.0
</h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto text-center border-b border-amber-800 pb-4">
            Rajkiya Engineering College, Banda | 15-16 December 2025
          </p>
          
          {/* Timer Section */}
          <div className="mt-8 grid grid-cols-4 gap-4 max-w-xl mx-auto">
            {timeLeft.over ? (
              <div className="col-span-4 text-2xl font-bold text-yellow-400 text-center">Hackathon Started!</div>
            ) : (
              <>
                {[
                  { label: 'Days', value: timeLeft.days },
                  { label: 'Hours', value: timeLeft.hours },
                  { label: 'Mins', value: timeLeft.minutes },
                  { label: 'Secs', value: timeLeft.seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white dark:bg-gray-800 rounded-2xl p-3 md:p-4 shadow-xl border-2 border-amber-300 dark:border-amber-800 transition-shadow text-center"
                  >
                    <div className="text-3xl md:text-4xl font-serif font-bold text-amber-600 dark:text-yellow-400">
                      {item.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400 font-medium text-sm">{item.label}</div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="home_button-container mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register"
                  className="inline-flex items-center justify-center px-10 py-3 bg-amber-600 text-gray-950 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <Skull className="mr-2 h-5 w-5" /> Sign the Roll Now
                </Link>
            <Link to="/hackathon"
                  className="inline-flex items-center justify-center px-10 py-3 bg-amber-600 text-gray-950 rounded-xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  <Skull className="mr-2 h-5 w-5" /> Know more
                </Link>
          </div>
        </div>
      </section>

      {/* 🏴‍☠️ 2. ABOUT THE VOYAGE SECTION */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-amber-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-amber-600 dark:text-yellow-400">About the Hackfest2.0</h3>
          </div>
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Text Content */}
            <div className="lg:col-span-7">
              <div className="space-y-4 text-gray-700 dark:text-gray-300">
                <p>This hackathon, **Hackfest 2.0**, is the next chapter in our exciting legacy, bringing together coders, innovators, designers, and tech enthusiasts. It’s a celebration of expertise and creativity that guarantees an unparalleled learning and building experience.</p>
                <p>The event is a mega-fest where hackers race against time for intensive, hands-on development. This edition promises to redefine the boundaries of what is possible in coding and innovation, encouraging participants to turn their ideas into reality.</p>
                <p><b>Venue:</b> - Rajkiya Engineering College, Banda</p>
                <p><b>Dates:</b> - 25-26 November 2025</p>
              </div>
            </div>
            {/* Ship Image */}
            <div className="lg:col-span-5 flex justify-center">
              <img src="/assets/img/new_assets/ship.png" alt="Pirate Ship"
                className="w-full max-w-md h-auto border-2 border-amber-600 rounded-lg shadow-2xl"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/400x300/573215/FFF?text=Pirate+Ship'; }}
              />
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-16 py-8 bg-white dark:bg-gray-800 rounded-xl border border-amber-600 dark:border-amber-800 shadow-lg">
            <div className="grid grid-cols-3 text-center text-amber-600 dark:text-yellow-300">
              <div className="p-4">
                <Anchor className="w-12 h-12 mx-auto mb-2 text-amber-600 dark:text-yellow-400" />
                <div className="text-3xl font-bold">100+</div>
                <h5 className="text-gray-600 dark:text-gray-400">Registrations</h5>
              </div>
              <div className="p-4">
                <Users className="w-12 h-12 mx-auto mb-2 text-amber-600 dark:text-yellow-400" />
                <div className="text-3xl font-bold">125+</div>
                <h5 className="text-gray-600 dark:text-gray-400">Attendees</h5>
              </div>
              <div className="p-4">
                <MapPin className="w-12 h-12 mx-auto mb-2 text-amber-600 dark:text-yellow-400" />
                <div className="text-3xl font-bold">1</div>
                <h5 className="text-gray-600 dark:text-gray-400">Port of Call (College)</h5>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🏴‍☠️ 3. TEAM/MENTOR SECTION */}
     <section id="teams" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-amber-600 dark:text-yellow-400">Meet The Crew</h3>
            </div>
            
            <h4 className="text-2xl font-bold text-yellow-800 dark:text-yellow-300 mb-6 text-center">Team Officers</h4>
            <div className="grid md:grid-cols-3 gap-8 justify-center mb-12">
                {teamMembers.map((member, index) => (
                    <TeamCard key={index} member={member} />
                ))}
            </div>

            <h4 className="text-2xl font-bold text-yellow-800 dark:text-yellow-300 mb-6 text-center">Master Mariners (Mentors)</h4>
            <div className="grid md:grid-cols-4 gap-8 justify-center">
                {mentors.map((member, index) => (
                    <TeamCard key={index} member={member} />
                ))}
            </div>

        </div>
      </section>

      {/* 🏴‍☠️ 4. SPONSORS & PRIZES SECTION */}
      <section id="prizes" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 dark:bg-gray-900 border-t border-amber-800">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-4xl font-bold text-center text-yellow-400 mb-12">Prizes and Bounty</h3>
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <PrizeCard place="First Flagship" prize="Gold Doubloons" image="/assets/img/first.png" description="The grand prize for the winning crew." />
            <PrizeCard place="Second Galleon" prize="Silver Pieces" image="/assets/img/second.png" description="A worthy prize for the runner-up crew." />
            <PrizeCard place="Third Frigate" prize="Bronze Artifacts" image="/assets/img/third.png" description="Solid recognition for the third place team." />
          </div>

          <div className="text-center mt-16">
            <h3 className="text-4xl font-bold text-yellow-400 mb-6">Our Allies (Sponsors)</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Thanks to the fleets who provisioned our voyage and contributed to the prize bounty.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 bg-gray-800 p-8 rounded-xl border border-amber-800">
              <img src="/assets/img/sponsors/6.0/MongoDB.svg" alt="MongoDB" className="h-10 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/assets/img/sponsors/6.0/polygon.png" alt="Polygon" className="h-10 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/assets/img/sponsors/6.0/Githubm.svg" alt="Github" className="h-10 opacity-70 hover:opacity-100 transition-opacity" />
              <img src="/assets/img/6.0/Auth0.svg" alt="Auth0" className="h-10 opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
