import React from 'react';

const ModernLandingPage = () => {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      
      {/* Ambient Background Glows */}
      <div className="fixed top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-1 p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
          <div className="px-4 py-2 font-bold text-sm tracking-wide">FaceCheck</div>
          <div className="h-4 w-px bg-white/10 mx-1"></div>
          <a href="#" className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors">Feed</a>
          <a href="#" className="px-4 py-2 text-sm text-neutral-400 hover:text-white transition-colors">Rankings</a>
          <button className="px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-neutral-200 transition-colors">
            Play Beta
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-20 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Live Video Matchmaking Active
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
            Checkmate, <br />
            <span className="italic font-serif font-light text-indigo-200/90">Personalized.</span>
          </h1>
          
          <p className="text-lg text-neutral-400 max-w-xl mx-auto mb-10 leading-relaxed">
            The first WebRTC-native chess platform. See your opponent's hesitation in real-time.
          </p>

          <div className="flex justify-center gap-4">
            <button className="group relative px-8 py-4 bg-white text-black rounded-xl font-semibold overflow-hidden">
              <div className="absolute hover:curspo inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              Play Game
            </button>
            
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-4 h-auto md:h-[600px]">
          
          {/* Card 1: Main Gameplay Interface (Large) */}
          <div className="md:col-span-4 md:row-span-2 bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-neutral-400 font-medium">Match in Progress</h3>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
              </div>
            </div>

            {/* Simulated 3D Board Interface */}
            <div className="relative h-full w-full flex flex-col items-center">
              <div className="w-full max-w-md aspect-square bg-[#151515] rounded-xl border border-white/5 p-4 relative shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02] group-hover:rotate-1">
                {/* Video Overlay (Floating) */}
                <div className="absolute -right-8 -top-8 w-32 h-40 bg-neutral-800 rounded-xl border-2 border-indigo-500/30 shadow-2xl z-20 overflow-hidden">
                  <div className="w-full h-full bg-neutral-900 flex items-center justify-center relative">
                    <span className="text-2xl">😠</span>
                    <div className="absolute bottom-2 left-2 text-[10px] font-mono bg-black/50 px-1 rounded">OPPONENT</div>
                  </div>
                </div>

                {/* Chess Grid */}
                <div className="grid grid-cols-8 h-full w-full rounded border border-white/5 overflow-hidden">
                  {[...Array(64)].map((_, i) => (
                    <div key={i} className={`${(Math.floor(i / 8) + i) % 2 === 0 ? 'bg-neutral-800' : 'bg-[#1a1a1a]'}`}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Features / WebRTC */}
          <div className="md:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 flex flex-col justify-between group overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-all group-hover:bg-indigo-500/20"></div>
             <div>
               <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-4 border border-indigo-500/20">
                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
               </div>
               <h3 className="text-xl font-semibold text-white mb-2">Crystal Clear HD</h3>
               <p className="text-sm text-neutral-500">Peer-to-peer 1080p video streams with sub-100ms latency.</p>
             </div>
             <div className="mt-8">
               <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-500 w-2/3 animate-pulse"></div>
               </div>
               <div className="flex justify-between mt-2 text-xs text-neutral-600 font-mono">
                 <span>BITRATE</span>
                 <span>4500 KBPS</span>
               </div>
             </div>
          </div>

          {/* Card 3: Social / Stats */}
          <div className="md:col-span-2 bg-[#0A0A0A] border border-white/10 rounded-3xl p-6 relative group overflow-hidden">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -ml-10 -mb-10 transition-all group-hover:bg-purple-500/20"></div>
            
            <div className="flex flex-col h-full justify-between relative z-10">
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">Global Leaderboard</h3>
                <p className="text-sm text-neutral-500">Compete for the top spot.</p>
              </div>
              
              <div className="space-y-3 mt-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between p-2 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-neutral-700 to-neutral-600"></div>
                      <span className="text-sm font-medium text-neutral-300">Player_{item}</span>
                    </div>
                    <span className="text-xs font-mono text-indigo-400">24{item}0 ELO</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
        
        {/* Footer Area */}
        <div className="mt-20 flex justify-between items-center border-t border-white/5 pt-10 text-neutral-500 text-sm">
          <p>Designed for the future of chess.</p>
          <div className="flex gap-4">
             <span className="hover:text-white cursor-pointer">Twitter</span>
             <span className="hover:text-white cursor-pointer">Discord</span>
          </div>
        </div>

      </main>
    </div>
  );
};

export default ModernLandingPage;
