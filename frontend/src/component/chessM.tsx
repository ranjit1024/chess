export interface historyType {
  from: string;
  to: string; peice: string;
  color: "b" | "w"
}
import { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import { useSocket } from "../hooks/useScoket";
export default function Dchess() {
  const [game, setGame] = useState(new Chess());
  const [color, setColor] = useState<"white" | "black" | undefined>(undefined);
  const [history, setHistory] = useState<historyType[]>([]);
  // alll refs\
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  useEffect(() => {
    peerConnectionRef.current = new RTCPeerConnection();
    
  }, [])
  const socket = useSocket(async (msg) => {
    const pc = peerConnectionRef.current!
    if (msg.type === "START") {
      
      setColor(msg.color);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(new RTCSessionDescription(offer));
      socket.send({ type: 'offer', sdp:offer });
    }
    else if (msg.type === "offer") {
      console.log('Received offer, sending answer...');
      console.log(msg.sdp)
      await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(new RTCSessionDescription(answer));
      socket.send({ type: 'answer', sdp:answer });
    }
    else if(msg.type === "answer"){
      console.log(msg)
      await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
    }
    else if(msg.type === "ice-candidate"){
      pc.addIceCandidate(msg.candidate)
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
  async function startLocal() {
    try {
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,

      });
      localStreamRef.current = stream;
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        peerConnectionRef.current?.addTrack(track, stream);
      });

      peerConnectionRef.current!.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          socket.send({
            type: 'ice-candidate',
            candidate: event.candidate,
          });
        }
      };

      peerConnectionRef.current!.ontrack = (event: RTCTrackEvent) => {
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
    }
    catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="min-h-screen  bg-zinc-950 flex items-center justify-center">

      {color ? (

        <div className="flex flex-col">
          <button className="bg-white" onClick={() => { startLocal() }}>start video</button>
          <div className="h-fit mt-5">
            <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-64 h-48 bg-gray-900 rounded-lg object-cover border-2 border-green-500"
          />
            <Chessboard
              options={chessboardOptions}
            />
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              className="w-64 h-48 bg-gray-900 rounded-lg object-cover border-2 border-green-500"
            />
          </div>

        </div>
      ) : (
        <p className="text-white">Waiting for opponent...</p>
      )}
    </div>
  );
}


