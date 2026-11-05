import React, { useState } from 'react';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import { useToast } from './ui/Toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      addToast('Your bespoke inquiry has been successfully registered with our atelier concierge.', 'success');
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section className="w-full bg-white py-24 md:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 flex flex-col lg:flex-row gap-20 lg:gap-32">
        
        {/* Left Side: Contact Details */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center relative">
          {/* Subtle architectural bracket */}
          <div className="absolute -left-6 top-0 w-16 h-16 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A] opacity-50"></div>

          <span className="block font-sans text-[10px] uppercase tracking-[0.3em] font-semibold text-[#6B1E2E] mb-6">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#6B1E2E] font-serif tracking-tight leading-[1.1] mb-8">
            We are here to <br className="hidden md:block"/>
            <span className="italic text-[#C8A24A] font-light">assist you.</span>
          </h1>
          <p className="text-[#6B1E2E]/80 font-sans text-[15px] leading-[1.8] max-w-sm">
            Whether you have an inquiry regarding a bespoke commission, require assistance with sizing, or wish to track an existing order, our dedicated team is at your absolute service.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-[60%] flex items-center">
          <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-12 bg-white p-8 md:p-12 border-[0.5px] border-[#C8A24A]/30 relative rounded-lg">
            
            {/* Signature gold corner brackets on form container */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>

            <Input 
              id="name"
              label="Full Name"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="How shall we address you?"
              disabled={isSubmitting}
            />

            <Input 
              type="email"
              id="email"
              label="Email Address"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="Where should we send our reply?"
              disabled={isSubmitting}
            />

            <Textarea 
              id="message"
              label="Message"
              required
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="How can we assist you today?"
              disabled={isSubmitting}
            />

            <div className="pt-4">
              <Button 
                type="submit"
                isLoading={isSubmitting}
                className="w-full sm:w-auto"
              >
                Send Inquiry
              </Button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactForm;

