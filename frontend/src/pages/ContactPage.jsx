import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const ContactPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    orderId: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Contact Us | Aishka';

    const fetchContactMetadata = async () => {
      try {
        const response = await api.get('/content/section/top_bar');
        if (response?.data?.success && response.data?.data?.content) {
          setMetadata(response.data.data.content);
        }
      } catch (err) {
        console.error('Contact page failed to load metadata:', err.message);
      }
    };
    fetchContactMetadata();
  }, []);

  const handleChange = (key) => (e) => {
    setForm(f => ({ ...f, [key]: e.target.value }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Please enter your name.';
    if (!form.email.trim()) e.email = 'Please enter your email.';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email.';
    if (!form.subject.trim()) e.subject = 'Please enter a subject.';
    if (form.message.trim().length < 10) e.message = 'Please write at least 10 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    setSubmitError('');
    try {
      await api.post('/contact', {
        name: form.name,
        email: form.email,
        phone: form.phone,
        orderId: form.orderId,
        subject: form.subject,
        message: form.message
      });
      setIsSuccess(true);
      setForm({ name: '', email: '', phone: '', orderId: '', subject: '', message: '' });
    } catch (err) {
      setSubmitError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white pb-20">
      {/* Breadcrumb banner */}
      <div className="bg-[#FAF9F6] border-b border-gray-100 py-4 px-6 md:px-12 lg:px-16 text-[11px] font-sans text-gray-500 uppercase tracking-widest">
        <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
        <span className="mx-2">|</span>
        <span className="text-gray-800 font-semibold">Contact Us</span>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-2 space-y-8">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold font-sans text-[#2A2A2A] tracking-wide">
                Contact Us
              </h1>
              <p className="text-sm text-gray-600 leading-relaxed font-sans">
                We're happy to help with anything: order questions, product details, sizing help, or bulk/gifting enquiries.
              </p>
            </div>

            {isSuccess ? (
              <div className="p-8 border border-green-200 bg-green-50/50 rounded-sm space-y-3">
                <h3 className="font-sans font-bold text-green-800 text-lg">Thank You!</h3>
                <p className="text-sm text-green-700 font-sans">
                  Your message has been sent successfully. We will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-2 text-xs font-bold text-[#7B1D2C] underline hover:text-[#681824]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <input
                      type="text"
                      placeholder="Name"
                      value={form.name}
                      onChange={handleChange('name')}
                      disabled={isSubmitting}
                      className="w-full bg-[#FCFAF7] border border-[#E0D8CE]/50 focus:border-[#C8893B] focus:outline-none p-3.5 text-sm rounded-sm font-sans placeholder-gray-400"
                    />
                    {errors.name && <span className="text-xs text-red-600 font-sans">{errors.name}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <input
                      type="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange('email')}
                      disabled={isSubmitting}
                      className="w-full bg-[#FCFAF7] border border-[#E0D8CE]/50 focus:border-[#C8893B] focus:outline-none p-3.5 text-sm rounded-sm font-sans placeholder-gray-400"
                    />
                    {errors.email && <span className="text-xs text-red-600 font-sans">{errors.email}</span>}
                  </div>
                </div>

                {/* Phone & Order ID Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={form.phone}
                      onChange={handleChange('phone')}
                      disabled={isSubmitting}
                      className="w-full bg-[#FCFAF7] border border-[#E0D8CE]/50 focus:border-[#C8893B] focus:outline-none p-3.5 text-sm rounded-sm font-sans placeholder-gray-400"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <input
                      type="text"
                      placeholder="Order ID (Optional)"
                      value={form.orderId}
                      onChange={handleChange('orderId')}
                      disabled={isSubmitting}
                      className="w-full bg-[#FCFAF7] border border-[#E0D8CE]/50 focus:border-[#C8893B] focus:outline-none p-3.5 text-sm rounded-sm font-sans placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={handleChange('subject')}
                    disabled={isSubmitting}
                    className="w-full bg-[#FCFAF7] border border-[#E0D8CE]/50 focus:border-[#C8893B] focus:outline-none p-3.5 text-sm rounded-sm font-sans placeholder-gray-400"
                  />
                  {errors.subject && <span className="text-xs text-red-600 font-sans">{errors.subject}</span>}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <textarea
                    placeholder="Message"
                    rows={8}
                    value={form.message}
                    onChange={handleChange('message')}
                    disabled={isSubmitting}
                    className="w-full bg-[#FCFAF7] border border-[#E0D8CE]/50 focus:border-[#C8893B] focus:outline-none p-3.5 text-sm rounded-sm font-sans placeholder-gray-400 resize-y min-h-[150px]"
                  />
                  {errors.message && <span className="text-xs text-red-600 font-sans">{errors.message}</span>}
                </div>

                {/* Submit button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 bg-[#7B1D2C] hover:bg-[#681824] text-white font-sans text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND'}
                  </button>
                  {submitError && <p className="text-sm text-red-600 font-sans mt-2">{submitError}</p>}
                </div>

              </form>
            )}
          </div>

          {/* Right: Sidebar */}
          <div className="bg-[#F8F9FA] p-8 rounded-sm space-y-8 font-sans border border-gray-100">
            {/* Address */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                ADDRESS:
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Office No. 2, Nidhay Complex,<br />
                Pushkardham Road, Opp. Pushkardham Society,<br />
                University Road, Rajkot, Gujarat - 360005
              </p>
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                PHONE / WHATSAPP:
              </h3>
              <p className="text-sm text-gray-600">
                +91 9106702473
              </p>
            </div>

            {/* Email */}
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                EMAIL:
              </h3>
              <a href="mailto:jewelsamrat@outlook.com" className="text-sm text-gray-600 hover:text-[#7B1D2C] transition-colors">
                jewelsamrat@outlook.com
              </a>
            </div>

            <div className="w-full h-px bg-gray-200" />

            {/* Opening Hours */}
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                WORKING HOURS
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Monday – Saturday: 10:00 AM – 7:00 PM (IST)<br />
                Sunday: Closed
              </p>
            </div>

            <div className="w-full h-px bg-gray-200" />

            {/* Stay Connected */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                STAY CONNECTED
              </h3>
              <div className="flex items-center space-x-4 text-gray-700">
                <a href="#" className="hover:text-[#7B1D2C] transition-colors">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                </a>
                <a href="#" className="hover:text-[#7B1D2C] transition-colors">
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
