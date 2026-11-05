import React from 'react';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeClasses[size] || sizeClasses.md} ${className}`} aria-hidden="true">
      {/* Outer elegant rotating ring */}
      <svg
        className="animate-spin text-[#C8A24A] w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V1.5C6.201 1.5 1.5 6.201 1.5 12H4zm2 5.291A7.962 7.962 0 014 12H1.5c0 2.898 1.01 5.56 2.682 7.643l1.818-1.352z"
        />
      </svg>
      {/* Small center gold sparkle dot for luxury branding */}
      <div className="absolute w-1 h-1 bg-[#C8A24A] rounded-full"></div>
    </div>
  );
};

export default Spinner;
