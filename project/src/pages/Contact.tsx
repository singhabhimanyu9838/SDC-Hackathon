import { useState, FormEvent } from 'react';
import { Mail, Compass, MapPin, Github, Anchor, Skull, Send, Loader2, CheckCircle, Link } from 'lucide-react'; // Updated icons
import { apiRequest } from '../lib/api'; 
import { ContactMessage } from '../types';

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Endpoint: POST /api/contact
      const response = await apiRequest<ContactMessage>('/contact', 'POST', formData); 

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold mb-6 text-yellow-400">
            Report to the Captain
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions about the hunt? Send word to the officers!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">Ship's Contact Log</h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-600 rounded-lg">
                  <Mail className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100 mb-1">Pigeon Mail (Email)</h3>
                  <a
                    href="mailto:contact@sdc.club"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    contact@sdc.club
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-600 rounded-lg">
                  <Compass className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100 mb-1">Lookout Post (Venue)</h3>
                  <p className="text-gray-400">
                    Ship docked at: College Campus<br />
                    Port Royal, The Caribbean - 1692
                  </p>
                </div>
              </div>
                {/* Removed Phone as per typical pirate theme */}
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Follow the Fleet</h3>
              <div className="flex space-x-4">
                <a
                  href="https://github.com/sdc-club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-gray-700 rounded-xl hover:scale-110 transition-transform"
                >
                  <Github className="h-6 w-6 text-yellow-400" />
                </a>
                <a
                  href="https://linkedin.com/company/sdc-club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-blue-900 rounded-xl hover:scale-110 transition-transform"
                >
                  <Link className="h-6 w-6 text-blue-300" />
                </a>
                <a
                  href="https://instagram.com/sdc_club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-red-900 rounded-xl hover:scale-110 transition-transform"
                >
                  <Skull className="h-6 w-6 text-red-300" />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-amber-600">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">Send us a Dispatch</h2>

            {success && (
              <div className="mb-6 p-4 bg-emerald-900/40 border border-emerald-600 rounded-lg flex items-center text-emerald-400">
                <CheckCircle className="h-5 w-5 mr-2" />
                Message received by the Captain! We'll reply by the next tide.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-900/40 border border-red-600 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Pirate Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Captain Jack Sparrow"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="captain@blackpearl.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  The Dispatch (Your Message) *
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
                  placeholder="Report any mutiny or ask about the code treasure map..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-4 bg-amber-600 text-gray-950 rounded-xl font-semibold text-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Sending Dispatch...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Dispatch
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 bg-gray-800 rounded-2xl p-12 text-yellow-400 text-center border-brass border-2 shadow-inner">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-xl text-gray-300 mb-6">
            Send a flare if the code storm is too rough.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@sdc.club"
              className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 text-gray-950 rounded-xl font-semibold hover:bg-yellow-500 transition-colors"
            >
              <Mail className="mr-2 h-5 w-5" />
              Send Pigeon Mail
            </a>
            <a
              href="tel:+91XXXXXXXXXX"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-yellow-400 text-yellow-400 rounded-xl font-semibold hover:bg-yellow-400/10 transition-colors"
            >
              <Compass className="mr-2 h-5 w-5" />
              Find Our Position
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}