import { useState } from 'react';
import { 
  Video, 
  Globe, 
  Shield, 
  Zap, 
  Play, 
  ChevronRight,
  Github,
  Monitor
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isHovering, setIsHovering] = useState(false);
  const route = useNavigate();

  return (
    <div className="min-h-screen bg-black text-zinc-300 selection:bg-zinc-100 selection:text-black font-sans overflow-x-hidden">
      
      {/* --- Minimalist Grid Background --- */}
      <div className="fixed inset-0 z-0 pointer-events-none flex justify-center">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      {/* --- Navigation --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
              <span className="font-black text-black">G</span>
            </div>
            <span className="font-bold text-xl tracking-tighter text-white uppercase">Grandmaster</span>
          </div>
       
          <div className="flex items-center gap-6">
            <button 
              onClick={() => route("/game")} 
              className="group relative px-5 py-2.5 bg-white text-black text-sm font-bold rounded-sm hover:bg-zinc-200 transition-all flex items-center gap-2"
            >
              Play Now
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main className="relative z-10 pt-32 pb-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-xs font-mono uppercase tracking-widest backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              v2.0: 1080p Video Calling
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter text-white leading-[0.95]">
              OVER THE <br />
              BOARD. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">
                ONLINE.
              </span>
            </h1>
            
            <p className="text-lg text-zinc-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
              Experience the psychological thrill of face-to-face chess. 
              Read your opponent's reactions in real-time with zero-latency WebRTC video streaming.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button 
                onClick={() => route("/game")} 
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-zinc-200 text-black rounded-sm font-bold transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                Start Match
              </button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-12 border-t border-white/5">
              <p className="text-xs font-mono text-zinc-600 uppercase tracking-widest">Tech Stack</p>
              <div className="flex items-center gap-6">
                <span className="text-zinc-400 font-mono text-sm flex items-center gap-2"><Monitor className="w-4 h-4"/> React</span>
                <span className="text-zinc-400 font-mono text-sm flex items-center gap-2"><Video className="w-4 h-4"/> WebRTC</span>
              </div>
            </div>
          </div>

          {/* Hero Visual / Glassmorphic Board */}
          <div className="flex-1 relative w-full max-w-[500px] aspect-square">
            <div 
              className="absolute inset-0 bg-zinc-950 rounded-2xl border border-white/10 shadow-2xl transition-transform duration-700 ease-out overflow-hidden"
              style={{ transform: isHovering ? 'perspective(1000px) rotateY(0deg) rotateX(0deg)' : 'perspective(1000px) rotateY(-15deg) rotateX(10deg)' }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:12.5%_12.5%]" />
              
              {/* Glassmorphic Opponent Cam */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
                <div className="w-36 h-24 bg-black/60 backdrop-blur-xl rounded-lg border border-white/10 flex flex-col items-center justify-center relative overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Opponent" className="absolute inset-0 w-full h-full object-cover opacity-70 mix-blend-luminosity" />
                  <div className="absolute bottom-2 left-2 z-20 flex items-center gap-2 bg-black/50 px-2 py-1 rounded backdrop-blur-md">
                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    <span className="text-[10px] text-white font-mono tracking-wider">GUEST_092</span>
                  </div>
                </div>

                <div className="bg-black/80 backdrop-blur-xl border border-white/10 px-3 py-1.5 rounded-md text-lg font-mono text-white tracking-widest">
                  05:00
                </div>
              </div>

              {/* Your Cam */}
              <div className="absolute bottom-4 right-4 w-28 h-36 bg-black/80 backdrop-blur-xl rounded-lg border border-white/10 overflow-hidden z-20 transition-transform hover:scale-105">
                 <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                    <Video className="w-6 h-6 text-zinc-600" />
                 </div>
                 <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded backdrop-blur-md">
                    <span className="text-[10px] text-white font-mono">YOU</span>
                 </div>
              </div>
            </div>
            
            <div className="absolute -inset-10 bg-white/5 blur-[100px] -z-10 rounded-full" />
          </div>
        </div>
      </main>

      {/* --- High-Contrast Bento Grid --- */}
      <section className="relative z-10 py-32 max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-4xl font-black text-white tracking-tighter uppercase mb-4">Built for Competitors.</h2>
          <p className="text-zinc-400 font-mono text-sm max-w-md">Absolute precision. Zero distractions. Engineered specifically for high-stakes matches.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Main Feature */}
          <div className="md:col-span-2 p-10 rounded-xl bg-zinc-950 border border-white/10 hover:border-white/30 transition-all group relative overflow-hidden">
             <div className="relative z-10">
               <Video className="w-8 h-8 text-white mb-6" />
               <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">P2P Video Streaming</h3>
               <p className="text-zinc-400 max-w-md leading-relaxed">
                 Direct peer-to-peer WebRTC connections bypass heavy routing. Experience raw, uncompressed video feeds of your opponent's micro-expressions.
               </p>
             </div>
             <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500">
               <Video className="w-64 h-64 text-white" />
             </div>
          </div>

          {/* Tall Feature */}
          <div className="row-span-2 p-10 rounded-xl bg-zinc-950 border border-white/10 hover:border-white/30 transition-all relative overflow-hidden group">
            <Shield className="w-8 h-8 text-white mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Engine Analysis</h3>
            <p className="text-zinc-400 mb-10 leading-relaxed">
              Server-side heuristics running in the background to ensure absolute fair play.
            </p>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="h-1 bg-white/10 w-full overflow-hidden">
                  <div className="h-full bg-white w-[70%]" style={{ width: `${80 - (i * 20)}%` }} />
                </div>
              ))}
            </div>
          </div>

          <div className="p-10 rounded-xl bg-zinc-950 border border-white/10 hover:border-white/30 transition-all">
            <Zap className="w-8 h-8 text-white mb-6" />
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">15ms Latency</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Moves are broadcasted via edge-network WebSockets for instantaneous board updates.
            </p>
          </div>

          <div className="p-10 rounded-xl bg-zinc-950 border border-white/10 hover:border-white/30 transition-all">
            <Globe className="w-8 h-8 text-white mb-6" />
            <h3 className="text-xl font-bold text-white mb-2 tracking-tight">Global State</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Distributed matchmaking ensures you find a rated opponent instantly, anywhere.
            </p>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t border-white/10 bg-black">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-zinc-500 text-sm font-mono">
            © 2026 GRANDMASTER. PUNE, INDIA.
          </div>
          <div className="flex gap-6 text-zinc-500">
            <Github className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Globe className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;