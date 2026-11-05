import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { budgets } from '../data/budgets';

const BudgetTile = ({ budget }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Split label into prefix ("Under"/"Above") and price ("₹1999")
  const [prefix, price] = budget.label.split(' ');

  return (
    <Link
      to={budget.link}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex flex-col items-center justify-center w-full aspect-[3/4.2] group cursor-pointer transition-all duration-300 hover:scale-[1.03] select-none"
      aria-label={`Shop items ${budget.label}`}
    >
      {/* ━━━ ARCH / MEHRAB SHAPE BACKGROUND ━━━ */}
      <svg
        className="absolute inset-0 w-full h-full drop-shadow-md transition-colors duration-300 fill-[#6B1E2E] group-hover:fill-[#7A1213]"
        viewBox="0 0 100 135"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 135 L 0 50 C 0 35, 12 35, 15 35 C 20 35, 20 20, 32 20 C 40 20, 43 5, 50 0 C 57 5, 60 20, 68 20 C 80 20, 80 35, 85 35 C 88 35, 100 35, 100 50 L 100 135 Z"
        />
      </svg>

      {/* ━━━ CARD CONTENT ━━━ */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-2 text-center text-white pb-6 mt-4">
        {/* Prefix: UNDER / ABOVE */}
        <span className="font-sans text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-[#EDE0CB]/90 mb-1">
          {prefix}
        </span>

        {/* Price: ₹1999 */}
        <span className="font-sans text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#F5EDE2]">
          {price}
        </span>
      </div>

      {/* ━━━ ARROW BUTTON ━━━ */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-[#6B1E2E] shadow-md transition-transform duration-300 group-hover:scale-110">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </div>
    </Link>
  );
};

const ShopByBudget = () => {
  return (
    <section className="bg-white py-12 md:py-16 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto">
        
        {/* ━━━ SECTION HEADER ━━━ */}
        <div className="text-center mb-10">
          <h2 className="font-sans text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-[#111827] mb-1">
            SHOP BY BUDGET
          </h2>
          <p className="font-sans text-xs sm:text-sm text-gray-500">
            Describe your products, collection, content etc...
          </p>
        </div>

        {/* ━━━ ORNATE BANNER CONTAINER ━━━ */}
        <div className="relative w-full py-8 sm:py-10 md:py-12 px-6 sm:px-10 md:px-14 lg:px-20 overflow-hidden">
          
          {/* Ornate Background Frame */}
          <div className="absolute inset-0 z-0">
            {/* SVG Border & Background */}
            <svg
              className="w-full h-full text-[#F9F3EA]"
              viewBox="0 0 1400 240"
              preserveAspectRatio="none"
            >
              {/* Fill & Gold Stroke */}
              <path
                d="M 40 20 L 1360 20 C 1370 20, 1375 35, 1375 45 C 1375 55, 1365 75, 1365 95 C 1365 115, 1385 115, 1385 120 C 1385 125, 1365 125, 1365 145 C 1365 165, 1375 185, 1375 195 C 1375 205, 1370 220, 1360 220 L 40 220 C 30 220, 25 205, 25 195 C 25 185, 35 165, 35 145 C 35 125, 15 125, 15 120 C 15 115, 35 115, 35 95 C 35 75, 25 55, 25 45 C 25 35, 30 20, 40 20 Z"
                fill="currentColor"
                stroke="#C8A24A"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Decorative Mandala Graphics (Faint Background Pattern) */}
          <div className="absolute inset-y-0 left-8 md:left-16 z-0 opacity-10 pointer-events-none flex items-center justify-center">
            <svg className="w-24 h-24 md:w-36 md:h-36 text-[#C8A24A]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="35" />
              <circle cx="50" cy="50" r="25" />
              <path d="M 50 5 L 50 95 M 5 50 L 95 50 M 18 18 L 82 82 M 18 82 L 82 18" />
              <circle cx="50" cy="50" r="10" fill="currentColor" />
            </svg>
          </div>
          <div className="absolute inset-y-0 right-8 md:right-16 z-0 opacity-10 pointer-events-none flex items-center justify-center">
            <svg className="w-24 h-24 md:w-36 md:h-36 text-[#C8A24A]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
              <circle cx="50" cy="50" r="45" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="35" />
              <circle cx="50" cy="50" r="25" />
              <path d="M 50 5 L 50 95 M 5 50 L 95 50 M 18 18 L 82 82 M 18 82 L 82 18" />
              <circle cx="50" cy="50" r="10" fill="currentColor" />
            </svg>
          </div>

          {/* Hanging Traditional Diya/Lantern details */}
          <div className="absolute right-3 sm:right-6 md:right-8 top-0 z-0 opacity-40 pointer-events-none flex flex-col items-center">
            <div className="w-[1px] h-10 sm:h-14 bg-[#C8A24A]" />
            <svg className="w-4 h-6 text-[#C8A24A]" viewBox="0 0 10 15" fill="currentColor">
              <path d="M 5 0 L 7 5 L 10 9 C 10 12, 8 15, 5 15 C 2 15, 0 12, 0 9 L 3 5 Z" />
            </svg>
          </div>

          {/* ━━━ GRID OF DOME TILES ━━━ */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 md:gap-8 items-center max-w-[1200px] mx-auto py-2">
            {budgets.map((budget) => (
              <BudgetTile key={budget.id} budget={budget} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default ShopByBudget;
