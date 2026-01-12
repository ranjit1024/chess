       
       
import React, { useState, useEffect } from 'react';
import { Trophy, ArrowRight, RotateCcw, X, Target } from 'lucide-react';
import { color } from 'bun';

const AestheticWin = ({winner}: {winner:'white' | 'black'}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isWhite = winner === 'white';

  // Config based on winner
  const theme = {
    // White: Champagne/Gold aesthetic
    // Black: Obsidian/Cyber-violet aesthetic
    gradient: isWhite 
      ? 'from-amber-200 via-orange-100 to-rose-200' 
      : 'from-indigo-400 via-purple-300 to-fuchsia-300',
    shadow: isWhite 
      ? 'shadow-[0_0_50px_-12px_rgba(251,191,36,0.3)]' 
      : 'shadow-[0_0_50px_-12px_rgba(124,58,237,0.3)]',
    button: isWhite
      ? 'bg-[#EAEAEA] text-black hover:bg-white border-white'
      : 'bg-[#1A1A1A] text-white hover:bg-black border-zinc-800'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 1. Background Overlay with Blur and Noise */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-2xl transition-opacity duration-700 ${mounted ? 'opacity-100' : 'opacity-0'}`}
   
      />
      
      {/* Noise Texture Overlay (Optional, adds "film grain" feel) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      {/* 2. Main Card */}
      <div className={`relative z-10 w-full max-w-[360px] transform transition-all duration-700 cubic-bezier(0.2, 0.8, 0.2, 1) ${mounted ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}`}>
        
        {/* Glow Effect behind card */}
        <div className={`absolute -inset-1 rounded-[32px] bg-gradient-to-b ${theme.gradient} opacity-20 blur-xl transition-all duration-1000 ${mounted ? 'opacity-40' : 'opacity-0'}`} />

        <div className={`relative overflow-hidden rounded-[30px] border border-white/10 bg-[#0F0F0F]/90 p-8 ${theme.shadow}`}>
            
            {/* Top Right Decorative Circle */}
            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${theme.gradient} blur-2xl opacity-20`} />

            {/* Content Wrapper */}
            <div className="relative flex flex-col items-center">
                
                {/* Close Icon */}
                <button className="absolute -top-2 -right-2 text-white/20 hover:text-white transition-colors">
                    <X size={20} strokeWidth={1.5} />
                </button>

                {/* Animated Icon Badge */}
                <div className="mb-6 relative">
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-tr ${theme.gradient} blur-md opacity-40 animate-pulse`} />
                    <div className="relative h-16 w-16 rounded-full border border-white/10 bg-black/50 flex items-center justify-center backdrop-blur-md">
                        <Trophy size={28} className={isWhite ? 'text-amber-100' : 'text-purple-200'} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Typography */}
                <h2 className="text-3xl font-medium text-white tracking-tight mb-1 text-center font-[Inter]">
                   {isWhite ? 'You' : 'You'}  Win
                </h2>
                
                <div className={`flex items-center gap-2 mb-8 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02]`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${isWhite ? 'bg-amber-400' : 'bg-purple-400'}`}></span>
                    <span className="text-xs font-medium text-neutral-400 uppercase tracking-widest">{"Check Mate"}</span>
                </div>

                {/* Stats Grid (Minimal) */}

                {/* Buttons */}
                <div className="w-full space-y-3">
                    <button 
                     
                        className={`w-full py-4 rounded-2xl font-semibold text-sm tracking-wide transition-all active:scale-[0.98] border ${theme.button} shadow-lg relative overflow-hidden group`}
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                           <RotateCcw size={16} /> Play Again
                        </span>
                    </button>

            
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AestheticWin;