import React, { useState, useEffect } from 'react';
import { Play, Video, Shield, Zap, Users, ChevronRight, Menu, X, Move } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChessBoard } from '@/component/dummyChess';

const LandingPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const router = useNavigate()
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-125 h-125 bg-indigo-900/20 rounded-full blur-[120px] opacity-40 mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-150 h-150 bg-purple-900/20 rounded-full blur-[120px] opacity-40 mix-blend-screen" />
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-[#0a0a0a]/80 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center rotate-3 hover:rotate-6 transition-transform">
              <Move className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Grandmaster</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#community" className="hover:text-white transition-colors">Community</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pro</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Log in</a>
            <button 
            onClick={()=>{
            router('/chess')
          }}
            className="bg-white text-black px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-200 transition-all hover:scale-105 active:scale-95">
              Play Now
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden p-2 text-gray-400" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium tracking-wide text-gray-300">LIVE VIDEO BETA IS HERE</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] bg-linear-to-b from-white to-gray-400 bg-clip-text text-transparent">
          Face your opponent,<br /> not just the board.
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          The first chess platform with integrated, low-latency video calling. 
          See the hesitation, the confidence, and the checkmate.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-20">
          <button onClick={()=>{
            router('/chess')
          }} className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)]">
            <Play className="w-5 h-5 fill-current" />
            Start Match
          </button>
          <button className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-semibold transition-all backdrop-blur-sm">
            View Demo
          </button>
        </div>

        {/* App Interface Mockup */}
        <div className="relative w-full h-180 max-w-5xl aspect-video md:aspect-21/9 rounded-3xl border border-white/10 bg-[#121212] shadow-2xl overflow-hidden group">

          {/* Mock UI Header */}
          <div className="absolute top-0 w-full h-12 border-b border-white/5 flex items-center px-6 justify-between bg-[#121212]/50 backdrop-blur-md z-20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="text-xs font-mono text-gray-500">MATCH #8294 • BLITZ 5|0</div>
          </div>

          {/* The Board & Video Layout */}
          <div className="flex justify-between h-200 pt-12">
            
            {/* Left: The Board */}
            <div className=" flex jus bg-[#151515]  ">
              {/* Abstract Chess Board Representation */}
             
          <ChessBoard w={150} />
              
            </div>

            {/* Right: Opponent Video Feed (The Unique Selling Point) */}
            <div className="w-full h-full border-l border-white/10  bg-gray-900/50">
              
              {/* Opponent Video */}
              <div className="h-1/2 relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                <img 
                  src="/api/placeholder/400/300" 
                  alt="Opponent" 
                  className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                 
                  <div className="text-xs text-gray-400 mt-1">ELO 2450 • Sweden</div>
                </div>
              </div>

              {/* Chat / Moves / Analytics Area */}
              <div className="h-1/2 bg-[#0a0a0a] p-6 flex flex-col gap-4">
                <div className="flex justify-between items-center text-xs font-semibold text-gray-500 uppercase tracking-widest">
                  <span>Live Analysis</span>
                  <Zap className="w-4 h-4 text-yellow-500" />
                </div>
                
                {/* Eval Bar Mockup */}
                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden flex">
                  <div className="w-[55%] bg-white h-full" />
                  <div className="w-[45%] bg-indigo-600 h-full" />
                </div>
                
                <div className="space-y-3 mt-2">
                  <div className="flex items-center gap-3 text-sm text-gray-300 bg-white/5 p-3 rounded-lg border border-white/5">
                    <span className="font-mono text-gray-500">14.</span>
                    <span>Nf3</span>
                    <span className="ml-auto text-green-400 text-xs font-mono">+0.45</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300 p-3 rounded-lg">
                    <span className="font-mono text-gray-500">13.</span>
                    <span>Qd2</span>
                    <span className="ml-auto text-gray-600 text-xs font-mono">0.00</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section className="py-24 px-6 relative z-10 bg-[#0a0a0a]" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Precision Engineered</h2>
              <p className="text-gray-400 max-w-md">Built for the modern player who demands speed, clarity, and human connection.</p>
            </div>
            <a href="#" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors font-medium">
              View all features <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-[#111] border border-white/5 hover:border-white/10 transition-colors group">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 transition-colors">
                <Video className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Crystal Clear Video</h3>
              <p className="text-gray-400 max-w-lg mb-8">
                Low-latency WebRTC streaming ensures you never miss a reaction. The video feed floats unobtrusively or snaps to the side, giving you full control over your board view.
              </p>
              <div className="h-32 rounded-xl bg-linear-to-r from-indigo-900/20 to-purple-900/20 border border-white/5 relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-3xl bg-[#111] border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Anti-Cheat Shield</h3>
              <p className="text-gray-400 text-sm">
                Proprietary gaze-tracking via video feed combined with engine analysis ensures fair play in every match.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-3xl bg-[#111] border border-white/5 hover:border-white/10 transition-colors">
              <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-orange-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premove & Speed</h3>
              <p className="text-gray-400 text-sm">
                Built on Rust, our move validation engine has 0ms server lag. Premove with confidence in time scrambles.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-[#111] border border-white/5 hover:border-white/10 transition-colors flex flex-col md:flex-row items-center gap-8">
               <div className="flex-1">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Clubs & Tournaments</h3>
                <p className="text-gray-400">
                  Create private clubs, host swiss tournaments with video requirements, and analyze games together in a shared voice/video room.
                </p>
               </div>
               <div className="w-full md:w-1/3 aspect-video bg-gray-800/50 rounded-xl border border-white/5 flex items-center justify-center relative">
                  <div className="flex -space-x-4">
                     {[1,2,3].map((i) => (
                       <div key={i} className="w-10 h-10 rounded-full border-2 border-[#111] bg-gray-700"></div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
              <Move className="w-3 h-3 text-white" />
            </div>
            <span className="font-bold tracking-tight">Grandmaster</span>
          </div>
          <div className="text-gray-500 text-sm">
            © 2025 Grandmaster Inc. Designed for the mind.
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors"><span className="sr-only">Twitter</span>𝕏</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">GitHub</a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;