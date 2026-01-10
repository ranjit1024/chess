import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, Clock, Crown, Download, RotateCcw, Monitor, Settings } from 'lucide-react';

export default function ChessVideoCall() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [opponentMicOn, setOpponentMicOn] = useState(true);
  
  const [moves, setMoves] = useState([
    { moveNumber: 1, white: 'e4', black: 'e5' },
    { moveNumber: 2, white: 'Nf3', black: 'Nc6' },
    { moveNumber: 3, white: 'Bb5', black: 'a6' },
    { moveNumber: 4, white: 'Ba4', black: 'Nf6' },
    { moveNumber: 5, white: 'O-O', black: 'Be7' },
    { moveNumber: 6, white: 'd3', black: 'b5' },
    { moveNumber: 7, white: 'Bb3', black: 'd6' },
    { moveNumber: 8, white: 'c3', black: 'O-O' },
    { moveNumber: 9, white: 'h3', black: 'Na5' },
    { moveNumber: 10, white: 'Bc2', black: 'c5' },
  ]);

  const [players] = useState({
    you: {
      name: 'You',
      rating: 1842,
      time: '10:23',
      captured: ['♟', '♟', '♞']
    },
    opponent: {
      name: 'Opponent',
      rating: 1789,
      time: '12:45',
      captured: ['♙', '♙', '♗']
    }
  });

  const [selectedMove, setSelectedMove] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Left Column - Videos */}
          <div className="lg:col-span-1 space-y-4">
            {/* Opponent Video */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    OP
                  </div>
                  <p className="text-slate-300 font-medium">{players.opponent.name}</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span className="text-slate-400 text-sm">{players.opponent.rating}</span>
                  </div>
                </div>
              </div>
              
              {/* Overlay Info */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <span className="text-white text-sm font-medium">Opponent</span>
              </div>

              {/* Timer */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
                <Clock className="w-4 h-4 text-white" />
                <span className="text-white font-mono font-bold">{players.opponent.time}</span>
              </div>

              {/* Mic Status */}
              <div className="absolute bottom-3 left-3">
                {!opponentMicOn && (
                  <div className="bg-red-500 p-2 rounded-full">
                    <MicOff className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Captured Pieces */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <div className="flex gap-1 text-xl">
                  {players.opponent.captured.map((piece, idx) => (
                    <span key={idx} className="opacity-80">{piece}</span>
                  ))}
                </div>
              </div>

              {/* Color Indicator */}
              <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-800 to-black border-2 border-slate-600 shadow-lg"></div>
              </div>
            </div>

            {/* Your Video */}
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-900 to-blue-800 border-2 border-blue-500 shadow-2xl aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-3 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    YOU
                  </div>
                  <p className="text-blue-100 font-medium">{players.you.name}</p>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <Crown className="w-4 h-4 text-yellow-400" />
                    <span className="text-blue-200 text-sm">{players.you.rating}</span>
                  </div>
                </div>
              </div>
              
              {/* Overlay Info */}
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-blue-400/30">
                <span className="text-white text-sm font-medium">You</span>
              </div>

              {/* Timer */}
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 border border-blue-400/30">
                <Clock className="w-4 h-4 text-white" />
                <span className="text-white font-mono font-bold">{players.you.time}</span>
              </div>

              {/* Mic Status */}
              <div className="absolute bottom-3 left-3">
                {!isMicOn && (
                  <div className="bg-red-500 p-2 rounded-full">
                    <MicOff className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* Captured Pieces */}
              <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-blue-400/30">
                <div className="flex gap-1 text-xl">
                  {players.you.captured.map((piece, idx) => (
                    <span key={idx} className="opacity-80">{piece}</span>
                  ))}
                </div>
              </div>

              {/* Color Indicator */}
              <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-100 to-white border-2 border-blue-400 shadow-lg"></div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-2xl p-4">
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setIsMicOn(!isMicOn)}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isMicOn
                      ? 'bg-slate-700 hover:bg-slate-600 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                  title={isMicOn ? 'Mute' : 'Unmute'}
                >
                  {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                </button>

                <button
                  onClick={() => setIsVideoOn(!isVideoOn)}
                  className={`p-3 rounded-full transition-all duration-200 ${
                    isVideoOn
                      ? 'bg-slate-700 hover:bg-slate-600 text-white'
                      : 'bg-red-500 hover:bg-red-600 text-white'
                  }`}
                  title={isVideoOn ? 'Turn off camera' : 'Turn on camera'}
                >
                  {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                </button>

                <button
                  className="p-3 rounded-full bg-slate-700 hover:bg-slate-600 text-white transition-all duration-200"
                  title="Settings"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Chess Moves */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/80 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-2xl h-full flex flex-col">
              {/* Header */}
              <div className="border-b border-slate-700 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-white text-2xl font-bold">Move History</h2>
                    <p className="text-slate-400 text-sm mt-1">Ruy Lopez Opening • 10+0</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors">
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-white transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Moves Table */}
              <div className="flex-1 overflow-hidden p-5">
                <div className="bg-slate-900/50 rounded-xl overflow-hidden h-full flex flex-col">
                  {/* Table Header */}
                  <div className="grid grid-cols-7 gap-2 bg-slate-800 p-4 border-b border-slate-700">
                    <div className="col-span-1 text-slate-400 text-sm font-bold">#</div>
                    <div className="col-span-3 text-slate-400 text-sm font-bold flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-100 to-white"></div>
                      White
                    </div>
                    <div className="col-span-3 text-slate-400 text-sm font-bold flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-800 to-black"></div>
                      Black
                    </div>
                  </div>

                  {/* Moves List - Scrollable */}
                  <div className="flex-1 overflow-y-auto">
                    {moves.map((move, idx) => (
                      <div 
                        key={idx}
                        className={`grid grid-cols-7 gap-2 p-4 border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer ${
                          selectedMove === idx ? 'bg-blue-900/30' : ''
                        }`}
                        
                      >
                        <div className="col-span-1 text-slate-500 font-bold text-sm">
                          {move.moveNumber}.
                        </div>
                        <div className="col-span-3">
                          <div className="inline-block bg-blue-900/30 hover:bg-blue-800/40 px-4 py-2 rounded-lg border border-blue-700/30 transition-colors">
                            <span className="text-white font-mono font-bold text-sm">{move.white}</span>
                          </div>
                        </div>
                        <div className="col-span-3">
                          {move.black && (
                            <div className="inline-block bg-slate-700/50 hover:bg-slate-700 px-4 py-2 rounded-lg border border-slate-600 transition-colors">
                              <span className="text-white font-mono font-bold text-sm">{move.black}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* PGN Notation */}
              <div className="border-t border-slate-700 p-5 bg-slate-900/30">
                <h4 className="text-white font-bold mb-3 text-sm">PGN Notation</h4>
                <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-20 overflow-y-auto">
                  {moves.map((m, i) => (
                    <span key={i}>
                      {m.moveNumber}. {m.white} {m.black}{' '}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}