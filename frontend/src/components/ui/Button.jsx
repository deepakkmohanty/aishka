import React from 'react';
import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon = null,
  rightIcon = null,
  as: Component = 'button',
  className = '',
  ...props
}) => {
  // Brand color matching Aishka palettes
  const variantStyles = {
    primary: 'border-[0.5px] border-[#6B1E2E] bg-[#6B1E2E] text-[#F5EDE2] hover:bg-transparent hover:text-[#6B1E2E]',
    secondary: 'border-[0.5px] border-[#6B1E2E] bg-transparent text-[#6B1E2E] hover:bg-[#6B1E2E] hover:text-[#F5EDE2]',
    outline: 'border-[0.5px] border-[#C8A24A] bg-transparent text-[#C8A24A] hover:bg-[#C8A24A] hover:text-[#F5EDE2]',
    ghost: 'bg-transparent text-[#6B1E2E] hover:bg-[#6B1E2E]/10',
    gold: 'border-[0.5px] border-[#C8A24A] bg-[#C8A24A] text-[#F5EDE2] hover:bg-transparent hover:text-[#C8A24A]',
  };

  const sizeStyles = {
    sm: 'text-[9px] py-2 px-6 tracking-[0.2em] font-semibold min-h-[44px]',
    md: 'text-[10px] py-3.5 px-10 tracking-[0.25em] font-semibold min-h-[44px] md:min-h-[48px]',
    lg: 'text-[11px] py-4 px-14 tracking-[0.3em] font-bold min-h-[48px] md:min-h-[52px]',
  };

  const baseStyles = 'inline-flex items-center justify-center font-sans uppercase transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F5EDE2] select-none text-center rounded';
  
  const isLink = Component === Link || Component === 'a';
  const isActuallyDisabled = disabled || isLoading;
  const disabledStyles = isActuallyDisabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer';

  const combinedClassName = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${disabledStyles} ${className}`;

  const renderContent = () => (
    <>
      {isLoading && (
        <Spinner size="sm" className="mr-2.5 text-current shrink-0" />
      )}
      {!isLoading && leftIcon && <span className="mr-2 inline-flex items-center shrink-0">{leftIcon}</span>}
      <span className="truncate">{children}</span>
      {!isLoading && rightIcon && <span className="ml-2 inline-flex items-center shrink-0">{rightIcon}</span>}
    </>
  );

  if (isActuallyDisabled && Component === Link) {
    return (
      <span className={combinedClassName} aria-disabled="true" role="link" {...props}>
        {renderContent()}
      </span>
    );
  }

  return (
    <Component
      className={combinedClassName}
      disabled={isActuallyDisabled && !isLink ? true : undefined}
      aria-busy={isLoading ? 'true' : undefined}
      aria-disabled={isActuallyDisabled ? 'true' : undefined}
      {...props}
    >
      {renderContent()}
    </Component>
  );
};

export default Button;
