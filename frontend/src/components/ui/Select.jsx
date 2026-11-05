import React from 'react';

const Select = React.forwardRef(({
  label,
  options = [],
  error,
  helperText,
  id,
  className = '',
  disabled = false,
  required = false,
  placeholder = 'Select an option',
  value,
  onChange,
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
            ${disabled ? 'text-[#C8A24A]/40' : 'text-[#C8A24A] group-focus-within:text-[#6B1E2E]'}
            ${error ? 'text-red-600 group-focus-within:text-red-700' : ''}
          `}
        >
          {label}
          {required && <span className="text-[#6B1E2E] ml-1" aria-hidden="true">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          ref={ref}
          id={id}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={describedBy}
          className={`w-full bg-transparent border-0 border-b-[0.5px] text-[#6B1E2E] font-serif text-2xl px-0 pb-3 pr-8 focus:ring-0 focus:outline-none transition-colors duration-500 appearance-none cursor-pointer
            ${disabled ? 'border-[#E8C766]/20 text-[#6B1E2E]/40 cursor-not-allowed' : 'border-[#E8C766]/50 focus:border-[#6B1E2E]'}
            ${error ? 'border-red-600 focus:border-red-600' : ''}
            ${className}
          `}
          {...props}
        >
          {placeholder && (
            <option value="" className="bg-white text-[#6B1E2E]/50 font-serif">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              className="bg-white text-[#6B1E2E] font-serif"
            >
              {opt.label}
            </option>
          ))}
        </select>
        
        {/* Custom elegant chevron */}
        <div className={`absolute right-0 pointer-events-none transition-colors duration-500 ${disabled ? 'text-[#6B1E2E]/30' : 'text-[#6B1E2E] group-focus-within:text-[#C8A24A]'}`}>
          <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
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

Select.displayName = 'Select';

export default Select;
