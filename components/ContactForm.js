'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mvoegwbg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: 'New Portfolio Contact'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      className="space-y-6 max-w-2xl mx-auto relative z-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
    >
      <div>
        <label className="block mb-2 text-white">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-white text-white placeholder-gray-300"
          placeholder="Your name"
            />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-2 text-white">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-white text-white placeholder-gray-300"
          placeholder="Your Email"
          />
        </div>
        <div>
          <label className="block mb-2 text-white">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-white text-white placeholder-gray-300"
          placeholder="Phone number (ex+33699665522)"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-white">Your Project/Mission</label>
        <textarea
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-white text-white placeholder-gray-300"
          placeholder="Describe your project or mission"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-4 bg-white text-indigo-600 font-medium rounded-full hover:bg-gray-100 transition-all disabled:opacity-50"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {submitStatus === 'success' && (
        <p className="text-green-400 mt-4">Message sent successfully!</p>
      )}
      {submitStatus === 'error' && (
        <p className="text-red-400 mt-4">Failed to send. Please try again.</p>
      )}
    </motion.form>
  );
}