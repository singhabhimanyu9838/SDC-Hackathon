import { Link, useLocation } from 'react-router-dom';
import { Anchor, Menu, X, Skull, Compass } from 'lucide-react'; // Nautical icons
import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme(); // Get theme state and toggle function

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'The Crew (About)', path: '/about' },
    { name: 'The Hunt (Hackathon)', path: '/hackathon' },
    { name: 'Sign the Roll (Register)', path: '/register' },
    { name: 'The Tavern (Contact)', path: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed w-full z-50 bg-gray-900/90 backdrop-blur-sm border-b border-amber-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Skull className="h-8 w-8 text-yellow-400" /> {/* Skull icon for pirate theme */}
            <span className="text-xl font-serif font-bold text-yellow-400 tracking-wider">
              SDC Ship's Log
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'bg-amber-600 text-gray-900 font-bold' // Highlight in dark gold
                    : 'text-gray-200 hover:bg-gray-800 hover:text-yellow-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                // FIX: Light theme icon color (dark icon against light background)
                <Compass className="h-5 w-5 text-gray-800" /> 
              ) : (
                // FIX: Dark theme icon color (light icon against dark background)
                <Anchor className="h-5 w-5 text-yellow-400" /> 
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                // FIX: Mobile light theme icon
                <Compass className="h-5 w-5 text-gray-800" />
              ) : (
                <Anchor className="h-5 w-5 text-yellow-400" />
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-yellow-400" />
              ) : (
                <Menu className="h-6 w-6 text-yellow-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-900 border-t border-amber-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'bg-amber-600 text-gray-900 font-bold'
                    : 'text-gray-200 hover:bg-gray-800 hover:text-yellow-400'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}