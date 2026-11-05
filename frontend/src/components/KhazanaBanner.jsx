import React from 'react';
import { Link } from 'react-router-dom';
import khazanaBannerImg from '../assets/khazana_banner.png';

const KhazanaBanner = () => {
  return (
    <section className="w-full bg-white py-6 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto overflow-hidden rounded-xl shadow-lg relative group cursor-pointer">
        <Link to="/collections">
          {/* Main Banner Image with hover zoom effect */}
          <div className="relative overflow-hidden aspect-[3.5/1] min-h-[180px] md:min-h-[300px] lg:min-h-[400px]">
            <img
              src={khazanaBannerImg}
              alt="Aishka - Where Tradition Meets Timeless Beauty"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Elegant overlay to enhance readability and feel premium */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/10 mix-blend-multiply" />
            
            {/* Subtle Gold/Amber Glow Overlay on Hover */}
            <div className="absolute inset-0 bg-[#C8A24A]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            {/* Double Border Frame inside the banner */}
            <div className="absolute inset-3 border border-[#C8A24A]/20 rounded-lg pointer-events-none group-hover:border-[#C8A24A]/40 transition-colors duration-500">
              <div className="absolute inset-1 border border-[#C8A24A]/10 rounded-md pointer-events-none" />
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default KhazanaBanner;
