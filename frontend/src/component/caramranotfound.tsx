import React, { useState, useEffect } from 'react';

const Toast = ({ type = 'info',  title, message, onClose  }:any) => {
  const [isVisible, setIsVisible] = useState(true);

  // Auto-dismiss logic (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
       
      setTimeout(onClose, 300); // Wait for animation to finish before unmounting
    }, 4000); // Disappears after 4 seconds
    return () => clearTimeout(timer);
  }, [onClose]);

  // styles based on type
  const styles = {
    success: {
      icon: (
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
      ),
      border: "border-green-500/20",
      bg: "bg-green-500/10"
    },
    error: {
      icon: (
        <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      ),
      border: "border-red-500/20",
      bg: "bg-red-500/10"
    },
    info: {
      icon: (
        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      ),
      border: "border-blue-500/20",
      bg: "bg-blue-500/10"
    }
  };

  const currentStyle = styles['error'];

  return (
    <div 
      className={`
        fixed bottom-5 right-5 z-50 flex items-start gap-4 p-4 
        w-full max-w-sm rounded-xl border backdrop-blur-md shadow-2xl
        transition-all duration-300 ease-in-out
        ${currentStyle.border}
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
        bg-gray-900/90
      `}
      role="alert"
    >
      {/* Icon Wrapper */}
      <div className={`p-2 rounded-full ${currentStyle.bg}`}>
        {currentStyle.icon}
      </div>

      {/* Content */}
      <div className="flex-1 pt-0.5">
        <h4 className="text-sm font-semibold text-white">
          {title}
        </h4>
        <p className="mt-1 text-sm text-gray-400">
          {message}
        </p>
      </div>

      {/* Close Button */}
      <button 
        onClick={() => setIsVisible(false)}
        className="text-gray-500 hover:text-white transition-colors pt-0.5"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      {/* Optional: Progress Bar at bottom */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-current opacity-20 animate-shrink w-full rounded-b-xl overflow-hidden">
         <div 
           className={`h-full ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`} 
           style={{ animation: 'shrink 4s linear forwards' }}
         ></div>
      </div>
      
      {/* Inline styles for the shrink animation */}
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default Toast;