import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BeautifulChessLanding: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const route = useNavigate()
  // Handle scroll for navbar glass effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30 overflow-x-hidden font-sans">
      
      {/* 1. ANIMATED AURORA BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Deep mesh gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-indigo-900/20 blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-violet-900/20 blur-[120px] animate-[pulse_10s_ease-in-out_infinite_reverse]" />
        
        {/* Moving 'Aurora' beams */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] animate-[ping_7s_cubic-bezier(0,0,0.2,1)_infinite]" />
        
        {/* Grain overlay for texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay"></div>
      </div>

      {/* 2. FLOATING GLASS NAVBAR */}
      <nav 
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl transition-all duration-500 ${
          scrolled ? 'bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/50 py-3' : 'bg-transparent py-5'
        } rounded-full px-6 flex items-center justify-between`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-xl">♛</span>
          </div>
          <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            ChessMate
          </span>
        </div>

        

        <div className="flex items-center gap-4">
        
          <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-indigo-50 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] transform hover:-translate-y-0.5">
            Play Now
          </button>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative pt-40 pb-32 px-6 z-10 max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-10">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-white/80 tracking-wide uppercase">
              Live Multiplayer Beta
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[1.1] max-w-5xl mx-auto">
            The Game of Kings, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 animate-gradient bg-[length:200%_auto]">
              Reimagined Face-to-Face.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto font-light leading-relaxed">
            Experience chess in stunning HD. Connect via WebRTC video, analyze with Stockfish 16, and climb the global leaderboards in style.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-5 pt-4 w-full justify-center">
            <button className="group relative px-8 py-4 bg-indigo-600 rounded-2xl font-bold text-white shadow-[0_10px_40px_-10px_rgba(79,70,229,0.5)] overflow-hidden transition-all hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-violet-600" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span onClick={()=>{
                route("/chess")
              }} className="relative z-10 flex items-center justify-center gap-2">
                Start Match
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </span>
            </button>
            
          </div>
        </div>

        {/* 4. BEAUTIFUL 3D BOARD VISUALIZATION */}
        <div className="mt-24 relative perspective-2000 group">
          {/* Glow beneath the board */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-indigo-500/10 rounded-full blur-[100px]" />
          
          <div className="relative transform rotate-x-[20deg] scale-90 group-hover:rotate-x-[10deg] group-hover:scale-95 transition-all duration-1000 ease-out-expo">
            <div className="bg-[#0f0f13]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/5">
              
              {/* Board Header (Video Feed Simulation) */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full ring-2 ring-indigo-500/50 p-0.5">
                     <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Opponent" className="w-full h-full rounded-full bg-indigo-900" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">GrandMaster_Alex</h3>
                    <div className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-xs text-emerald-400 font-medium tracking-wide">CONNECTED</span>
                    </div>
                  </div>
                </div>
                <div className="text-3xl font-mono text-white/90 tabular-nums">10:00</div>
              </div>

              {/* The Chess Grid */}
              <div className="aspect-[16/9] md:aspect-square max-h-[600px] mx-auto bg-[#1a1a20] rounded-xl overflow-hidden grid grid-cols-8 border border-white/5 shadow-inner">
                {Array.from({ length: 64 }).map((_, i) => {
                  const row = Math.floor(i / 8);
                  const col = i % 8;
                  const isBlack = (row + col) % 2 === 1;
                  return (
                    <div 
                      key={i} 
                      className={`${
                        isBlack ? 'bg-white/5' : 'bg-transparent'
                      } flex items-center justify-center text-3xl md:text-5xl cursor-pointer hover:bg-indigo-500/20 transition-colors duration-200`}
                    >
                      {/* Sparse pieces for aesthetic */}
                      {i === 12 && <span className="drop-shadow-lg text-white">♟</span>}
                      {i === 28 && <span className="drop-shadow-lg text-indigo-300">♞</span>}
                      {i === 60 && <span className="drop-shadow-lg text-white/90">♔</span>}
                      {/* Highlight move suggestion */}
                      {i === 45 && <div className="w-4 h-4 rounded-full bg-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.8)]" />}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Controls */}
              <div className="flex justify-center gap-6 mt-6 pb-2">
                {['🎤', '📷', '🏳️', '⚙️'].map((icon, idx) => (
                   <button key={idx} className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-xl backdrop-blur-md transition-all hover:scale-110 active:scale-95">
                      {icon}
                   </button>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 5. MINIMALIST FEATURES GRID */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
           {[
              { title: "Crystal Clear Video", desc: "Peer-to-peer WebRTC streaming for latency-free face reveals.", icon: "🎥" },
              { title: "Post-Game Analysis", desc: "Deep engine analysis to learn from your blunders instantly.", icon: "🧠" },
              { title: "Global Tournaments", desc: "Compete in weekly prize pools with verified players.", icon: "🏆" }
           ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-2">
                 <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                 </div>
                 <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors">{feature.title}</h3>
                 <p className="text-white/50 leading-relaxed">
                    {feature.desc}
                 </p>
              </div>
           ))}
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="py-12 text-center text-white/30 text-sm border-t border-white/5">
        <p>© 2025 ChessMate. Crafted for the love of the game.</p>
      </footer>
    </div>
  );
};

export default BeautifulChessLanding;
