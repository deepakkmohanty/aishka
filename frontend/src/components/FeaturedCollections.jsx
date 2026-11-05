import React from 'react';
import { Link } from 'react-router-dom';
import ringsImg from '../assets/rings.png';
import earringsImg from '../assets/earrings.png';
import necklacesImg from '../assets/necklaces.png';
import braceletsImg from '../assets/bracelets.png';

const featuredItems = [
  {
    id: 'rings',
    name: 'Rings',
    path: '/collections?category=Rings',
    image: ringsImg,
    gridClass: 'md:col-span-6 md:row-span-2 h-[380px] md:h-auto',
    ariaLabel: 'Shop Rings'
  },
  {
    id: 'earrings',
    name: 'Earrings',
    path: '/collections?category=Earrings',
    image: earringsImg,
    gridClass: 'md:col-span-6 md:row-span-1 h-[250px] md:h-auto',
    ariaLabel: 'Shop Earrings'
  },
  {
    id: 'necklaces',
    name: 'Necklaces & Chains',
    path: '/collections?category=Necklaces',
    image: necklacesImg,
    gridClass: 'md:col-span-6 md:row-span-1 h-[250px] md:h-auto',
    ariaLabel: 'Shop Necklaces and Chains'
  },
  {
    id: 'bracelets',
    name: 'Kada & Bracelets',
    path: '/collections?category=Bracelets',
    image: braceletsImg,
    gridClass: 'md:col-span-12 md:row-span-1 h-[220px] md:h-auto',
    ariaLabel: 'Shop Kada and Bracelets'
  }
];

const FeaturedCollections = () => {
  return (
    <section className="w-full bg-brand-cream py-24 px-6 md:px-12 lg:px-24 border-b border-brand-gold-light/20">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Label & Divider */}
        <div className="flex items-center gap-4 select-none mb-3">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-brand-gold whitespace-nowrap">
            Collections
          </span>
          <div className="flex-1 h-[0.5px] bg-brand-gold/25"></div>
        </div>

        {/* Section Heading */}
        <h2 className="font-serif text-3.5xl md:text-5xl text-brand-wine tracking-wide font-medium mb-12">
          Browse by Jewellery Type
        </h2>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:auto-rows-[300px] gap-8">
          {featuredItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`relative overflow-hidden w-full clip-gemstone group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream rounded-sm ${item.gridClass}`}
              aria-label={item.ariaLabel}
            >
              {/* Full-bleed category image */}
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                loading="lazy"
              />

              {/* Gradient overlay: starts at 45% opacity, increases to 70% on hover */}
              <div className="absolute inset-0 bg-black/45 group-hover:bg-black/70 transition-colors duration-500 mix-blend-multiply pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none"></div>

              {/* Bottom Card Content */}
              <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-10 flex flex-col items-start text-left">
                {/* Thin gold rule above Category Name */}
                <div className="w-12 h-[1px] bg-brand-gold/60 mb-4 transform scale-x-100 origin-left transition-transform duration-500 group-hover:bg-brand-gold group-hover:scale-x-125"></div>

                {/* Category Name in display serif */}
                <h3 className="font-serif text-3.5xl sm:text-4xl text-brand-cream tracking-wide leading-tight">
                  {item.name}
                </h3>

                {/* Explore indicator (fades/slides in on hover) */}
                <span className="font-sans text-[9px] uppercase tracking-[0.25em] text-brand-gold-light mt-3 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500 ease-out font-semibold">
                  Explore <span className="text-xs font-normal">&rarr;</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCollections;
