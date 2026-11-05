import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import contentService from '../services/content.service';

const InstagramShop = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await contentService.getInstagramPosts();
        if (res.data?.success && res.data?.data?.posts) {
          setPosts(res.data.data.posts);
        }
      } catch (error) {
        console.error('Failed to fetch Instagram posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading || posts.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 md:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* ━━━ SECTION HEADER ━━━ */}
        <div className="text-center mb-10 md:mb-14">
          <span className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-[#C8A24A] block mb-3">
            ✦ GET INSPIRED ✦
          </span>
          <h2
            className="font-serif text-[#6B1E2E] text-3xl md:text-4xl tracking-wide font-normal mb-4"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            Follow Us On Instagram
          </h2>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-xs uppercase tracking-widest text-[#6B1E2E] hover:text-[#C8A24A] transition-colors border-b border-[#C8A24A]/30 pb-1"
          >
            @aishkajewels
          </a>
        </div>

        {/* ━━━ INSTAGRAM GRID ━━━ */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {posts.map((post) => (
            <div key={post.id} className="group relative aspect-square overflow-hidden bg-gray-100">
              <img
                src={post.image_url}
                alt={post.caption || "Instagram post"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                <a 
                  href={post.instagram_url || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#C8A24A] transition-colors mb-3"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                
                {post.linked_product_id && post.product_slug && (
                  <Link 
                    to={`/product/${post.product_slug}`}
                    className="px-4 py-2 bg-white text-[#6B1E2E] font-sans text-[10px] font-bold uppercase tracking-widest hover:bg-[#C8A24A] hover:text-white transition-colors"
                  >
                    Shop Product
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InstagramShop;
