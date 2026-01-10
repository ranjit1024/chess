import  { useState } from 'react';
import { 
  Video, 
  Globe, 
  Shield, 
  Zap, 
  Play, 
  ChevronRight,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isHovering, setIsHovering] = useState(false);
  const route = useNavigate()
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-indigo-500/30 font-sans overflow-x-hidden">
      
      {/* --- Background Effects --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-indigo-900/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-violet-900/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] left-[50%] w-[60rem] h-[60rem] bg-blue-900/10 rounded-full blur-[120px] transform -translate-x-1/2" />
      </div>

      {/* --- Navigation --- */}
      <nav className="relative z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <span className="font-bold text-white">C</span>
            </div>
            <span className="font-semibold text-lg tracking-tight text-white">ChessMate</span>
          </div>
       
          <div className="flex items-center gap-4">
           
            <button onClick={()=>{
              route("/chess")
            }} className="group relative px-4 py-2 bg-white text-slate-950 text-sm font-bold rounded-full hover:bg-indigo-50 transition-all flex items-center gap-2">
              Play Now
              <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main className="relative z-10 pt-20 pb-32 max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              v2.0 Now Live: 1080p Video Calling
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]">
              Chess is better <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient bg-300%">
                Face to Face.
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Experience the psychological thrill of real over-the-board chess, online. 
              See your opponent's reaction in real-time with low-latency WebRTC video.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button onClick={()=>{
                  route("/game")
              }} className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold shadow-xl shadow-indigo-900/20 transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-current" />
                Start Match
              </button>
             
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <p className="text-xs font-mono text-slate-500">POWERED BY</p>
              <div className="flex items-center gap-4">
                <span className="text-slate-400 font-bold">React.js</span>
                <span className="text-slate-400 font-bold">WebRTC</span>
                <span className="text-slate-400 font-bold">WebSocket</span>
              </div>
            </div>
          </div>

          {/* Hero Visual / Graphic */}
          <div className="flex-1 relative w-full max-w-[600px] aspect-square">
            {/* Abstract Board Representation */}
            <div 
              className="absolute inset-0 bg-slate-900 rounded-2xl border border-white/10 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 ease-out overflow-hidden"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              {/* Floating UI Elements (Glassmorphism) */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                {/* Opponent Video Card */}
                <div className="w-32 h-24 bg-slate-800/80 backdrop-blur-md rounded-lg border border-white/10 shadow-lg flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                  <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80" alt="Opponent" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                  <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-white font-medium">GrandMaster_1</span>
                  </div>
                </div>

                {/* Timer */}
                <div className="bg-slate-950/90 border border-white/10 px-4 py-2 rounded-lg text-xl font-mono text-white tracking-widest shadow-xl">
                  09:43
                </div>
              </div>

              {/* Chess Pieces (Stylized) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-64 grid grid-cols-2 gap-1 opacity-90">
                  <div className={`bg-indigo-500/20 rounded-lg backdrop-blur-sm border border-indigo-500/30 transition-all duration-500 ${isHovering ? 'translate-y-4' : ''}`} />
                  <div className="bg-slate-800/50 rounded-lg backdrop-blur-sm border border-white/5" />
                  <div className="bg-slate-800/50 rounded-lg backdrop-blur-sm border border-white/5" />
                  <div className={`bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-500 delay-75 ${isHovering ? '-translate-y-4' : ''}`} />
                </div>
              </div>

              {/* Your Video Card (Bottom Right) */}
              <div className="absolute bottom-6 right-6 w-24 h-32 bg-slate-800/80 backdrop-blur-md rounded-lg border border-white/10 shadow-2xl overflow-hidden z-20 transform transition-transform hover:scale-110">
                 <div className="absolute inset-0 bg-slate-700 flex items-center justify-center">
                    <Video className="w-6 h-6 text-slate-500" />
                 </div>
                 <div className="absolute bottom-2 left-0 right-0 text-center">
                    <span className="text-[9px] text-slate-400">You</span>
                 </div>
              </div>
            </div>
            
            {/* Decorative Glow behind the board */}
            <div className="absolute -inset-4 bg-indigo-500/30 blur-3xl -z-10 rounded-full opacity-50" />
          </div>
        </div>
      </main>

      {/* --- Features Grid (Bento Style) --- */}
      <section className="relative z-10 py-24 max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Engineered for Competitors</h2>
          <p className="text-slate-400">Everything you need to focus on the game.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Large */}
          <div className="md:col-span-2 p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 transition-colors group relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Video className="w-32 h-32" />
             </div>
             <div className="relative z-10">
               <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 text-indigo-400">
                 <Video className="w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">WebRTC Video & Audio</h3>
               <p className="text-slate-400 max-w-md">
                 Connect instantly with peer-to-peer streaming. No plugins, no downloads. Just crystal clear video directly in your browser while you checkmate.
               </p>
             </div>
          </div>

          {/* Card 2: Tall */}
          <div className="row-span-2 p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-emerald-500/30 transition-colors relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6 text-emerald-400">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Cheat Detection</h3>
            <p className="text-slate-400 mb-8">
              Advanced heuristics and server-side analysis ensure fair play in every match.
            </p>
            <div className="space-y-3">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="h-2 bg-emerald-500/20 rounded-full w-full overflow-hidden">
                  <div className="h-full bg-emerald-500/50 w-[70%]" style={{ width: `${80 - (i * 15)}%` }} />
                </div>
              ))}
            </div>
          </div>

          {/* Card 3: Standard */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-purple-500/30 transition-colors">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-6 text-purple-400">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Low Latency</h3>
            <p className="text-slate-400 text-sm">
              <span className="text-white font-mono">15ms</span> average move time via WebSocket edge networks.
            </p>
          </div>

          {/* Card 4: Standard */}
          <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-pink-500/30 transition-colors">
            <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center mb-6 text-pink-400">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Global Matchmaking</h3>
            <p className="text-slate-400 text-sm">
              Find opponents at your skill level in seconds, from anywhere in the world.
            </p>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="border-t border-white/5 mt-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm">
            © 2026 ChessMate Inc. All rights reserved.
          </div>
          <div className="flex gap-6 text-slate-500">
            <Users className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <Globe className="w-5 h-5 hover:text-white cursor-pointer transition-colors" />
            <div className="w-5 h-5 bg-slate-800 rounded-full hover:bg-white cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
