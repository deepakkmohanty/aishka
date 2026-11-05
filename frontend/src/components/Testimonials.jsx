import React, { useState, useEffect, useRef } from 'react';
import contentService from '../services/content.service';

const TestimonialBubble = ({ name, rating, text }) => {
  const initial = name.charAt(0).toUpperCase();
  const colors = ['bg-[#6B1E2E]', 'bg-[#C8A24A]', 'bg-[#4A6B5D]', 'bg-[#8A5A44]', 'bg-[#2E5A88]'];
  const colorIndex = name.charCodeAt(0) % colors.length;
  const avatarColor = colors[colorIndex];

  return (
    <div className="flex-shrink-0 flex items-center gap-4 bg-[#FFFBEA] border border-[#F0D59E]/50 rounded-full px-6 py-3.5 shadow-sm max-w-md min-w-[280px] md:min-w-[340px] select-none hover:border-[#D4AF37] transition-all">
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full ${avatarColor} text-white flex items-center justify-center font-sans font-bold text-sm shrink-0 shadow-inner`}>
        {initial}
      </div>

      {/* Content */}
      <div className="flex flex-col min-w-0 items-start text-left">
        <div className="flex items-center gap-2">
          <span className="font-sans font-bold text-xs text-gray-800 truncate max-w-[120px]">
            {name}
          </span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                width={11}
                height={11}
                viewBox="0 0 24 24"
                fill={i <= rating ? '#C8A24A' : 'none'}
                stroke="#C8A24A"
                strokeWidth="1.3"
                style={{ display: 'block' }}
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
        </div>
        <p className="font-sans text-[11px] text-gray-600 truncate max-w-[180px] md:max-w-[240px] mt-0.5">
          {text || 'Beautiful product!'}
        </p>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  // Fallback reviews to make sure it looks identical to the screenshot
  const fallbackTestimonials = [
    { id: 'fb-t1', customer_name: 'Purnima S.', rating: 5, body: 'It is really so beautiful' },
    { id: 'fb-t2', customer_name: 'Souvik C.', rating: 5, body: 'Awesome product of Barsaat collection' },
    { id: 'fb-t3', customer_name: 'Suhana', rating: 5, body: 'Very nice product ☺' },
    { id: 'fb-t4', customer_name: 'Ila R.', rating: 5, body: 'Hiiii Aami photo attach korechi. Khub hi sundor necklace ta ekdum real gold aer moto..07 days...' },
    { id: 'fb-t5', customer_name: 'Rocksmith', rating: 5, body: 'Fatafati collection' },
    { id: 'fb-t6', customer_name: 'Shreya P.', rating: 5, body: 'Stunning craftsmanship, absolutely loved it!' }
  ];

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await contentService.getTestimonials();
        if (res.data?.success && res.data?.data?.testimonials && res.data.data.testimonials.length > 0) {
          setTestimonials(res.data.data.testimonials);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.error('Failed to fetch testimonials:', error);
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="w-full flex flex-col">
      
      {/* ━━━ RED TRUST BADGES BAR ━━━ */}
      <section className="w-full bg-[#7A1213] py-6 px-6 border-b border-[#EDE0CB]/15">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/20">
          
          {/* Badge 1 */}
          <div className="flex items-center justify-center gap-4 text-white pb-4 md:pb-0">
            <svg className="w-8 h-8 text-[#F5EDE2] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <div className="text-left font-sans">
              <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white">EASY RETURNS</h4>
              <p className="text-[11px] text-[#F5EDE2]/85">7-day hassle-free return policy</p>
            </div>
          </div>

          {/* Badge 2 */}
          <div className="flex items-center justify-center gap-4 text-white py-4 md:py-0 md:pl-6">
            <svg className="w-8 h-8 text-[#F5EDE2] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
            </svg>
            <div className="text-left font-sans">
              <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white">SECURE DELIVERY</h4>
              <p className="text-[11px] text-[#F5EDE2]/85">Checked & carefully packaged</p>
            </div>
          </div>

          {/* Badge 3 */}
          <div className="flex items-center justify-center gap-4 text-white pt-4 md:pt-0 md:pl-6">
            <svg className="w-8 h-8 text-[#F5EDE2] flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="5" y="2" width="14" height="20" rx="2" />
              <path d="M12 18h.01M9 6h6" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            <div className="text-left font-sans">
              <h4 className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-white">SECURE PAYMENTS</h4>
              <p className="text-[11px] text-[#F5EDE2]/85">All major cards & UPI accepted</p>
            </div>
          </div>

        </div>
      </section>

      {/* ━━━ OUR CUSTOMERS LOVE US SECTION ━━━ */}
      <section className="w-full bg-white py-14 px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1400px] mx-auto text-center">
          
          <h2 className="font-sans text-3xl font-bold text-gray-900 mb-2">
            Our customers love us
          </h2>
          <p className="font-sans text-sm text-gray-500 mb-10">
            4.9 star Based on All Customer Reviews
          </p>

          {/* Infinite Moving Marquee Container */}
          <div className="relative w-full overflow-hidden py-4">
            <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
              {/* First set of reviews */}
              <div className="flex gap-6 shrink-0">
                {testimonials.map((item, index) => (
                  <TestimonialBubble 
                    key={`${item.id}-c1-${index}`}
                    name={item.customer_name} 
                    rating={item.rating} 
                    text={item.body} 
                  />
                ))}
              </div>
              
              {/* Second set of reviews for seamless loop */}
              <div className="flex gap-6 shrink-0" aria-hidden="true">
                {testimonials.map((item, index) => (
                  <TestimonialBubble 
                    key={`${item.id}-c2-${index}`}
                    name={item.customer_name} 
                    rating={item.rating} 
                    text={item.body} 
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Testimonials;
