import React, { useState, useEffect } from 'react';
import { useToast } from '../components/ui/Toast';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Textarea from '../components/ui/Textarea';
import Button from '../components/ui/Button';

const Bespoke = () => {
  const { addToast } = useToast();
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    itemType: 'heritage-custom',
    budget: 'budget-2',
    material: 'sterling-silver',
    details: '',
    callbackTime: 'morning'
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitLoading(true);

    // Simulate concierge submission
    setTimeout(() => {
      setIsSubmitLoading(false);
      setSubmitted(true);
      addToast('Your bespoke inquiry has been successfully registered with our atelier concierge.', 'success');
    }, 1500);
  };

  const itemTypeOptions = [
    { value: 'heritage-custom', label: 'Heritage Custom Design' },
    { value: 'signature-ring', label: 'Bespoke Signature Ring' },
    { value: 'bridal-necklace', label: 'Grand Bridal/Festive Necklace' },
    { value: 'earrings-cuffs', label: 'Custom Chandbalis & Ear Cuffs' },
    { value: 'royal-bracelet', label: 'Traditional Kada / Bracelet' }
  ];

  const budgetOptions = [
    { value: 'budget-1', label: '₹15,000 - ₹30,000' },
    { value: 'budget-2', label: '₹30,000 - ₹75,000' },
    { value: 'budget-3', label: '₹75,000 - ₹1,500,000' },
    { value: 'budget-4', label: '₹1,500,000+' }
  ];

  const materialOptions = [
    { value: 'sterling-silver', label: '925 Hallmarked Sterling Silver' },
    { value: 'gold-plated', label: '24K Gold-Plated Vermeil Silver' },
    { value: 'gemstone-inlay', label: 'Precious/Semi-Precious Gemstone Settings' },
    { value: 'antique-finish', label: 'Oxidized Antique Finish Silver' }
  ];

  const timeOptions = [
    { value: 'morning', label: 'Morning (10:00 AM - 1:00 PM)' },
    { value: 'afternoon', label: 'Afternoon (1:00 PM - 5:00 PM)' },
    { value: 'evening', label: 'Evening (5:00 PM - 8:00 PM)' }
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-white pt-32 pb-24 px-6 flex items-center justify-center">
        <div className="max-w-xl w-full border-[0.5px] border-[#C8A24A]/40 bg-white/50 backdrop-blur-sm p-10 sm:p-12 text-center relative animate-fade-in">
          <div className="absolute top-0 left-0 w-3 h-3 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>
          
          <div className="w-16 h-16 rounded-full border-[0.5px] border-[#C8A24A]/50 flex items-center justify-center text-[#C8A24A] mx-auto mb-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none">
              <path d="M12 2l1.5 7.5L21 11l-7.5 1.5L12 20l-1.5-7.5L3 11l7.5-1.5z"></path>
            </svg>
          </div>

          <h2 className="text-3xl text-[#6B1E2E] font-serif tracking-wide mb-6" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Inquiry <span className="italic text-[#C8A24A]">Registered</span>
          </h2>
          
          <p className="font-sans text-[13px] text-[#6B1E2E]/80 leading-relaxed mb-8 max-w-md mx-auto">
            A dedicated master concierge from the Aishka Atelier has been assigned to your commission request. We will review your styling details and contact you via phone or email during your preferred window.
          </p>

          <Button variant="primary" onClick={() => setSubmitted(false)}>
            Submit Another Request
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20 px-4 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto relative">
        
        {/* Title */}
        <div className="text-center mb-16">
          <span className="block font-sans text-[10px] uppercase tracking-[0.4em] font-semibold text-[#C8A24A] mb-3">
            Heritage Custom Design
          </span>
          <h1 className="text-4xl sm:text-5xl text-[#6B1E2E] font-serif tracking-wide" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
            Bespoke <span className="italic text-[#C8A24A]">Commissions</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Context / Explanation */}
          <div className="lg:col-span-5 space-y-10">
            <div className="border-l-[0.5px] border-[#C8A24A] pl-8 space-y-8">
              <h2 className="text-2xl text-[#6B1E2E] font-serif italic" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                "Crafting your dreams into sterling reality."
              </h2>
              <p className="font-sans text-sm text-[#6B1E2E]/80 leading-relaxed">
                Whether creating a modern family heirloom, modifying an existing signature silhouette, or capturing traditional bridal motifs for your special day, the Aishka bespoke service offers private consultations with our master artisans.
              </p>
            </div>

            {/* Design steps */}
            <div className="space-y-6 pt-4">
              <span className="block font-sans text-[10px] uppercase tracking-[0.25em] font-bold text-[#C8A24A]">
                The Commission Journey
              </span>
              
              <div className="grid grid-cols-1 gap-6">
                {[
                  { step: '01', title: 'Consultation & Sketching', desc: 'Discuss your aesthetic vision and stone options. Receive hand-sketched mockups from our design atelier.' },
                  { step: '02', title: 'Virtual Rendering', desc: 'Approve a 3D digital simulation of your custom jewelry to guarantee correct scale and fitting.' },
                  { step: '03', title: 'Handcrafted Assembly', desc: 'Our generational silver artisans select, mold, set, and hallmark the piece by hand over 100+ hours.' },
                  { step: '04', title: 'Atelier Delivery', desc: 'Fully insured, presentation-boxed delivery to your home, accompanied by verification certificates.' }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <span className="font-serif text-lg text-[#C8A24A] font-semibold tracking-wider">{item.step}</span>
                    <div>
                      <h4 className="font-serif text-sm font-semibold text-[#6B1E2E] tracking-wide mb-1">{item.title}</h4>
                      <p className="font-sans text-[11px] text-[#6B1E2E]/70 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="border-[0.5px] border-[#C8A24A]/40 bg-white/50 backdrop-blur-sm p-8 sm:p-10 relative">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>
              
              <h3 className="text-xl text-[#6B1E2E] font-serif tracking-wide mb-10 border-b-[0.5px] border-[#C8A24A]/20 pb-4" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                Concierge Commission Inquiry
              </h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Input
                    id="clientName"
                    label="Full Name"
                    required
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    placeholder="Your Name"
                    disabled={isSubmitLoading}
                  />
                  <Input
                    id="clientEmail"
                    type="email"
                    label="Email Address"
                    required
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    placeholder="name@example.com"
                    disabled={isSubmitLoading}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Input
                    id="clientPhone"
                    type="tel"
                    label="Phone Number"
                    required
                    value={form.phone}
                    onChange={(e) => setForm({...form, phone: e.target.value})}
                    placeholder="10-digit number"
                    disabled={isSubmitLoading}
                  />
                  <Select
                    id="itemType"
                    label="Creation Category"
                    options={itemTypeOptions}
                    value={form.itemType}
                    onChange={(e) => setForm({...form, itemType: e.target.value})}
                    disabled={isSubmitLoading}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <Select
                    id="budget"
                    label="Estimated Budget Range"
                    options={budgetOptions}
                    value={form.budget}
                    onChange={(e) => setForm({...form, budget: e.target.value})}
                    disabled={isSubmitLoading}
                  />
                  <Select
                    id="material"
                    label="Primary Metal & Accent"
                    options={materialOptions}
                    value={form.material}
                    onChange={(e) => setForm({...form, material: e.target.value})}
                    disabled={isSubmitLoading}
                  />
                </div>

                <Textarea
                  id="details"
                  label="Inspiration & Customization Details"
                  required
                  rows={4}
                  value={form.details}
                  onChange={(e) => setForm({...form, details: e.target.value})}
                  placeholder="Describe your design vision, sizing requirements, gemstone preferences, or date limits..."
                  disabled={isSubmitLoading}
                />

                <Select
                  id="callback"
                  label="Preferred Concierge Callback Window"
                  options={timeOptions}
                  value={form.callbackTime}
                  onChange={(e) => setForm({...form, callbackTime: e.target.value})}
                  disabled={isSubmitLoading}
                />

                <div className="pt-4">
                  <Button type="submit" isLoading={isSubmitLoading} className="w-full">
                    Register Commission Request
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Bespoke;
