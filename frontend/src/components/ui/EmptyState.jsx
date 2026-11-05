import React from 'react';
import Button from './Button';

const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}) => {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-16 px-6 max-w-md mx-auto">
      {/* Visual Accent Box */}
      <div className="relative p-8 mb-6">
        {/* Fine gold frame corners */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>

        <div className="text-[#C8A24A]" aria-hidden="true">
          {icon || (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
          )}
        </div>
      </div>

      <h3
        className="text-xl md:text-2xl font-serif text-[#6B1E2E] tracking-wide mb-3"
        style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
      >
        {title}
      </h3>
      <p className="text-[#6B1E2E]/70 font-sans text-xs tracking-wider leading-[1.8] uppercase mb-8">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
