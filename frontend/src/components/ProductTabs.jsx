import React, { useState, useRef, useEffect } from 'react';

// ━━━ GEMSTONE COLOUR MAP ━━━
const GEMSTONE_COLORS = {
  'Amethyst': '#9B59B6',
  'Emerald': '#2ECC71',
  'Ruby': '#C0392B',
  'Sapphire': '#2980B9',
  'Pearl': '#FAEBD7',
  'Citrine': '#F1C40F',
  'Pink Tourmaline': '#FF6B9D',
  'Black Onyx': '#2C3E50',
  'Garnet': '#8B0000',
  'Turquoise': '#48D1CC',
  'Opal': '#A8D8EA',
  'Aquamarine': '#7FFFD4',
  'Mixed': 'linear-gradient(135deg, #9B59B6, #2ECC71, #C0392B)',
};

// ━━━ GEMSTONE ORIGIN MAP ━━━
const GEMSTONE_DETAILS = {
  'Amethyst': {
    origin: 'Brazil & Zambia',
    meaning: 'Clarity of mind, spiritual protection and calm',
    care: 'Avoid prolonged sun exposure — may fade with UV light.',
    properties: 'Semi-precious quartz, Mohs 7'
  },
  'Emerald': {
    origin: 'Colombia & Zambia',
    meaning: 'Growth, prosperity and new beginnings',
    care: 'Avoid ultrasonic cleaners — use a soft damp cloth only.',
    properties: 'Precious beryl, Mohs 7.5–8'
  },
  'Ruby': {
    origin: 'Myanmar & Sri Lanka',
    meaning: 'Passion, vitality and love',
    care: 'Safe for light steam cleaning. Avoid harsh acids.',
    properties: 'Precious corundum, Mohs 9'
  },
  'Sapphire': {
    origin: 'Sri Lanka & Kashmir',
    meaning: 'Wisdom, loyalty and inner peace',
    care: 'Hardy stone — safe for most cleaning methods.',
    properties: 'Precious corundum, Mohs 9'
  },
  'Pearl': {
    origin: 'India & Japan (Freshwater)',
    meaning: 'Purity, wisdom and feminine grace',
    care: 'Last on, first off — avoid perfume and cosmetics.',
    properties: 'Organic gemstone, Mohs 2.5–4'
  },
  'Citrine': {
    origin: 'Brazil & Bolivia',
    meaning: 'Abundance, warmth and positive energy',
    care: 'Avoid prolonged UV exposure. Wipe with soft cloth.',
    properties: 'Quartz variety, Mohs 7'
  },
  'Pink Tourmaline': {
    origin: 'Brazil & Afghanistan',
    meaning: 'Compassion, emotional healing and love',
    care: 'Use mild soap and water — avoid harsh chemicals.',
    properties: 'Complex silicate, Mohs 7–7.5'
  },
  'Black Onyx': {
    origin: 'India & Brazil',
    meaning: 'Strength, grounding and protection',
    care: 'Wipe clean with a soft dry cloth. Avoid soaking.',
    properties: 'Chalcedony variety, Mohs 6.5–7'
  },
};

// ━━━ CARE ICONS ━━━
const CareIcon = ({ type }) => {
  const icons = {
    pouch: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2h12l2 6H4L6 2z"/>
        <path d="M4 8v12a2 2 0 002 2h12a2 2 0 002-2V8"/>
        <path d="M9 2v6M15 2v6"/>
      </svg>
    ),
    avoid: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/>
      </svg>
    ),
    cloth: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M9 12l2 2 4-4"/>
      </svg>
    ),
    dry: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/>
        <line x1="12" y1="12" x2="12" y2="16"/>
      </svg>
    ),
    separate: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <line x1="14" y1="17.5" x2="21" y2="17.5"/>
        <line x1="17.5" y1="14" x2="17.5" y2="21"/>
      </svg>
    ),
  };
  return icons[type] || null;
};

const CARE_STEPS = [
  {
    icon: 'pouch',
    title: 'Store carefully',
    text: 'Store in the provided anti-tarnish pouch or box after each wear to prevent oxidation and scratching.'
  },
  {
    icon: 'avoid',
    title: 'Avoid chemicals',
    text: 'Keep away from perfume, chlorine, hairspray and lotions. Put jewellery on last — after grooming — and remove it first.'
  },
  {
    icon: 'cloth',
    title: 'Gentle cleaning',
    text: 'Clean gently with a soft, lint-free polishing cloth. For deeper cleaning, use mild soap, rinse with lukewarm water and pat dry immediately.'
  },
  {
    icon: 'dry',
    title: 'Keep dry',
    text: 'Remove before bathing, swimming or exercising. Moisture and sweat accelerate tarnishing in sterling silver.'
  },
  {
    icon: 'separate',
    title: 'Store separately',
    text: 'Store each piece individually to prevent scratches. Harder gemstones can scratch softer metals and stones when stored together.'
  },
];

const TABS = [
  'MATERIALS & GEMSTONES',
  'CARE INSTRUCTIONS',
  'SHIPPING & RETURNS',
];

