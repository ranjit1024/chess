import React, { useState, useEffect } from 'react';
import { Server, Wifi, User, Box, CheckCircle2 } from 'lucide-react';

const LoadingStep = ({ icon: Icon, label, status }: { icon: any, label: string, status: 'waiting' | 'loading' | 'done' }) => (
  <div className={`flex items-center gap-4 p-3 rounded-md border transition-all duration-500 ${
    status === 'done' ? 'bg-white/10 border-white/20' : 
    status === 'loading' ? 'bg-white/5 border-white/10' : 
    'border-transparent opacity-40'
  }`}>
    <div className={`p-2 rounded-sm ${
      status === 'done' ? 'bg-white text-black' : 
      status === 'loading' ? 'bg-zinc-800 text-white animate-pulse' : 
      'bg-zinc-950 text-zinc-600'
    }`}>
      <Icon size={16} />
    </div>
    <div className="flex-1">
      <div className={`text-sm font-bold tracking-tight ${
        status === 'done' ? 'text-white' : 
        status === 'loading' ? 'text-zinc-300' : 
        'text-zinc-500'
      }`}>
        {label}
      </div>
    </div>
    {status === 'loading' && (
      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
    )}
    {status === 'done' && <CheckCircle2 size={16} className="text-white" />}
  </div>
);

export default function GameInitScreen() {
  const [loadingStep, setLoadingStep] = useState(0);
  const [sessionId, setSessionId] = useState('');

  // Simulate Loading Sequence
  useEffect(() => {
    setSessionId(Math.random().toString(36).substring(7).toUpperCase());
    
    const timers = [
      setTimeout(() => setLoadingStep(1), 800),  // 1. Server Connected
      setTimeout(() => setLoadingStep(2), 2200), // 2. P2P Established
      setTimeout(() => setLoadingStep(3), 4000), // 3. Opponent Connected
      setTimeout(() => setLoadingStep(4), 5000), // 4. All Done
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen min-w-screen bg-black text-zinc-300 flex flex-col items-center justify-center relative overflow-hidden font-sans selection:bg-zinc-100 selection:text-black">
      
      {/* Minimalist Grid Perspective Background */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center opacity-60">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)_translateY(100px)_scale(1.5)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      {/* Central Card */}
      <div className="relative z-10 w-full max-w-md p-8 flex flex-col items-center">
        
        {/* Pulsing Core Animation - High Contrast */}
        <div className="relative mb-12">
           <div className="absolute inset-0 bg-white blur-[80px] opacity-[0.07] animate-pulse" />
           <div className="relative h-24 w-24 bg-zinc-950 rounded-xl border border-white/20 flex items-center justify-center shadow-2xl z-10">
             <Box size={40} className="text-white animate-bounce duration-[3000ms]" />
           </div>
           {/* Ring Animations */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white/10 rounded-full animate-[spin_4s_linear_infinite]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-dashed border-white/5 rounded-full animate-[spin_10s_linear_infinite_reverse]" />
        </div>

        <h2 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase">Initializing</h2>
        <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest mb-8">Securing connection protocols...</p>

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
          <LoadingStep 
            icon={User} 
            label="Waiting for Opponent" 
             status={loadingStep >= 3 ? 'loading' : 'waiting'} 
          />
        </div>

        {/* Brutalist Progress Bar */}
        <div className="w-full h-1 bg-zinc-900 mt-10 overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-1000 ease-out"
            style={{ width: `${(loadingStep / 2) * 75}%` }}
          />
        </div>
        
        <div className="mt-6 flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
          <div className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
            Session ID: <span className="text-white">{sessionId}</span>
          </div>
        </div>

      </div>
    </div>
  );
}