import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import reviewsService from '../services/reviews.service';
import { AuthContext } from '../context/AuthContext';

// ━━━ STAR ICON ━━━
const Star = ({ filled, half, size = 16, onClick }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? '#C8A24A' : 'none'}
    stroke="#C8A24A"
    strokeWidth="1.3"
    onClick={onClick}
    className={onClick ? 'cursor-pointer transition-transform hover:scale-110' : ''}
    style={{ display: 'block' }}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ━━━ STAR ROW ━━━
const StarRow = ({ rating, size = 14 }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} filled={i <= Math.round(rating)} size={size} />
    ))}
  </div>
);

// ━━━ INTERACTIVE STAR SELECTOR ━━━
const StarSelector = ({ value, onChange }) => (
  <div className="flex gap-2">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} filled={i <= value} size={22} onClick={() => onChange(i)} />
    ))}
  </div>
);

// ━━━ REVIEW CARD — matches mockup rounded-pill card style ━━━
const ReviewCard = ({ review }) => {
  const name = review.user_name || review.name || 'Customer';
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
      <div className="flex flex-col min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-sans font-bold text-xs text-gray-800 truncate max-w-[120px]">
            {name}
          </span>
          <StarRow rating={review.rating} size={11} />
        </div>
        <p className="font-sans text-[11px] text-gray-600 truncate max-w-[180px] md:max-w-[240px] mt-0.5">
          {review.body || review.text || 'Beautiful product!'}
        </p>
      </div>
    </div>
  );
};

// ━━━ RATING BREAKDOWN BAR ━━━
const RatingBar = ({ star, count, total }) => {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div className="flex items-center gap-3">
      <span className="font-sans text-[11px] text-[#6B1E2E]/70 w-4 text-right shrink-0">{star}</span>
      <svg width="11" height="11" viewBox="0 0 24 24" fill="#C8A24A" className="shrink-0">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <div className="flex-1 h-[5px] bg-[#C8A24A]/15 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#C8A24A] rounded-full transition-all duration-700"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-sans text-[10px] text-[#6B1E2E]/50 w-8 text-right shrink-0">{pct}%</span>
    </div>
  );
};

