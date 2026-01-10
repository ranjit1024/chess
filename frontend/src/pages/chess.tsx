import React, { useState, useEffect } from 'react';
import { User, Clock, CheckCircle2, Trophy, Video, ChevronRight, Play } from 'lucide-react';

// --- Types ---
type Screen = 'home' | 'lobby' | 'game';

// --- Sub-Component: Player Status Row ---
const PlayerStatus = ({ name, isReady, isYou }: { name: string, isReady: boolean, isYou?: boolean }) => (
  <div className={`
    flex items-center justify-between p-4 rounded-xl border transition-all duration-500
    ${isReady 
      ? 'bg-violet-500/10 border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.1)] translate-x-0 opacity-100' 
      : 'bg-white/5 border-white/5 opacity-80'
    }
  `}>
    <div className="flex items-center gap-3">
      <div className={`
        p-2 rounded-full flex items-center justify-center transition-colors duration-300
        ${isReady 
          ? 'bg-linear-to-br from-violet-600 to-fuchsia-600 text-white shadow-lg' 
          : 'bg-white/10 text-slate-400'
        }
      `}>
        {isYou ? <User size={18} strokeWidth={2.5} /> : <Trophy size={18} strokeWidth={2.5} />}
      </div>
      <div className="flex flex-col">
        <span className={`text-sm font-bold tracking-wide ${isReady ? 'text-white' : 'text-slate-400'}`}>
          {name}
        </span>
        <span className="text-xs font-medium text-slate-500">
          {isYou ? '(You)' : '1200 ELO'}
        </span>
      </div>
    </div>

    <div className="flex items-center gap-2">
      {isReady ? (
        <span className="flex items-center gap-1.5 text-xs font-bold text-violet-200 bg-violet-500/20 px-3 py-1.5 rounded-full border border-violet-500/30 animate-in fade-in zoom-in duration-300">
          <CheckCircle2 size={14} className="text-violet-400" />
          READY
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-white/5 px-3 py-1.5 rounded-full animate-pulse">
          <Clock size={14} />
          WAITING
        </span>
      )}
    </div>
  </div>
);

// --- Main Application Component ---
export default function ChessApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [opponentReady, setOpponentReady] = useState(false);

  // Simulate opponent joining after entering lobby
  useEffect(() => {
    if (currentScreen === 'lobby') {
      const timer = setTimeout(() => setOpponentReady(true), 1500); // Opponent ready after 1.5s
      return () => clearTimeout(timer);
    } else {
      setOpponentReady(false);
    }
  }, [currentScreen]);

  // --- SCREEN 1: HOME PAGE ---
  if (currentScreen === 'home') {
    return (
      <div className="min-h-screen bg-[#050014] flex flex-col items-center justify-center relative overflow-hidden font-sans">
         {/* Background Decoration */}
         <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
         
         <div className="z-10 text-center space-y-8 p-6">
            <div className="space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-violet-300 text-xs font-medium tracking-wider mb-4">
                CHESSMATE V2.0
              </span>
              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 tracking-tight">
                Play Chess <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                  Face to Face
                </span>
              </h1>
            </div>

            <button 
              onClick={() => setCurrentScreen('lobby')}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_60px_rgba(255,255,255,0.5)]"
            >
              Play Now
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
         </div>
      </div>
    );
  }

  // --- SCREEN 2: LOBBY (The design you requested) ---
  if (currentScreen === 'lobby') {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-[#050014] overflow-hidden font-sans">
        {/* Ambient Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        {/* Glass Card */}
        <div className="relative w-full max-w-md mx-4 z-10 animate-in fade-in zoom-in-95 duration-500">
          <div className="relative backdrop-blur-xl bg-[#0F0529]/80 border border-white/10 shadow-2xl shadow-violet-900/20 rounded-3xl overflow-hidden ring-1 ring-white/5">
            
            {/* Header */}
            <div className="p-6 pb-2 text-center">
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-violet-950/50 border border-violet-500/20">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
                </span>
                <span className="text-[10px] font-bold text-violet-300 uppercase tracking-wider">v2.0 Lobby</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Match Found</h2>
              <p className="text-slate-400 text-sm">Waiting for both players to accept...</p>
            </div>

            {/* Players */}
            <div className="p-6 space-y-3">
              <PlayerStatus name="Ranjit Das" isReady={true} isYou={true} />
              <PlayerStatus name="Opponent" isReady={opponentReady} />
            </div>

            {/* Footer Action */}
            <div className="p-6 pt-2">
              <button 
                onClick={() => setCurrentScreen('game')}
                disabled={!opponentReady}
                className={`
                  group relative w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300
                  ${opponentReady 
                    ? 'bg-violet-600 hover:bg-violet-500 text-white shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] active:scale-[0.98] cursor-pointer' 
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-50'
                  }
                `}
              >
                {opponentReady ? (
                  <>
                    <Video size={20} className="group-hover:animate-pulse" />
                    <span>Click to Start Match</span>
                  </>
                ) : (
                  <span>Waiting for Opponent...</span>
                )}
              </button>
              
              <div className="mt-5 flex items-center justify-center gap-6 text-[10px] font-semibold text-slate-600 uppercase tracking-widest">
                <span>React.js</span>
                <span className="h-1 w-1 rounded-full bg-slate-700" />
                <span>WebRTC</span>
                <span className="h-1 w-1 rounded-full bg-slate-700" />
                <span>WebSocket</span>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    );
  }

  // --- SCREEN 3: GAME STARTED (Placeholder) ---
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white font-mono">
      <div className="text-center animate-pulse">
        <h1 className="text-4xl font-bold text-violet-500 mb-4">GAME INITIALIZED</h1>
        <p className="text-slate-400">Connecting WebRTC Stream...</p>
        <button 
          onClick={() => setCurrentScreen('home')}
          className="mt-8 text-sm underline text-slate-600 hover:text-white"
        >
          Reset Demo
        </button>
      </div>
    </div>
  );
}
