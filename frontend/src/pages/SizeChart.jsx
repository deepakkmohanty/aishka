import React, { useState } from 'react';

export default function SizeChart() {
  const [activeTab, setActiveTab] = useState('rings');

  const ringSizes = [
    { india: '6', diameter: '14.6 mm', circumference: '46.0 mm' },
    { india: '7', diameter: '15.0 mm', circumference: '47.1 mm' },
    { india: '8', diameter: '15.3 mm', circumference: '48.0 mm' },
    { india: '9', diameter: '15.6 mm', circumference: '49.0 mm' },
    { india: '10', diameter: '15.9 mm', circumference: '50.0 mm' },
    { india: '11', diameter: '16.2 mm', circumference: '51.0 mm' },
    { india: '12', diameter: '16.5 mm', circumference: '51.8 mm' },
    { india: '13', diameter: '16.8 mm', circumference: '52.8 mm' },
    { india: '14', diameter: '17.2 mm', circumference: '54.0 mm' },
    { india: '15', diameter: '17.5 mm', circumference: '55.0 mm' },
    { india: '16', diameter: '17.8 mm', circumference: '56.0 mm' },
    { india: '17', diameter: '18.2 mm', circumference: '57.2 mm' },
    { india: '18', diameter: '18.5 mm', circumference: '58.0 mm' },
    { india: '19', diameter: '18.8 mm', circumference: '59.0 mm' },
    { india: '20', diameter: '19.2 mm', circumference: '60.3 mm' }
  ];

  const bangleSizes = [
    { size: '2-2', diameterInches: '2.125 inches', diameterMm: '54.0 mm' },
    { size: '2-4', diameterInches: '2.25 inches', diameterMm: '57.2 mm' },
    { size: '2-6', diameterInches: '2.375 inches', diameterMm: '60.3 mm' },
    { size: '2-8', diameterInches: '2.5 inches', diameterMm: '63.5 mm' },
    { size: '2-10', diameterInches: '2.625 inches', diameterMm: '66.7 mm' }
  ];

  const necklaceSizes = [
    { length: '14 inches', category: 'Choker', description: 'Sits tightly around the base of the neck. Perfect for open necklines.' },
    { length: '16 inches', category: 'Collar', description: 'Falls precisely at the collarbone. Ideal for crew neck tops and everyday layers.' },
    { length: '18 inches', category: 'Princess', description: 'Sits elegantly below the collarbone. The most common and versatile length.' },
    { length: '20 inches', category: 'Matinee', description: 'Rests near the top of the bust line. Fits beautifully over casual and formal outfits.' },
    { length: '24 inches', category: 'Opera', description: 'Hangs below the bust line. Perfect for dramatic styling and statement pendants.' }
  ];

  return (
    <div className="bg-white min-h-screen pt-10 pb-24 max-w-[1200px] mx-auto px-6 md:px-12">
      {/* Title Header */}
      <div className="mb-10 pb-5 border-b border-[#C8A24A]/25">
        <span className="font-sans text-[9px] font-bold uppercase tracking-[0.3em] text-[#6B1E2E] block mb-2">
          ✦ Brand Guides ✦
        </span>
        <h1
          className="font-serif text-[#6B1E2E] text-3xl sm:text-4xl lg:text-5xl font-normal tracking-wider"
          style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
        >
          Jewellery Size Guide
        </h1>
        <p className="font-sans text-xs text-[#6B1E2E]/60 tracking-widest font-light mt-2">
          Find your perfect fit for rings, necklaces, and bangles with our measurement guidelines.
        </p>
      </div>

      {/* Tabs Selector */}
      <div className="flex border-b border-gray-100 mb-10 overflow-x-auto scrollbar-none">
        {[
          { id: 'rings', label: 'Ring Size Chart' },
          { id: 'necklaces', label: 'Necklace Lengths' },
          { id: 'bangles', label: 'Bangle & Bracelet Sizes' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3.5 text-xs font-bold uppercase tracking-widest border-b-2 whitespace-nowrap transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-[#C8A24A] text-[#6B1E2E]'
                : 'border-transparent text-[#6B1E2E]/50 hover:text-[#6B1E2E]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB CONTENT: RINGS */}
      {activeTab === 'rings' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-fade-in">
          {/* Ring Guide / Instructions */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif text-[#6B1E2E] text-xl font-medium tracking-wide border-b border-[#C8A24A]/10 pb-2">
              How to Measure Ring Size
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="w-6 h-6 shrink-0 rounded-full bg-[#6B1E2E] text-white flex items-center justify-center font-bold text-xs">1</span>
                <div>
                  <h4 className="text-xs font-bold text-[#6B1E2E] uppercase tracking-wider mb-1">Measure Existing Ring</h4>
                  <p className="text-xs text-[#6B1E2E]/80 leading-relaxed font-light">
                    Take a ring that fits you perfectly. Measure the internal diameter (across the widest inner circle) in millimetres using a ruler.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-6 h-6 shrink-0 rounded-full bg-[#6B1E2E] text-white flex items-center justify-center font-bold text-xs">2</span>
                <div>
                  <h4 className="text-xs font-bold text-[#6B1E2E] uppercase tracking-wider mb-1">Measure Your Finger</h4>
                  <p className="text-xs text-[#6B1E2E]/80 leading-relaxed font-light">
                    Wrap a thin strip of paper or thread around the base of the intended finger. Mark the point where the ends meet. Measure the length (circumference) in mm.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-6 h-6 shrink-0 rounded-full bg-[#6B1E2E] text-white flex items-center justify-center font-bold text-xs">3</span>
                <div>
                  <h4 className="text-xs font-bold text-[#6B1E2E] uppercase tracking-wider mb-1">Compare with Chart</h4>
                  <p className="text-xs text-[#6B1E2E]/80 leading-relaxed font-light">
                    Use the adjacent conversion table to find your corresponding Indian ring size based on diameter or circumference.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-sm">
              <span className="block text-[10px] font-bold text-amber-800 uppercase tracking-widest mb-1">Expert Tip</span>
              <p className="text-xs text-amber-900/80 leading-relaxed font-light">
                If your measurement falls between two sizes, we always recommend choosing the larger size for a comfortable fit. Warm temperatures can make fingers swell slightly.
              </p>
            </div>
          </div>

          {/* Ring Size Table */}
          <div className="lg:col-span-7 bg-white border border-[#C8A24A]/20 p-6 md:p-8 rounded-sm">
            <h3 className="font-serif text-[#6B1E2E] text-lg font-medium tracking-wide mb-6">
              Ring Size Conversion Table
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-[#C8A24A]/25 text-[#6B1E2E] font-bold uppercase tracking-wider">
                    <th className="pb-3 pr-4">Indian Size</th>
                    <th className="pb-3 px-4">Inside Diameter</th>
                    <th className="pb-3 pl-4">Inside Circumference</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 divide-y divide-gray-100">
                  {ringSizes.map((row) => (
                    <tr key={row.india} className="hover:bg-gray-50 transition-colors">
                      <td className="py-2.5 pr-4 font-bold text-[#6B1E2E]">{row.india}</td>
                      <td className="py-2.5 px-4 font-numeric">{row.diameter}</td>
                      <td className="py-2.5 pl-4 font-numeric">{row.circumference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: NECKLACES */}
      {activeTab === 'necklaces' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-fade-in">
          {/* Necklace Guide */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif text-[#6B1E2E] text-xl font-medium tracking-wide border-b border-[#C8A24A]/10 pb-2">
              Choosing Your Necklace Length
            </h3>
            
            <p className="text-xs text-[#6B1E2E]/80 leading-relaxed font-light">
              Our necklaces range from delicate choker lengths to statement opera designs. The diagram layout below outlines where different lengths sit on a standard frame to help guide your look.
            </p>

            <div className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-sm">
              <span className="block text-[10px] font-bold text-amber-800 uppercase tracking-widest mb-1">Styling Recommendation</span>
              <p className="text-xs text-amber-900/80 leading-relaxed font-light">
                Consider your neckline! V-necks pair beautifully with Princess lengths (18") and pendants. Off-shoulder and sweetheart necklines are enhanced by chokers (14") or short collar lengths (16").
              </p>
            </div>
          </div>

          {/* Necklace Table */}
          <div className="lg:col-span-7 bg-white border border-[#C8A24A]/20 p-6 md:p-8 rounded-sm">
            <h3 className="font-serif text-[#6B1E2E] text-lg font-medium tracking-wide mb-6">
              Necklace Length Classifications
            </h3>
            <div className="space-y-4">
              {necklaceSizes.map((row) => (
                <div key={row.length} className="flex gap-4 items-start p-4 border border-gray-100 hover:border-[#C8A24A]/30 transition-all rounded-sm">
                  <div className="bg-[#6B1E2E] text-white font-numeric text-xs font-bold px-3 py-1.5 rounded-sm shrink-0">
                    {row.length}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#6B1E2E] uppercase tracking-wider mb-1">
                      {row.category}
                    </h4>
                    <p className="text-xs text-[#6B1E2E]/70 font-light leading-relaxed">
                      {row.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: BANGLES */}
      {activeTab === 'bangles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-fade-in">
          {/* Bangle Guide */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-serif text-[#6B1E2E] text-xl font-medium tracking-wide border-b border-[#C8A24A]/10 pb-2">
              Measuring Bangle & Bangle-Bracelet Sizes
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="w-6 h-6 shrink-0 rounded-full bg-[#6B1E2E] text-white flex items-center justify-center font-bold text-xs">1</span>
                <div>
                  <h4 className="text-xs font-bold text-[#6B1E2E] uppercase tracking-wider mb-1">Position Your Hand</h4>
                  <p className="text-xs text-[#6B1E2E]/80 leading-relaxed font-light">
                    Bring your thumb and pinky finger together towards the center of your palm (as if putting on a bangle) to mimic the widest knuckle position.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-6 h-6 shrink-0 rounded-full bg-[#6B1E2E] text-white flex items-center justify-center font-bold text-xs">2</span>
                <div>
                  <h4 className="text-xs font-bold text-[#6B1E2E] uppercase tracking-wider mb-1">Wrap & Measure Knuckles</h4>
                  <p className="text-xs text-[#6B1E2E]/80 leading-relaxed font-light">
                    Wrap a measuring tape or strip of paper around the widest part of your hand (the knuckles). Note the circumference in inches or millimetres.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="w-6 h-6 shrink-0 rounded-full bg-[#6B1E2E] text-white flex items-center justify-center font-bold text-xs">3</span>
                <div>
                  <h4 className="text-xs font-bold text-[#6B1E2E] uppercase tracking-wider mb-1">Resolve Diameter</h4>
                  <p className="text-xs text-[#6B1E2E]/80 leading-relaxed font-light">
                    Check the conversion table to determine your bangle size using the inner diameter equivalent.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bangle Table */}
          <div className="lg:col-span-7 bg-white border border-[#C8A24A]/20 p-6 md:p-8 rounded-sm">
            <h3 className="font-serif text-[#6B1E2E] text-lg font-medium tracking-wide mb-6">
              Bangle Size Comparison Chart
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-sans">
                <thead>
                  <tr className="border-b border-[#C8A24A]/25 text-[#6B1E2E] font-bold uppercase tracking-wider">
                    <th className="pb-3 pr-4">Bangle Size (India)</th>
                    <th className="pb-3 px-4">Inside Diameter (Inches)</th>
                    <th className="pb-3 pl-4">Inside Diameter (Metric)</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700 divide-y divide-gray-100">
                  {bangleSizes.map((row) => (
                    <tr key={row.size} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 font-bold text-[#6B1E2E]">{row.size}</td>
                      <td className="py-3 px-4 font-numeric">{row.diameterInches}</td>
                      <td className="py-3 pl-4 font-numeric">{row.diameterMm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
