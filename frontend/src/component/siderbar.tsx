import type { historyType } from "@/pages/game";
import type { Chess } from "chess.js";
import { useRef, useState } from "react";

export default function VideoPanel({ moves }: { moves: historyType[] }) {
  const whiteVideoRef = useRef<HTMLVideoElement>(null);
  const blackVideoRef = useRef<HTMLVideoElement>(null);

  const [started, setStarted] = useState(false);
  const white =  moves.filter((data) => data.color === "w")
  const black = moves.filter((data)=>data.color === "b")
  
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (whiteVideoRef.current) {
        whiteVideoRef.current.srcObject = stream;
      }

      if (blackVideoRef.current) {
        blackVideoRef.current.srcObject = stream;
      }

      setStarted(true);
    } catch (err) {
      console.error("Camera access denied", err);
    }
  };


  return (
    <div className=" bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-5xl rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 shadow-2xl p-6">

        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-xl font-semibold text-white">
            Live Match
          </h2>
          <p className="text-sm text-zinc-400">
            White vs Black
          </p>
        </div>

        {/* Start Camera Button */}
        {!started && (
          <div className="mb-6 flex justify-center">
            <button
              onClick={startCamera}
              className="rounded-lg bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-zinc-200 transition"
            >
              🎥 Start Camera
            </button>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* White */}
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
            <div className="mb-2 text-sm font-medium text-white">
              ♔ White
            </div>

            <div className="aspect-video rounded-lg bg-black overflow-hidden">
              <video
                ref={whiteVideoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />


            </div>

            <div className="rounded-xl mt-2 bg-zinc-900 border border-zinc-800 p-4 flex flex-col">
              <p className="mb-3 text-sm font-medium text-white">♟️ Moves</p>
              <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-zinc-700">
                
                {white.map((move: any, idx: any) => (
                  <div
                    key={idx}
                    className="text-sm text-zinc-300 font-mono"
                  >
                    {`${move.peice.toUpperCase()}${move.from}  ${move.peice.toUpperCase()}${move.to}`}
                  </div>
                ))}
              </div>


            </div>
          </div>

          {/* Black */}
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4">
            <div className="mb-2 text-sm font-medium text-white">
              ♚ Black
            </div>

            <div className="aspect-video rounded-lg bg-black overflow-hidden">
              <video
                ref={blackVideoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
            </div>
            <div className="rounded-xl mt-2 bg-zinc-900 border border-zinc-800 p-4 flex flex-col">
              <p className="mb-3 text-sm font-medium text-white">♟️ Moves</p>
              <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-zinc-700">
                {black.map((move: any, idx: any) => (
                  <div
                    key={idx}
                    className="text-sm text-zinc-300 font-mono"
                  >
                    {`${move.peice.toUpperCase()}${move.from}  ${move.peice.toUpperCase()}${move.to}`}
                  </div>
                ))}
              </div>


            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
