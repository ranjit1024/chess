import React, { useState, useEffect } from 'react';
import { Unplug, X } from 'lucide-react';

const CenterGameNotification = ({color}:{color:"white" | "black" }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    // 1. Overlay Container: Centers the content and dims the background slightly
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      
      {/* 2. The Card: Modern dark aesthetics with glass border */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/95 shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Top Gradient Line for aesthetic pop */}
        <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-80"></div>

        <div className="flex flex-col items-center p-8 text-center">
          
          {/* Icon Circle */}
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500 ring-1 ring-inset ring-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
            <Unplug size={32} />
          </div>

          {/* Main Text */}
          <h3 className="mb-1 text-xl font-bold text-white tracking-tight">
            Player Disconnected
          </h3>
          
          <p className="text-zinc-400 mb-6">
            <span className="font-semibold text-white">{color.toUpperCase()}</span> has left the match.
          </p>

          {/* Action Button */}
          <button 
            onClick={() => setIsVisible(false)}
            className="group relative flex w-full justify-center rounded-lg bg-white py-2.5 text-sm font-semibold text-zinc-900 transition-all hover:bg-zinc-200 active:scale-95"
          >
            Dismiss
          </button>
        </div>

        {/* Decorative background grid pattern (Optional) */}
        <div className="absolute inset-0 -z-10 opacity-[0.03]" 
             style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
        </div>
        
      </div>
    </div>
  );
};

export default CenterGameNotification;