import React, { useState, useEffect } from 'react';
import { Server, Wifi, User, Box, CheckCircle2 } from 'lucide-react';

const LoadingStep = ({ icon: Icon, label, status }: { icon: any, label: string, status: 'waiting' | 'loading' | 'done' }) => (
  <div className={`flex items-center gap-4 p-3 rounded-lg border transition-all duration-500 ${
    status === 'done' ? 'bg-emerald-500/10 border-emerald-500/20' : 
    status === 'loading' ? 'bg-violet-500/10 border-violet-500/20' : 
    'border-transparent opacity-40'
  }`}>
    <div className={`p-2 rounded-full ${
      status === 'done' ? 'bg-emerald-500/20 text-emerald-400' : 
      status === 'loading' ? 'bg-violet-500/20 text-violet-400 animate-pulse' : 
      'bg-slate-800 text-slate-500'
    }`}>
      <Icon size={16} />
    </div>
    <div className="flex-1">
      <div className={`text-sm font-medium ${
        status === 'done' ? 'text-emerald-200' : 
        status === 'loading' ? 'text-violet-200' : 
        'text-slate-500'
      }`}>
        {label}
      </div>
    </div>
    {status === 'loading' && (
      <div className="h-4 w-4 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    )}
    {status === 'done' && <CheckCircle2 size={16} className="text-emerald-400" />}
  </div>
);

export default function GameInitScreen() {
  const [loadingStep, setLoadingStep] = useState(0);

  // Simulate Loading Sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setLoadingStep(1), 800),  // 1. Server Connected
      setTimeout(() => setLoadingStep(2), 2200), // 2. P2P Established
      setTimeout(() => setLoadingStep(3), 4000), // 3. Opponent Connected (Wait longer here)
      setTimeout(() => setLoadingStep(4), 5000), // 4. All Done
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen min-w-screen bg-[#050014] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* Background Grid Perspective */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(124, 58, 237, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.3) 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             transform: 'perspective(500px) rotateX(60deg) translateY(100px) scale(1.5)'
           }} 
      />

      {/* Central Card */}
      <div className="relative z-10 w-full max-w-md p-8 flex flex-col items-center">
        
        {/* Pulsing Core Animation */}
        <div className="relative mb-12">
           <div className="absolute inset-0 bg-violet-600 blur-[60px] opacity-40 animate-pulse" />
           <div className="relative h-24 w-24 bg-gradient-to-b from-slate-900 to-black rounded-3xl border border-violet-500/50 flex items-center justify-center shadow-2xl shadow-violet-500/20 z-10">
             <Box size={40} className="text-white animate-bounce duration-[3000ms]" />
           </div>
           {/* Ring Animations */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-violet-500/30 rounded-full animate-[spin_4s_linear_infinite]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-dashed border-violet-500/20 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
        </div>

        <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Initializing Game</h2>
        <p className="text-slate-400 text-sm mb-8">Preparing your battlefield...</p>

        {/* Status Checklist */}
        <div className="w-full space-y-3">
          <LoadingStep 
            icon={Server} 
            label="Connecting to Game Server" 
            status={loadingStep >= 1 ? 'done' : 'loading'} 
          />
          <LoadingStep 
            icon={Wifi} 
            label="Establishing P2P Link" 
            status={loadingStep >= 2 ? 'done' : (loadingStep === 1 ? 'loading' : 'waiting')} 
          />
          {/* NEW STEP HERE */}
          <LoadingStep 
            icon={User} 
            label="Waiting for Opponent" 
             status={loadingStep >= 3 ? 'loading':'waiting'} 
          />
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-slate-800 rounded-full mt-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 transition-all duration-1000 ease-out"
            style={{ width: `${(loadingStep / 2) * 75}%` }}
          />
        </div>
        
        <div className="mt-4 text-xs text-slate-600 font-mono">
          SESSION ID: {Math.random().toString(36).substring(7).toUpperCase()}
        </div>

      </div>
    </div>
  );
}
