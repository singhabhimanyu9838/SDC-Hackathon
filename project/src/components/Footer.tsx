import { Code2, Github, Link, Skull, Mail, Compass } from 'lucide-react'; // Updated icons
import { Link as RouterLink } from 'react-router-dom'; // Renaming Link to RouterLink to avoid conflict

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-amber-800 text-gray-300 mt-12 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4 text-yellow-400">
              <Skull className="h-8 w-8" />
              <span className="text-2xl font-serif font-bold">SDC Logbook</span>
            </div>
            <p className="text-gray-400 mb-4">
              Captain's decree: Empowering our crew to chart, build, and plunder the digital seas for technical treasure.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/sdc-club"
                target="_blank"
                rel="noopener noreferrer"
                // Thematic social icons
                className="p-2 bg-gray-800 rounded-lg hover:bg-amber-600 hover:text-gray-950 transition-colors text-yellow-400"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/company/sdc-club"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-amber-600 hover:text-gray-950 transition-colors text-yellow-400"
              >
                <Link className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/sdc_club"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-lg hover:bg-amber-600 hover:text-gray-950 transition-colors text-yellow-400"
              >
                <Skull className="h-5 w-5" />
              </a>
              <a
                href="mailto:contact@sdc.club"
                className="p-2 bg-gray-800 rounded-lg hover:bg-amber-600 hover:text-gray-950 transition-colors text-yellow-400"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-400">Ship's Maps</h3>
            <ul className="space-y-2">
              <li>
                <RouterLink to="/" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Home Port
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/about" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  The Crew
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/hackathon" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  The Hunt
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/register" className="text-gray-400 hover:text-yellow-400 transition-colors">
                  Sign the Roll
                </RouterLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-yellow-400">Dispatch</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Pigeon Mail: contact@sdc.club</li>
              <li>Ship's Horn: +91 XXXXX XXXXX</li>
              <li>Home Port: Your College Name</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-amber-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} SDC Crew. Plundering the Digital Seas since Day One.</p>
        </div>
      </div>
    </footer>
  );
}