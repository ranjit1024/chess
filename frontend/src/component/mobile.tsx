import { Chessboard } from "react-chessboard"
import type { compType  } from "@/types/type";
import MediaControlBar from "./media_contrller";
export function Mobile({remoteVideo,localVideo,chessboardOptions,history,SendVideo}:compType){
    return <div className="h-screen w-screen bg-gray-950 flex flex-col">
            
                {/* Video Section - Fixed height at top */}
                <div className="h-52 flex gap-2 p-2 bg-gray-900 border-b border-white/10">
                  {/* Opponent Video */}
                  <div className="flex-1 rounded-lg overflow-hidden border-2 border-white/30 bg-gray-800 relative">
                    <video ref={remoteVideo} autoPlay muted className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
                      Opponent
                    </div>
            
                  </div>
            
                  {/* Your Video */}
                  <div className="flex-1 rounded-lg overflow-hidden border-2 border-blue-500 bg-gray-800 relative">
                    <video ref={localVideo} autoPlay muted className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
                      You
                    </div>
            
            
                  </div>
                </div>
            
                {/* Chess Board - Takes remaining space */}
                <div className="flex-1 flex items-center justify-center p-3">
                  <div className="aspect-square w-full max-w-md">
                    <Chessboard options={chessboardOptions} />
                  </div>
                </div>
            
                {/* Move History - Fixed height at bottom */}
                <div className="h-14 bg-gray-900 border-t border-white/10 p-2">
                  <div
            
                    className="flex gap-2 overflow-x-auto h-full scrollbar-hide"
                  >
                    {history.filter((color:any) => color.color === "w" || color.color === "b").map((move:any, id:any) => (
            
                      <div key={id} className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded border border-white/20">
            
                        <span className="text-gray-200 font-semibold">{move.peice.toUpperCase()}</span>
                        <span className="text-gray-400 text-xs">{move.from}</span>
                        <svg className="w-3 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
                        </svg>
                        <span className="text-gray-200 font-semibold">{move.to}</span>
                      </div>
            
            
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 p-2 bg-gray-950 border-t border-white/10 items-center justify-center">
                  <MediaControlBar startVideo={SendVideo} />
                </div>
            
              </div>
}