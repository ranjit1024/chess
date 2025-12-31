export interface historyType {
  from: string;
  to: string; peice: string;
  color: "b" | "w"
}
import { useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import { useSocket } from "../hooks/useScoket";
import VideoPanel from "@/component/siderbar";
export default function Dchess() {
  const [game, setGame] = useState(new Chess());
  const [color, setColor] = useState<"white" | "black" | undefined>(undefined);
  const [history, setHistory] = useState<historyType[]>([]);
  // alll refs\
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const socket = useSocket((msg) => {
    if (msg.type === "START") {
      setColor(msg.color);
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
 

   const startLocalMedia = async (): Promise<void> => {
    try {
      const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
      }

      // Add tracks
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        peerConnectionRef.current?.addTrack(track, stream);
      });

      // ICE Candidate handler
      peerConnectionRef.current.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
          sendMessage({
            type: 'ice-candidate',
            payload: event.candidate,
          });
        }
      };

      // Remote track handler
      peerConnectionRef.current.ontrack = (event: RTCTrackEvent) => {
        if (remoteVideoRef.current && event.streams[0]) {
          remoteVideoRef.current.srcObject = event.streams[0];
        }
      };
    } catch (error) {
      console.error('Media Error:', error);
    }
  };

  return (
    <div className="min-h-screen  bg-zinc-950 flex items-center justify-center">

      {color ? (

        <div className="flex flex-col">
          <button className="bg-white" onClick={() => {

          }}>start video</button>
          <div className="h-fit mt-5">

            <Chessboard
              options={chessboardOptions}
            />
          </div>
        </div>
      ) : (
        <p className="text-white">Waiting for opponent...</p>
      )}
    </div>
  );
}


