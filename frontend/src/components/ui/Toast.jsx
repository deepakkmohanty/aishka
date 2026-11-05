import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'info', duration = 4000) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 7);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Absolute positioning container */}
      <div
        className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 w-full max-w-[340px] pointer-events-none"
        aria-live="polite"
        role="status"
      >
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem = ({ message, type, onClose, duration }) => {
  const typeStyles = {
    success: 'bg-white border-[#C8A24A] text-[#6B1E2E]',
    error: 'bg-red-50 border-red-200 text-red-900',
    warning: 'bg-amber-50 border-amber-200 text-amber-900',
    info: 'bg-white border-[#6B1E2E]/20 text-[#6B1E2E]',
  };

  const typeIcons = {
    success: (
      <svg className="w-4 h-4 text-[#C8A24A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    error: (
      <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    info: (
      <svg className="w-4 h-4 text-[#6B1E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 border-[0.5px] shadow-lg transition-all duration-300 animate-slide-in relative overflow-hidden ${typeStyles[type]}`}
    >
      {/* Decorative brackets to match Aishka branding */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t-[0.5px] border-r-[0.5px] border-[#C8A24A]/40"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-[0.5px] border-l-[0.5px] border-[#C8A24A]/40"></div>

      <div className="shrink-0 mt-0.5">{typeIcons[type]}</div>
      <div className="flex-1 text-[11px] font-sans font-semibold tracking-[0.1em] uppercase leading-normal">
        {message}
      </div>
      <button
        onClick={onClose}
        className="shrink-0 text-current opacity-60 hover:opacity-100 transition-opacity p-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C8A24A]"
        aria-label="Close notification"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Progress Bar timer */}
      {duration > 0 && (
        <div
          className="absolute bottom-0 left-0 h-[1.5px] bg-[#C8A24A]/70"
          style={{
            animation: `toast-progress ${duration}ms linear forwards`,
            width: '100%',
          }}
        />
      )}
    </div>
  );
};
