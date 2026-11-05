import React from 'react';

const Input = React.forwardRef(({
  label,
  error,
  helperText,
  id,
  type = 'text',
  className = '',
  disabled = false,
  required = false,
  placeholder = '',
  ...props
}, ref) => {
  const errorId = error ? `${id}-error` : null;
  const helperId = helperText ? `${id}-helper` : null;
  const describedBy = [errorId, helperId].filter(Boolean).join(' ') || undefined;

  return (
    <div className="relative w-full group flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className={`block font-sans text-[9px] uppercase tracking-[0.3em] font-semibold mb-3 transition-colors duration-500
            ${disabled ? 'text-[#6B1E2E]/40' : 'text-[#6B1E2E]/80 group-focus-within:text-[#6B1E2E]'}
            ${error ? 'text-red-600 group-focus-within:text-red-700' : ''}
          `}
        >
          {label}
          {required && <span className="text-[#6B1E2E] ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        id={id}
        required={required}
        disabled={disabled}
        placeholder={placeholder}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={describedBy}
        className={`w-full bg-transparent border-0 border-b-[0.5px] text-[#6B1E2E] font-serif text-2xl px-0 pb-3 focus:ring-0 focus:outline-none transition-colors duration-500 placeholder:text-[#6B1E2E]/20 placeholder:italic placeholder:font-serif
          ${disabled ? 'border-[#E8C766]/20 text-[#6B1E2E]/40 cursor-not-allowed' : 'border-[#E8C766]/50 focus:border-[#6B1E2E]'}
          ${error ? 'border-red-600 focus:border-red-600' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span
          id={errorId}
          className="mt-2 text-[11px] text-red-600 font-sans tracking-wide font-medium"
          role="alert"
        >
          {error}
        </span>
      )}
      {!error && helperText && (
        <span
          id={helperId}
          className="mt-2 text-[11px] text-[#6B1E2E]/60 font-sans tracking-wide"
        >
          {helperText}
        </span>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
