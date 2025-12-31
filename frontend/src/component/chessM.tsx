import { useEffect, useRef, useState } from 'react';
import { type historyType } from './chessDesktop';
import { useSocket } from '@/hooks/useScoket';
import { Chess } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
const VideoCall = () => {
  const [isConnected, setIsConnected] = useState(false);
  const localVideoRef  = useRef <HTMLVideoElement | null>(null);
    const remoteVideoRef = useRef<HTMLVideoElement | null>(null);

  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);

  const localStreamRef = useRef<MediaStream | null>(null);
  const [game, setGame] = useState(new Chess());
  const [color, setColor] = useState<"white" | "black" | undefined>(undefined);
  const [history, setHistory] = useState<historyType[]>([]);
  const socket = useSocket(async (msg) => {
    const pc = peerConnectionRef.current;
    if (!pc) return;
    if (msg.type === "START") {
      setColor(msg.color);
      console.log("Game started");
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer)
      socket.send({type:"offer", offer:offer})
    }
    if(msg.type === "offer"){
      console.log("Received offer , sending answer");
      await pc.setRemoteDescription(new RTCSessionDescription(msg.offer as RTCSessionDescriptionInit))
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.send({type:'answer', answer:answer})
    }
    if(msg.type === "answer"){
         await pc.setRemoteDescription(new RTCSessionDescription(msg.answer as RTCSessionDescriptionInit));
      
    }
    if (msg.type === "UPDATE") {
      // console.log("data", game.history())
      setHistory(prev => [
        ...prev,
        {
          from: msg.from,
          to: msg.to,
          peice: msg.peice,
          color: msg.color
        }])
      const newGame = new Chess(msg.fen);
      setGame(newGame);
    }
  });
  function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
    try {
      const move = game.move({ from: sourceSquare, to: targetSquare as string });
      console.log(move.piece)
      const data = socket?.send({
        type: "MOVE",
        from: sourceSquare,
        to: targetSquare,
        color: move.color,
        peice: move.piece
      });
    }
    catch (e) {
      console.log(e)
    }

    return true;
  }

  const chessboardOptions = {
    position: game.fen(),
    onPieceDrop,
    boardOrientation: color,
    arePiecesDraggable: game.turn() === (color === "white" ? "w" : "b")

  }
  useEffect(() => {
    peerConnectionRef.current = new RTCPeerConnection();
    
    startLocalMedia();
  }, [])
  async function startLocalMedia() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      })
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject  = stream;
      // adding track
      stream.getTracks().forEach((track:MediaStreamTrack)=>{
        peerConnectionRef.current?.addTrack(track,stream);
      })
      
      peerConnectionRef.current!.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          socket.send({
            type: 'candidate',
            payload: event.candidate,
          });
        }
      };

      peerConnectionRef.current!.ontrack = (event:RTCTrackEvent) =>{
        if(remoteVideoRef.current && event.streams[0]){
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      }
      }
    catch (e) {
      console.log('something went wrong', e);
      alert('cannot access your camara')
    }
  }
  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Native WS WebRTC Client</h2>
      <div className="flex gap-4 flex-col">
        <button className='px-10 py-3 bg-slate-900 rounded-md text-white w-fit font-medium '>Start Video

        </button>

        <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-48 bg-gray-900 border-2 border-blue-500" />

{color ? (
                <div className="grid grid-cols-2 p-5 gap-5 ">
                    <div className="h-fit mt-5">

                        <Chessboard
                            options={chessboardOptions}
                        />
                    </div>

                    <div className="moves ">
                       
                      
                    </div>


                </div>
            ) : (
                <p className="text-white">Waiting for opponent...</p>
            )}
        <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-48 bg-gray-900 border-2 border-green-500" />

      </div>
    </div>
  );
};

export default VideoCall;
