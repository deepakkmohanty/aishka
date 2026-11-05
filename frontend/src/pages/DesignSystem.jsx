import React, { useState } from 'react';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Textarea from '../components/ui/Textarea';
import Select from '../components/ui/Select';
import Modal from '../components/ui/Modal';
import Spinner from '../components/ui/Spinner';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import { useToast } from '../components/ui/Toast';

const DesignSystem = () => {
  const { addToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLargeOpen, setIsModalLargeOpen] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [globalDisabled, setGlobalDisabled] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  
  // Form input state
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');

  const [skeletonLoading, setSkeletonLoading] = useState(true);

  const selectOptions = [
    { value: 'sterling-silver', label: '925 Sterling Silver' },
    { value: 'gold-plated', label: '18K Gold Plated' },
    { value: 'rose-gold', label: 'Rose Gold Atelier' },
    { value: 'bespoke', label: 'Bespoke Diamond commission' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#6B1E2E] py-16 px-6 md:px-12 lg:px-24">
      {/* Header Accent Frame */}
      <div className="max-w-[1300px] mx-auto border-[0.5px] border-[#C8A24A]/40 bg-white p-8 md:p-12 mb-16 relative">
        <div className="absolute top-0 left-0 w-6 h-6 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>

        <span className="block font-sans text-[10px] uppercase tracking-[0.4em] font-bold text-[#C8A24A] mb-4 text-center lg:text-left">
          Production Design System
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#6B1E2E] font-serif tracking-wide leading-tight mb-4 text-center lg:text-left" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
          Aishka <span className="italic text-[#C8A24A]">Atelier Primitives</span>
        </h1>
        <p className="text-[#6B1E2E]/80 font-sans text-sm tracking-wide leading-relaxed max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          Welcome to the UI sandbox. Here you can inspect, configure, and stress-test our production-grade UI components for accessibility, responsive alignments, micro-interactions, and state transitions.
        </p>

        {/* Global Sandbox Controllers */}
        <div className="mt-8 pt-8 border-t border-[#C8A24A]/20 flex flex-wrap gap-6 items-center justify-center lg:justify-start font-sans text-xs uppercase tracking-wider font-semibold">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={globalLoading} 
              onChange={() => setGlobalLoading(!globalLoading)} 
              className="accent-[#6B1E2E] cursor-pointer"
            />
            Force Buttons Loading
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={globalDisabled} 
              onChange={() => setGlobalDisabled(!globalDisabled)}
              className="accent-[#6B1E2E] cursor-pointer"
            />
            Force Disabled
          </label>
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input 
              type="checkbox" 
              checked={hasErrors} 
              onChange={() => setHasErrors(!hasErrors)} 
              className="accent-[#6B1E2E] cursor-pointer"
            />
            Simulate Form Errors
          </label>
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side: Sandbox Sections */}
        <div className="lg:col-span-8 space-y-20">
          
          {/* Section: Buttons */}
          <section className="border-b border-[#E8C766]/30 pb-16">
            <h2 className="text-3xl font-serif text-[#6B1E2E] tracking-wide mb-8" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              Polymorphic Buttons
            </h2>
            
            <div className="space-y-10">
              {/* Button Variants */}
              <div>
                <span className="block font-sans text-[9px] uppercase tracking-[0.25em] text-[#C8A24A] font-bold mb-4">Variants</span>
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary" isLoading={globalLoading} disabled={globalDisabled}>Primary Solid</Button>
                  <Button variant="secondary" isLoading={globalLoading} disabled={globalDisabled}>Secondary Clean</Button>
                  <Button variant="outline" isLoading={globalLoading} disabled={globalDisabled}>Gold Outline</Button>
                  <Button variant="gold" isLoading={globalLoading} disabled={globalDisabled}>Gold Accent</Button>
                  <Button variant="ghost" isLoading={globalLoading} disabled={globalDisabled}>Ghost Link</Button>
                </div>
              </div>

              {/* Button Sizes */}
              <div>
                <span className="block font-sans text-[9px] uppercase tracking-[0.25em] text-[#C8A24A] font-bold mb-4">Sizes</span>
                <div className="flex flex-wrap items-center gap-4">
                  <Button variant="primary" size="sm" isLoading={globalLoading} disabled={globalDisabled}>Small Atelier</Button>
                  <Button variant="primary" size="md" isLoading={globalLoading} disabled={globalDisabled}>Medium Atelier</Button>
                  <Button variant="primary" size="lg" isLoading={globalLoading} disabled={globalDisabled}>Large Editorial</Button>
                </div>
              </div>

              {/* Polymorphic and Icons */}
              <div>
                <span className="block font-sans text-[9px] uppercase tracking-[0.25em] text-[#C8A24A] font-bold mb-4">Polymorphic & Icons</span>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant="outline" 
                    isLoading={globalLoading}
                    disabled={globalDisabled}
                    leftIcon={
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                      </svg>
                    }
                  >
                    Wishlist Icon
                  </Button>
                  <Button 
                    variant="primary" 
                    isLoading={globalLoading}
                    disabled={globalDisabled}
                    rightIcon={
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    }
                  >
                    Next Step
                  </Button>
                  {/* Dynamic render tag */}
                  <Button 
                    as="a" 
                    href="#anchor-test" 
                    variant="secondary"
                    isLoading={globalLoading}
                    disabled={globalDisabled}
                  >
                    Rendered as &lt;a&gt; tag
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Form Fields */}
          <section className="border-b border-[#E8C766]/30 pb-16">
            <h2 className="text-3xl font-serif text-[#6B1E2E] tracking-wide mb-8" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              Accessible Inputs & Form Fields
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <Input 
                id="sandbox-input-1"
                label="Full Name (Dynamic State)"
                placeholder="E.g., Devendra Varma"
                disabled={globalDisabled}
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                error={hasErrors ? "Please enter a valid royal lineage name." : ""}
                helperText="Use your exact title as documented on legal transcripts."
              />

              <Select 
                id="sandbox-select-1"
                label="Crafting Commision (Dynamic State)"
                placeholder="Choose a metal choice..."
                options={selectOptions}
                disabled={globalDisabled}
                required
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                error={hasErrors ? "This precious metal is currently out of stock." : ""}
                helperText="All selection options are hand-crafted to order."
              />

              <Textarea 
                id="sandbox-textarea-1"
                label="Engraving Inscription (Dynamic State)"
                placeholder="E.g., For eternity..."
                disabled={globalDisabled}
                required
                rows={3}
                className="md:col-span-2"
                error={hasErrors ? "Text exceeds capacity of the inner bezel ring (Max 24 characters)." : ""}
                helperText="Will be inscribed in high-relief Roman script on the underside."
              />
            </div>
          </section>

          {/* Section: Modals */}
          <section className="border-b border-[#E8C766]/30 pb-16">
            <h2 className="text-3xl font-serif text-[#6B1E2E] tracking-wide mb-8" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              Portal Overlays & Dialogs (Modals)
            </h2>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
                Open Standard Atelier Dialog
              </Button>
              <Button variant="outline" onClick={() => setIsModalLargeOpen(true)}>
                Open Extended Bespoke Dialog
              </Button>
            </div>

            {/* Standard Modal */}
            <Modal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              title="Atelier Commission Form"
              size="md"
            >
              <div className="space-y-6">
                <p className="text-sm text-[#6B1E2E]/80 leading-relaxed font-sans">
                  Focus is currently trapped inside this dialog overlay container. You can press <kbd className="bg-white px-1 text-[11px] rounded border border-[#C8A24A]/30">Tab</kbd> or <kbd className="bg-white px-1 text-[11px] rounded border border-[#C8A24A]/30">Shift+Tab</kbd> to confirm, and escape or the backdrop overlay to close.
                </p>
                <Input 
                  id="modal-input-1"
                  label="Contact Phone"
                  placeholder="+91 99887 76655"
                  required
                />
                <div className="flex justify-end gap-4 pt-4 border-t border-[#E8C766]/20">
                  <Button variant="ghost" onClick={() => setIsModalOpen(false)} size="sm">
                    Cancel
                  </Button>
                  <Button variant="primary" onClick={() => {
                    setIsModalOpen(false);
                    addToast("Request queued into concierge service", "success");
                  }} size="sm">
                    Submit Request
                  </Button>
                </div>
              </div>
            </Modal>

            {/* Large Modal */}
            <Modal 
              isOpen={isModalLargeOpen} 
              onClose={() => setIsModalLargeOpen(false)} 
              title="Royal Collection Commissions Portfolio"
              size="lg"
            >
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative aspect-[4/3] bg-white border-[0.5px] border-[#C8A24A]/40 flex items-center justify-center">
                    <span className="font-serif italic text-sm text-[#C8A24A]">Exquisite Diamond Detail Frame</span>
                  </div>
                  <div className="flex flex-col justify-center space-y-4">
                    <h3 className="font-serif text-2xl text-[#6B1E2E]">Crafting Details</h3>
                    <p className="font-sans text-xs text-[#6B1E2E]/80 leading-relaxed">
                      Every bespoke item undergoes an extensive 120-hour mapping and setting pipeline by our premier artisans. Inlays are inspected under custom magnification.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end gap-4 pt-6 border-t border-[#E8C766]/20">
                  <Button variant="outline" onClick={() => setIsModalLargeOpen(false)} size="sm">
                    Dismiss Portfolio
                  </Button>
                  <Button variant="gold" onClick={() => {
                    setIsModalLargeOpen(false);
                    addToast("Bespoke inquiry registered in database.", "success");
                  }} size="sm">
                    Initiate Commission
                  </Button>
                </div>
              </div>
            </Modal>
          </section>

          {/* Section: Skeletons & Spinners */}
          <section className="border-b border-[#E8C766]/30 pb-16">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <h2 className="text-3xl font-serif text-[#6B1E2E] tracking-wide" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
                Loading Placeholders & Skeletons
              </h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSkeletonLoading(!skeletonLoading)}
              >
                {skeletonLoading ? "Show Loaded Cards" : "Show Loading Skeletons"}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {skeletonLoading ? (
                // Skeleton loading state
                [1, 2].map((i) => (
                  <div key={i} className="border border-[#C8A24A]/20 p-4 bg-white space-y-4">
                    {/* Image Box Skeleton */}
                    <Skeleton className="w-full aspect-[4/3]" />
                    {/* Title Skeleton */}
                    <Skeleton className="h-6 w-3/4" />
                    {/* Price Skeleton */}
                    <Skeleton className="h-4 w-1/3" />
                    {/* Button Skeleton */}
                    <Skeleton className="h-10 w-full" />
                  </div>
                ))
              ) : (
                // Actual Loaded Cards
                <>
                  <div className="border-[0.5px] border-[#C8A24A]/40 p-4 bg-white space-y-4 flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="relative aspect-[4/3] bg-white overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center font-serif text-sm italic text-[#C8A24A]">Jewelry Picture</div>
                      </div>
                      <h3 className="font-serif text-xl">The Chandrika Sterling Choker</h3>
                      <p className="font-sans text-[11px] text-[#6B1E2E]/80">Hand-carved premium filigree layout.</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">View Details</Button>
                  </div>

                  <div className="border-[0.5px] border-[#C8A24A]/40 p-4 bg-white space-y-4 flex flex-col justify-between group">
                    <div className="space-y-4">
                      <div className="relative aspect-[4/3] bg-white overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center font-serif text-sm italic text-[#C8A24A]">Jewelry Picture</div>
                      </div>
                      <h3 className="font-serif text-xl">The Mayura Peacock Ring</h3>
                      <p className="font-sans text-[11px] text-[#6B1E2E]/80">Studded with premium custom cut zirconias.</p>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">View Details</Button>
                  </div>
                </>
              )}
            </div>

            {/* Spinner Sizes */}
            <div className="mt-10">
              <span className="block font-sans text-[9px] uppercase tracking-[0.25em] text-[#C8A24A] font-bold mb-4">Luxury SVG Spinners</span>
              <div className="flex items-center gap-8 bg-white p-6 border-[0.5px] border-[#C8A24A]/20">
                <div className="flex flex-col items-center gap-2">
                  <Spinner size="sm" />
                  <span className="font-sans text-[9px] uppercase text-[#6B1E2E]/60">Small</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner size="md" />
                  <span className="font-sans text-[9px] uppercase text-[#6B1E2E]/60">Medium</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Spinner size="lg" />
                  <span className="font-sans text-[9px] uppercase text-[#6B1E2E]/60">Large</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section: Empty States */}
          <section className="pb-10">
            <h2 className="text-3xl font-serif text-[#6B1E2E] tracking-wide mb-8" style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}>
              Empty States & Fallbacks
            </h2>

            <div className="border border-[#C8A24A]/20 bg-white">
              <EmptyState 
                title="Bespoke Vault is Empty"
                description="You have not selected any custom items to add to your private gallery yet."
                actionLabel="Explore Collections"
                onAction={() => addToast("Redirecting to Collections...", "info")}
                icon={
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                }
              />
            </div>
          </section>

        </div>

        {/* Right Side: Interactive Toast Controller Panel */}
        <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-8 self-start">
          <div className="border-[0.5px] border-[#C8A24A] bg-white p-6 relative">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>

            <h3 className="font-serif text-xl text-[#6B1E2E] tracking-wide mb-4">Notification Manager</h3>
            <p className="font-sans text-xs text-[#6B1E2E]/80 leading-relaxed mb-6">
              Interact with the toast engine to confirm queue placement, errors, warnings, and general concierge info.
            </p>

            <div className="flex flex-col gap-3">
              <Button 
                variant="primary" 
                size="sm"
                onClick={() => addToast("Authenticating royal signature credentials...", "info")}
              >
                Trigger Info Toast
              </Button>
              <Button 
                variant="gold" 
                size="sm"
                onClick={() => addToast("Atelier commission placed successfully!", "success")}
              >
                Trigger Success Toast
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => addToast("Secure network handshake timed out. Retrying...", "warning")}
              >
                Trigger Warning Toast
              </Button>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => addToast("Bespoke signature failed verification credentials.", "error")}
              >
                Trigger Error Toast
              </Button>
            </div>
          </div>

          <div className="bg-white border-[0.5px] border-[#C8A24A]/30 p-6 font-sans">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#C8A24A] mb-3">Atelier Guidelines</h4>
            <ul className="text-xs text-[#6B1E2E]/80 space-y-2 list-disc list-inside">
              <li>All UI frames implement fine gold hairline anchors.</li>
              <li>Hover effects use 500ms ease transitions.</li>
              <li>Inputs map ARIA properties for high compliance.</li>
              <li>Dialog locks tab index and handles Esc close.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DesignSystem;
