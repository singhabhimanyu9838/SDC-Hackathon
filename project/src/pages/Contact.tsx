import { useState, FormEvent } from 'react';
import { Mail, Compass, MapPin, Github, Link, Send, Loader2, CheckCircle, Phone } from 'lucide-react'; 
import { apiRequest } from '../lib/api'; 
import { ContactMessage } from '../types';

// Access the VITE environment variable for the backend base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';


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
            Contact Us
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions about the hackathon? We're here to help!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-8 text-yellow-400">Contact Information</h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-600 rounded-lg">
                  <Mail className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100 mb-1">Email Support</h3>
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
                  <MapPin className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100 mb-1">Venue Location</h3>
                  <p className="text-gray-400">
                    College Campus<br />
                    Banda, U.P - 210201
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-amber-600 rounded-lg">
                  <Phone className="h-6 w-6 text-gray-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-100 mb-1">Phone</h3>
                  <a
                    href="tel:+91XXXXXXXXXX"
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    +91 XXXXX XXXXX
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6 text-yellow-400">Follow Our Community</h3>
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
                  href="https://www.linkedin.com/company/student-developer-club-rec-banda/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-blue-900 rounded-xl hover:scale-110 transition-transform"
                >
                  <Link className="h-6 w-6 text-blue-300" />
                </a>
                <a
                  href="https://www.instagram.com/student_developer_club/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-red-900 rounded-xl hover:scale-110 transition-transform"
                >
                  <Link className="h-6 w-6 text-red-300" /> {/* Using Link icon as Skull might not fit here */}
                </a>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl shadow-xl p-8 border border-amber-600">
            <h2 className="text-3xl font-bold mb-6 text-yellow-400">Send us a Message</h2>

            {success && (
              <div className="mb-6 p-4 bg-emerald-900/40 border border-emerald-600 rounded-lg flex items-center text-emerald-400">
                <CheckCircle className="h-5 w-5 mr-2" />
                Message sent successfully! We'll get back to you soon.
              </div>
            )}

            {error && (
              <div className="mb-6 p-4 bg-red-900/40 border border-red-600 rounded-lg text-red-400">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-yellow-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Your Full Name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-yellow-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-yellow-300 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-900 text-gray-100 focus:ring-yellow-500 focus:border-yellow-500 resize-none"
                  placeholder="Type your query here..."
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
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 bg-gray-800 rounded-2xl p-12 text-yellow-400 text-center border border-amber-800 border-2 shadow-inner">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-xl text-gray-300 mb-6">
            Contact us directly via phone or email for urgent queries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contact@sdc.club"
              className="inline-flex items-center justify-center px-8 py-3 bg-yellow-400 text-gray-950 rounded-xl font-semibold hover:bg-yellow-500 transition-colors"
            >
              <Mail className="mr-2 h-5 w-5" />
              Email Us
            </a>
            <a
              href="tel:+91XXXXXXXXXX"
              className="inline-flex items-center justify-center px-8 py-3 border-2 border-yellow-400 text-yellow-400 rounded-xl font-semibold hover:bg-yellow-400/10 transition-colors"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}