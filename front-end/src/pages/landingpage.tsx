import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ModernLandingPage = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden">
      
      {/* Enhanced Ambient Background with Mouse Tracking */}
      <div 
        className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-r from-indigo-600/20 via-purple-600/20 to-pink-600/15 rounded-full blur-[150px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` }}
      />
      <div 
        className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-l from-purple-600/20 via-blue-600/20 to-cyan-600/15 rounded-full blur-[150px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{ transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)` }}
      />
      
      {/* Grain Texture Overlay for Depth */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      {/* Floating Navbar with Glassmorphism */}
      <nav className="fixed max-md:hidden top-6 left-1/2 -translate-x-1/2 z-50 animate-[slideDown_0.5s_ease-out] ">
        <div className="flex items-center gap-1 p-1.5 bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] rounded-full shadow-2xl max-md:p-0 hover:border-white/[0.15] transition-all duration-300">
          <div className="px-5 py-2.5 font-bold text-sm tracking-wider bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            FACECHECK
          </div>
          <div className="h-5 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent mx-1"></div>
          <a href="#" className="px-4 py-2.5 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200">Feed</a>
          <a href="#" className="px-4 py-2.5 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200">Rankings</a>
          <a href="#" className="px-4 py-2.5 text-sm text-neutral-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200">How It Works</a>
          <button 
            onClick={() => navigate("/play")}
            className="group relative px-6 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">Play Beta</span>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-40 pb-20 relative z-10">
        
        {/* Hero Section with Enhanced Typography */}
        <div className="text-center mb-32">
          {/* Status Badge with Improved Animation */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-white/[0.06] to-white/[0.03] border border-white/10 text-xs font-medium text-indigo-300 mb-8 hover:border-indigo-400/30 transition-all duration-300 group cursor-pointer">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-400 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></span>
            </span>
            <span className="group-hover:text-indigo-200 transition-colors">Live Video Matchmaking Active</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400 font-mono">247 players online</span>
          </div>
          
          {/* Hero Title with Better Gradient */}
          <h1 className="text-7xl md:text-9xl font-bold tracking-tight mb-6 leading-[0.95]">
            <span className="block bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent animate-[fadeIn_0.8s_ease-out]">
              Checkmate,
            </span>
            <span className="block italic font-serif font-light bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent animate-[fadeIn_1s_ease-out_0.2s_both]">
              Personalized.
            </span>
          </h1>
          
          {/* Enhanced Subtitle */}
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-12 leading-relaxed animate-[fadeIn_1s_ease-out_0.4s_both]">
            The first WebRTC-native chess platform where every move matters.
            <span className="block mt-2 text-base text-neutral-500">See your opponent's hesitation, feel their pressure, play mind games.</span>
          </p>

          {/* CTA Buttons with Micro Animations */}
          <div className="flex justify-center gap-4 animate-[fadeIn_1s_ease-out_0.6s_both]">
            <button 
              onClick={() => navigate("/play")}
              className="group relative px-8 py-4 max-md:p-3 bg-white text-black rounded-2xl font-semibold overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10 max-md:text-sm flex items-center gap-2 group-hover:text-white transition-colors">
                Start Playing
                <svg className="w-5  h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
            
            <button className="group px-8 py-4 max-md:p-3 border max-md:text-sm border-white/10 text-white rounded-2xl font-semibold hover:bg-white/5 hover:border-white/20 transition-all duration-300">
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Watch Demo
              </span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-neutral-500 animate-[fadeIn_1s_ease-out_0.8s_both]">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 border-2 border-[#050505]"></div>
                ))}
              </div>
              <span>1,200+ active players</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-neutral-700"></div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>4.9/5 rating</span>
            </div>
          </div>
        </div>

        {/* Enhanced Bento Grid with Better Interactions */}
        <div className="grid grid-cols-1 md:grid-cols-6 md:grid-rows-2 gap-6 h-auto md:h-[650px]">
          
          {/* Card 1: Main Gameplay - Enhanced 3D Effect */}
          <div className="md:col-span-4 md:row-span-2 bg-gradient-to-br from-[#0A0A0A] to-[#0F0F0F] border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
            {/* Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Card Header */}
            <div className="flex justify-between items-center mb-8 relative z-10">
              <div>
                <h3 className="text-white font-semibold text-lg mb-1">Live Match</h3>
                <p className="text-neutral-500 text-sm">You vs. Opponent • Blitz 5+0</p>
              </div>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 hover:scale-110 transition-transform cursor-pointer shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500 hover:scale-110 transition-transform cursor-pointer shadow-[0_0_10px_rgba(234,179,8,0.5)]"></span>
                <span className="w-3 h-3 rounded-full bg-green-500 hover:scale-110 transition-transform cursor-pointer shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
              </div>
            </div>

            {/* 3D Chess Board with Perspective */}
            <div className="relative h-full w-full flex flex-col items-center justify-center perspective-[1000px]">
              <div className="w-full max-w-lg aspect-square bg-gradient-to-br from-[#1a1a1a] to-[#151515] rounded-2xl border border-white/10 p-6 relative shadow-[0_20px_60px_rgba(0,0,0,0.5)] transform transition-all duration-700 group-hover:scale-[1.01] group-hover:shadow-[0_25px_80px_rgba(99,102,241,0.15)]">
                
                {/* Video Overlays - Opponent */}
                <div className="absolute -right-6 -top-6 w-36 h-44 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl border-2 border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.2)] z-20 overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-neutral-900 flex items-center justify-center relative">
                    <span className="text-3xl animate-pulse">😠</span>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-neutral-400">OPPONENT</span>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                          <span className="text-red-400">LIVE</span>
                        </div>
                      </div>
                      <div className="mt-1 text-xs font-semibold text-white">Player_2847</div>
                    </div>
                  </div>
                </div>

                {/* Video Overlay - You */}
                <div className="absolute -left-6 -bottom-6 w-36 h-44 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-2xl border-2 border-purple-500/40 shadow-[0_0_30px_rgba(168,85,247,0.2)] z-20 overflow-hidden hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full bg-neutral-900 flex items-center justify-center relative">
                    <span className="text-3xl">😎</span>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-mono text-neutral-400">YOU</span>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                          <span className="text-green-400">LIVE</span>
                        </div>
                      </div>
                      <div className="mt-1 text-xs font-semibold text-white">You</div>
                    </div>
                  </div>
                </div>

                {/* Chess Grid with Enhanced Styling */}
                <div className="grid grid-cols-8 h-full w-full rounded-xl border border-white/5 overflow-hidden shadow-inner relative">
                  {[...Array(64)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`${
                        (Math.floor(i / 8) + i) % 2 === 0 
                          ? 'bg-neutral-800 hover:bg-neutral-750' 
                          : 'bg-[#1a1a1a] hover:bg-[#1f1f1f]'
                      } transition-colors duration-200 cursor-pointer`}
                    ></div>
                  ))}
                  
                  {/* Hint: Add Sample Piece */}
                  <div className="absolute top-[12.5%] left-[12.5%] w-[12.5%] h-[12.5%] flex items-center justify-center text-4xl opacity-80 hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
                    ♟
                  </div>
                </div>

                {/* Game Info Overlay */}
                <div className="absolute top-6 right-6 flex flex-col gap-2">
                  <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 text-xs font-mono text-white">
                    05:00
                  </div>
                  <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 text-xs font-mono text-white">
                    Move 12
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: WebRTC Features - Enhanced Design */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#0A0A0A] to-[#0F0F0F] border border-white/10 rounded-3xl p-8 flex flex-col justify-between group overflow-hidden hover:border-indigo-500/30 transition-all duration-500 relative">
            {/* Animated Glow */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-indigo-500/20 group-hover:scale-150"></div>
            
            <div className="relative z-10">
              {/* Icon with Gradient Border */}
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Crystal Clear HD
              </h3>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Peer-to-peer 1080p video streams with sub-100ms latency. Experience real-time reactions.
              </p>
            </div>
            
            {/* Animated Stats */}
            <div className="mt-8 relative z-10">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2 text-xs">
                    <span className="text-neutral-500 font-mono">BITRATE</span>
                    <span className="text-indigo-400 font-mono font-semibold">4500 KBPS</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-2/3 rounded-full animate-pulse shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2 text-xs">
                    <span className="text-neutral-500 font-mono">LATENCY</span>
                    <span className="text-green-400 font-mono font-semibold">87 MS</span>
                  </div>
                  <div className="h-2 w-full bg-neutral-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 w-5/6 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Leaderboard - Enhanced Interaction */}
          <div className="md:col-span-2 bg-gradient-to-br from-[#0A0A0A] to-[#0F0F0F] border border-white/10 rounded-3xl p-8 relative group overflow-hidden hover:border-purple-500/30 transition-all duration-500">
            {/* Animated Glow */}
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl -ml-10 -mb-10 transition-all duration-500 group-hover:bg-purple-500/20 group-hover:scale-150"></div>
            
            <div className="flex flex-col h-full justify-between relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center border border-yellow-500/30">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Global Leaderboard</h3>
                    <p className="text-xs text-neutral-500">Top players this week</p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced Leaderboard Items */}
              <div className="space-y-2.5 mt-6">
                {[
                  { rank: 1, name: 'GrandMaster_X', elo: 2840, trend: '+45' },
                  { rank: 2, name: 'ChessNinja_99', elo: 2790, trend: '+32' },
                  { rank: 3, name: 'QueenSlayer', elo: 2745, trend: '+28' }
                ].map((player) => (
                  <div 
                    key={player.rank} 
                    className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-white/[0.03] to-white/[0.01] border border-white/5 hover:from-white/[0.08] hover:to-white/[0.03] hover:border-white/10 transition-all duration-300 cursor-pointer group/item"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center font-bold text-sm ${
                        player.rank === 1 ? 'from-yellow-500 to-orange-500 text-white shadow-[0_0_15px_rgba(234,179,8,0.3)]' :
                        player.rank === 2 ? 'from-neutral-400 to-neutral-500 text-white shadow-[0_0_15px_rgba(163,163,163,0.3)]' :
                        'from-orange-700 to-orange-800 text-white shadow-[0_0_15px_rgba(194,65,12,0.3)]'
                      }`}>
                        #{player.rank}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover/item:text-indigo-300 transition-colors">{player.name}</div>
                        <div className="text-xs text-neutral-500">Ranked #{player.rank} globally</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-mono font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                        {player.elo}
                      </div>
                      <div className="text-xs text-green-400 font-mono">{player.trend}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* View All Link */}
              <button className="mt-4 w-full py-2.5 text-sm text-neutral-400 hover:text-white border border-white/5 hover:border-white/10 rounded-xl hover:bg-white/5 transition-all duration-200 font-medium">
                View Full Rankings →
              </button>
            </div>
          </div>
        </div>
        
        {/* Enhanced Footer */}
        <div className="mt-24 flex flex-col md:flex-row justify-between items-center border-t border-white/5 pt-12 gap-6">
          <div>
            <p className="text-neutral-400 text-sm mb-2">Designed for the future of competitive chess.</p>
            <p className="text-neutral-600 text-xs">Built with WebRTC, powered by passion.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-neutral-500 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              Twitter
            </a>
            <a href="#" className="text-neutral-500 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              Discord
            </a>
            <a href="#" className="text-neutral-500 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
              <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
              GitHub
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ModernLandingPage;
