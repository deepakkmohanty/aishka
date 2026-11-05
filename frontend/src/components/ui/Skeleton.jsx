import React from 'react';

const Skeleton = ({ className = '', variant = 'rect' }) => {
  const variantClasses = {
    rect: 'rounded-none', // Luxury aesthetic focuses on clean, sharp geometric lines
    circle: 'rounded-full',
    rounded: 'rounded-sm',
  };

  return (
    <div
      className={`animate-pulse bg-white ${variantClasses[variant] || variantClasses.rect} ${className}`}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