// ━━━ REVIEW FORM MODAL ━━━
const ReviewModal = ({ productId, productName, onClose }) => {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [title, setTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useContext(AuthContext);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Please enter a review title.';
    if (!rating) e.rating = 'Please select a star rating.';
    if (text.trim().length < 10) e.text = 'Please write at least 10 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      await reviewsService.submitReview(productId, { rating, title, body: text });
      setStep('success');
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to submit review. Have you ordered this product?' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[300] bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg relative shadow-2xl"
        style={{ clipPath: 'polygon(0 2%, 2% 0, 98% 0, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0 98%)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Gold chamfer border */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#C8A24A]/50 fill-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polygon points="0,2 2,0 98,0 100,2 100,98 98,100 2,100 0,98" vectorEffect="non-scaling-stroke" style={{ strokeWidth: '0.8px' }} />
        </svg>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center text-[#6B1E2E]/60 hover:text-[#6B1E2E] transition-colors"
          aria-label="Close"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="p-8 md:p-10 z-10 relative">
          {step === 'success' ? (
            /* ━━━ SUCCESS STATE ━━━ */
            <div className="flex flex-col items-center text-center py-8 gap-5">
              <div className="w-14 h-14 rounded-full bg-[#C8A24A]/15 border border-[#C8A24A]/40 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A24A" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <span
                className="font-serif text-[#6B1E2E] text-3xl"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Thank You!
              </span>
              <p className="font-sans text-sm text-[#6B1E2E]/70 leading-relaxed max-w-xs">
                Your review has been submitted. We appreciate you sharing your experience with the Aishka community.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-8 py-3 bg-[#C8A24A] text-[#6B1E2E] font-sans text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#E8C766] transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            /* ━━━ REVIEW FORM ━━━ */
            <form onSubmit={handleSubmit} noValidate>
              {/* Heading */}
              <span className="block font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8A24A] mb-2">
                ✦ Share Your Experience ✦
              </span>
              <h3
                className="font-serif text-[#6B1E2E] text-2xl mb-6 border-b border-[#C8A24A]/20 pb-4"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Write a Review
              </h3>

              {/* Product name badge */}
              {productName && (
                <div className="inline-flex items-center gap-2 bg-white border border-[#C8A24A]/25 px-3 py-1.5 mb-6 rounded-sm">
                  <span className="font-sans text-[9px] font-bold uppercase tracking-widest text-[#C8A24A]">Reviewing:</span>
                  <span className="font-sans text-[11px] text-[#6B1E2E] font-medium">{productName}</span>
                </div>
              )}

              {/* Submit Error */}
              {errors.submit && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                  {errors.submit}
                </div>
              )}

              {/* Title field */}
              <div className="mb-5">
                <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B1E2E]/70 mb-2">
                  Review Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Absolutely stunning!"
                  className="w-full bg-white/50 border border-[#C8A24A]/35 px-4 py-3 font-sans text-sm text-[#6B1E2E] placeholder-[#6B1E2E]/30 focus:outline-none focus:border-[#C8A24A] transition-colors"
                />
                {errors.title && <p className="font-sans text-[10px] text-red-600/80 mt-1">{errors.title}</p>}
              </div>

              {/* Star rating selector */}
              <div className="mb-5">
                <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B1E2E]/70 mb-3">
                  Your Rating
                </label>
                <StarSelector value={rating} onChange={setRating} />
                {errors.rating && <p className="font-sans text-[10px] text-red-600/80 mt-2">{errors.rating}</p>}
              </div>

              {/* Review text */}
              <div className="mb-7">
                <label className="block font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-[#6B1E2E]/70 mb-2">
                  Your Review
                </label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  placeholder="Tell us about the quality, fit, and your experience..."
                  className="w-full bg-white/50 border border-[#C8A24A]/35 px-4 py-3 font-sans text-sm text-[#6B1E2E] placeholder-[#6B1E2E]/30 focus:outline-none focus:border-[#C8A24A] transition-colors resize-none leading-relaxed"
                />
                <div className="flex justify-between mt-1">
                  {errors.text
                    ? <p className="font-sans text-[10px] text-red-600/80">{errors.text}</p>
                    : <span />
                  }
                  <span className="font-sans text-[9px] text-[#6B1E2E]/40">{text.length} / 500</span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#C8A24A] text-[#6B1E2E] font-sans text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-[#E8C766] transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MAIN: PRODUCT REVIEWS SECTION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const ProductReviews = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ avg: 0, total: 0, dist: [] });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (product?.id) {
      fetchReviews(1);
    }
  }, [product?.id]);

  const fetchReviews = async (pageNum) => {
    try {
      setIsLoading(true);
      const res = await reviewsService.getProductReviews(product.id, pageNum);
      if (res.success) {
        if (pageNum === 1) {
          setReviews(res.data.reviews);
        } else {
          setReviews(prev => [...prev, ...res.data.reviews]);
        }
        setTotalPages(res.data.totalPages);
        setPage(res.data.page);
        
        const distribution = [5, 4, 3, 2, 1].map((star) => ({
          star,
          count: Number(res.data.distribution[star]) || 0,
        }));

        setStats({
          avg: res.data.avg_rating,
          total: res.data.total_reviews,
          dist: distribution
        });
      }
    } catch (err) {
      console.error('Failed to load reviews:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    if (page < totalPages) fetchReviews(page + 1);
  };

  // Default fallback reviews matching mockup if reviews list is empty or small
  const defaultMockReviews = [
    { id: 'm1', name: 'Purnima S.', rating: 5, text: 'It is really so beautiful' },
    { id: 'm2', name: 'Souvik C.', rating: 5, text: 'Awesome product of Barsaat collection' },
    { id: 'm3', name: 'Suhana', rating: 5, text: 'Very nice product ☺' },
    { id: 'm4', name: 'Ila R.', rating: 5, text: 'Hiiii Aami photo attach korechi. Khub hi sundor necklace ta ekdum real gold aer moto..07 days...' },
    { id: 'm5', name: 'Rocksmith', rating: 5, text: 'Fatafati collection' },
    { id: 'm6', name: 'Shreya P.', rating: 5, text: 'Stunning craftsmanship, absolutely loved it!' },
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultMockReviews;
  // Duplicate for seamless marquee loop
  const marqueeTrack1 = [...displayReviews, ...displayReviews];
  const marqueeTrack2 = [...displayReviews.reverse(), ...displayReviews];

  return (
    <section id="reviews" className="bg-white py-16 border-t border-gray-100 overflow-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 35s linear infinite;
        }
        .animate-marquee-reverse {
          display: flex;
          width: max-content;
          animation: marquee 40s linear infinite reverse;
        }
        .marquee-container:hover .animate-marquee,
        .marquee-container:hover .animate-marquee-reverse {
          animation-play-state: paused;
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-6 text-center mb-10">
        <h2 className="text-3xl font-sans font-bold text-gray-900 mb-2">
          Our customers love us
        </h2>
        <p className="text-sm text-gray-500 font-sans">
          4.9 star Based on All Customer Reviews
        </p>
      </div>

      {/* Marquee Wrapper */}
      <div className="marquee-container flex flex-col gap-5 w-full overflow-hidden py-4">
        {/* Track 1 */}
        <div className="w-full overflow-hidden flex">
          <div className="animate-marquee gap-5">
            {marqueeTrack1.map((rev, index) => (
              <ReviewCard key={`t1-${rev.id}-${index}`} review={rev} />
            ))}
          </div>
        </div>

        {/* Track 2 */}
        <div className="w-full overflow-hidden flex">
          <div className="animate-marquee-reverse gap-5">
            {marqueeTrack2.map((rev, index) => (
              <ReviewCard key={`t2-${rev.id}-${index}`} review={rev} />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 text-center mt-8">
        {isAuthenticated ? (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 border border-black text-black font-sans text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 hover:bg-black hover:text-white transition-all duration-300"
          >
            Write a Review
          </button>
        ) : (
          <Link
            to={`/login?redirect=/product/${product?.slug}`}
            className="inline-flex items-center gap-2 border border-black text-black font-sans text-xs font-bold uppercase tracking-[0.2em] px-6 py-3 hover:bg-black hover:text-white transition-all duration-300"
          >
            Login to Write a Review
          </Link>
        )}
      </div>

      {/* ━━━ REVIEW FORM MODAL ━━━ */}
      {isModalOpen && (
        <ReviewModal
          productId={product?.id}
          productName={product?.name}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </section>
  );
};

export default ProductReviews;