// ━━━ MAIN COMPONENT ━━━
const ProductTabs = ({ description, product }) => {
  const [activeTab, setActiveTab] = useState(0);
  const tabRefs = useRef([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  const gemstone = product?.gemstone;
  const gemstoneInfo = gemstone ? GEMSTONE_DETAILS[gemstone] : null;
  const gemstoneColor = gemstone ? GEMSTONE_COLORS[gemstone] : null;

  // Compute the sliding indicator position
  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el) {
      setIndicatorStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div
      id="product-tabs"
      className="w-full mt-16 md:mt-24 mb-8 md:mb-16 border-t border-[#C8A24A]/30"
    >
      <div className="max-w-[1200px] mx-auto px-0">

        {/* ━━━ TAB HEADERS ━━━ */}
        <div className="relative flex flex-col sm:flex-row border-b border-[#C8A24A]/20">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              ref={(el) => (tabRefs.current[i] = el)}
              onClick={() => setActiveTab(i)}
              className={`relative py-5 px-6 font-sans text-[10px] font-bold uppercase tracking-[0.22em] transition-colors duration-300 focus-visible:outline-none text-left sm:text-center whitespace-nowrap ${
                activeTab === i
                  ? 'text-[#C8A24A]'
                  : 'text-[#6B1E2E]/50 hover:text-[#6B1E2E]'
              }`}
            >
              {tab}
            </button>
          ))}

          {/* Sliding gold underline indicator */}
          <span
            className="absolute bottom-[-1px] h-[2px] bg-[#C8A24A] transition-all duration-400 ease-in-out"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />
        </div>

        {/* ━━━ TAB CONTENT AREA ━━━ */}
        <div className="py-12 md:py-16">

          {/* ━━━ TAB 1: MATERIALS & GEMSTONES ━━━ */}
          <div className={`transition-all duration-500 ${activeTab === 0 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'hidden opacity-0 translate-y-3 pointer-events-none'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

              {/* Left: Silver Details */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E8E8E8] to-[#A8A8A8] border border-[#C8A24A]/30 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A24A" strokeWidth="1.5">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                  </div>
                  <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-[#6B1E2E]">
                    Silver Details
                  </h3>
                </div>

                <p className="font-sans text-sm leading-[1.9] text-[#6B1E2E]/75 mb-6">
                  This piece is crafted from <strong className="text-[#6B1E2E] font-semibold">925 sterling silver</strong> — 92.5% pure silver, BIS Hallmarked. Nickel-free and safe for sensitive skin, including children's skin.
                </p>

                <div className="space-y-3 border-t border-[#C8A24A]/20 pt-5">
                  {[
                    ['Purity', '92.5% Sterling Silver'],
                    ['Hallmark', 'BIS Certified'],
                    ['Finish', 'Rhodium / Oxidised (varies by piece)'],
                    ['Origin', 'Handcrafted in Bhubaneswar, Odisha'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-start gap-3">
                      <span className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-[#C8A24A]/70 w-20 shrink-0 pt-0.5">{label}</span>
                      <span className="font-sans text-[13px] text-[#6B1E2E]/80">{value}</span>
                    </div>
                  ))}
                </div>

                {/* Nickel-free note */}
                <div className="mt-6 flex items-start gap-3 bg-white border border-[#C8A24A]/25 p-4 rounded-sm">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A24A" strokeWidth="2" className="shrink-0 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="font-sans text-[11px] text-[#6B1E2E]/70 leading-relaxed">
                    <strong className="text-[#6B1E2E]">All pieces are nickel-free</strong> and safe for children's skin and sensitive skin types.
                  </p>
                </div>
              </div>

              {/* Right: Gemstone Details */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  {gemstoneColor ? (
                    <div
                      className="w-8 h-8 rounded-full border border-[#C8A24A]/40 shadow-sm"
                      style={{
                        background: gemstone === 'Mixed'
                          ? 'linear-gradient(135deg, #9B59B6, #2ECC71, #C0392B)'
                          : gemstoneColor
                      }}
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-white border border-[#C8A24A]/30" />
                  )}
                  <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-[#6B1E2E]">
                    Gemstone Details
                  </h3>
                </div>

                {gemstoneInfo ? (
                  <>
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="w-5 h-5 rounded-full border border-white/40 shadow"
                        style={{ background: gemstoneColor || '#ccc' }}
                      />
                      <span
                        className="font-serif text-2xl text-[#6B1E2E] italic"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {gemstone}
                      </span>
                    </div>

                    <p className="font-sans text-sm leading-[1.9] text-[#6B1E2E]/75 mb-6">
                      <em className="text-[#C8A24A]">{gemstoneInfo.meaning}.</em> Sourced from {gemstoneInfo.origin}.
                    </p>

                    <div className="space-y-3 border-t border-[#C8A24A]/20 pt-5">
                      {[
                        ['Origin', gemstoneInfo.origin],
                        ['Properties', gemstoneInfo.properties],
                        ['Gemstone Care', gemstoneInfo.care],
                      ].map(([label, value]) => (
                        <div key={label} className="flex items-start gap-3">
                          <span className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-[#C8A24A]/70 w-28 shrink-0 pt-0.5">{label}</span>
                          <span className="font-sans text-[13px] text-[#6B1E2E]/80">{value}</span>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="font-sans text-sm text-[#6B1E2E]/60 leading-relaxed italic">
                    {gemstone
                      ? `This piece features ${gemstone}. Natural gemstones may vary slightly in colour and character — each is unique.`
                      : 'This piece features no gemstone, or pure silver as the star.'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ━━━ TAB 2: CARE INSTRUCTIONS ━━━ */}
          <div className={`transition-all duration-500 ${activeTab === 1 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'hidden opacity-0 translate-y-3 pointer-events-none'}`}>
            <div className="max-w-2xl mx-auto">
              <p className="font-sans text-xs text-[#6B1E2E]/60 text-center uppercase tracking-[0.2em] mb-10">
                Follow these steps to preserve the beauty of your piece
              </p>

              <div className="space-y-0">
                {CARE_STEPS.map((step, i) => (
                  <div
                    key={step.title}
                    className="flex gap-6 pb-8 border-b border-[#C8A24A]/15 last:border-0 last:pb-0 group"
                  >
                    {/* Step number + icon */}
                    <div className="flex flex-col items-center gap-2 shrink-0">
                      <div className="w-10 h-10 rounded-full border border-[#C8A24A]/40 bg-white flex items-center justify-center text-[#C8A24A] group-hover:bg-[#C8A24A] group-hover:text-[#6B1E2E] transition-colors duration-300">
                        <CareIcon type={step.icon} />
                      </div>
                      {i < CARE_STEPS.length - 1 && (
                        <div className="w-px flex-1 min-h-[20px] bg-gradient-to-b from-[#C8A24A]/30 to-transparent" />
                      )}
                    </div>

                    {/* Text */}
                    <div className="pt-2 pb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-sans text-[9px] font-bold text-[#C8A24A] tracking-[0.2em] uppercase">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h4 className="font-sans text-xs font-bold uppercase tracking-[0.15em] text-[#6B1E2E]">
                          {step.title}
                        </h4>
                      </div>
                      <p className="font-sans text-[13px] leading-[1.85] text-[#6B1E2E]/70">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ━━━ TAB 3: SHIPPING & RETURNS ━━━ */}
          <div className={`transition-all duration-500 ${activeTab === 2 ? 'opacity-100 translate-y-0 pointer-events-auto' : 'hidden opacity-0 translate-y-3 pointer-events-none'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">

              {/* Shipping */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#C8A24A]/30 flex items-center justify-center text-[#C8A24A]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13"/>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                      <circle cx="5.5" cy="18.5" r="2.5"/>
                      <circle cx="18.5" cy="18.5" r="2.5"/>
                    </svg>
                  </div>
                  <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-[#6B1E2E]">Shipping</h3>
                </div>

                <div className="space-y-5">
                  {[
                    { title: 'Insured Delivery', detail: 'Safe, insured delivery on all domestic orders.' },
                    { title: 'Domestic (India)', detail: 'Dispatched within 1–2 business days. Delivered in 7–10 working days.' },
                    { title: 'Express Delivery', detail: 'Available at checkout for domestic orders in select postcodes.' },
                    { title: 'Gift Wrapping', detail: 'Complimentary Aishka gift packaging available at checkout.' },
                  ].map(({ title, detail }) => (
                    <div key={title} className="flex items-start gap-4 border-b border-[#C8A24A]/12 pb-5 last:border-0">
                      <span className="text-[#C8A24A] text-base leading-none mt-0.5">✦</span>
                      <div>
                        <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B1E2E] mb-1">{title}</span>
                        <span className="font-sans text-[13px] text-[#6B1E2E]/70 leading-relaxed">{detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Returns */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-white border border-[#C8A24A]/30 flex items-center justify-center text-[#C8A24A]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>
                    </svg>
                  </div>
                  <h3 className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-[#6B1E2E]">Returns & Exchange</h3>
                </div>

                <div className="space-y-5">
                  {[
                    { title: '7-Day Returns', detail: 'Return any unworn piece in its original, undamaged packaging within 7 days of delivery.' },
                    { title: 'Easy Exchange', detail: 'Exchange for a different size or style. We process exchanges within 2 business days.' },
                    { title: 'Full Refund', detail: 'Full refund to original payment method once piece is received and inspected.' },
                    { title: 'Bespoke & Custom', detail: 'Custom-made and engraved pieces are non-returnable unless defective.' },
                    { title: 'How to Return', detail: 'Contact care@aishka.com or WhatsApp us — we will arrange pickup at no charge.' },
                  ].map(({ title, detail }) => (
                    <div key={title} className="flex items-start gap-4 border-b border-[#C8A24A]/12 pb-5 last:border-0">
                      <span className="text-[#C8A24A] text-base leading-none mt-0.5">✦</span>
                      <div>
                        <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B1E2E] mb-1">{title}</span>
                        <span className="font-sans text-[13px] text-[#6B1E2E]/70 leading-relaxed">{detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
