import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const Modal = ({
  isOpen,
  onClose,
  title,
  size = 'md',
  children,
}) => {
  const modalRef = useRef(null);
  const previousFocus = useRef(null);

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement;
      document.body.style.overflow = 'hidden';

      // Simple keyboard focus trap inside the modal
      const focusableElementsString = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      const modal = modalRef.current;
      if (modal) {
        const focusableElements = modal.querySelectorAll(focusableElementsString);
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (firstFocusableElement) {
          firstFocusableElement.focus();
        }

        const handleKeyDown = (e) => {
          if (e.key === 'Tab') {
            if (e.shiftKey) {
              if (document.activeElement === firstFocusableElement) {
                lastFocusableElement.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastFocusableElement) {
                firstFocusableElement.focus();
                e.preventDefault();
              }
            }
          } else if (e.key === 'Escape') {
            onClose();
          }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }
    } else {
      document.body.style.overflow = '';
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-xl',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl',
    full: 'max-w-full h-full m-0 rounded-none',
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      {/* Backdrop overlay with blur */}
      <div
        className="fixed inset-0 bg-[#1A070B]/70 backdrop-blur-[2px] transition-opacity duration-500"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className={`relative w-full bg-white border-[0.5px] border-[#C8A24A]/60 shadow-2xl transition-all duration-500 overflow-hidden flex flex-col ${sizeClasses[size] || sizeClasses.md} z-10`}
      >
        {/* Fine gold corner brackets */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
        <div className="absolute top-0 right-0 w-3 h-3 border-t-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-[0.5px] border-l-[0.5px] border-[#C8A24A]"></div>
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-[0.5px] border-r-[0.5px] border-[#C8A24A]"></div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E8C766]/20 px-6 py-4.5 bg-white">
          <h2
            id="modal-title"
            className="text-lg md:text-xl font-serif text-[#6B1E2E] tracking-wide"
            style={{ fontFamily: "'Cormorant Garamond', 'Playfair Display', serif" }}
          >
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-[#6B1E2E]/60 hover:text-[#C8A24A] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A24A] p-1 rounded-sm"
            aria-label="Close dialog"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="px-6 py-6 overflow-y-auto max-h-[75vh] text-[#6B1E2E]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
