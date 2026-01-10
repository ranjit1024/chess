export interface historyType {
  from: string;
  to: string; peice: string;
  color: "b" | "w"
}
import type { ReactElement, RefObject } from "react";
import { useEffect, useRef, useState } from "react";
import { Chess, type Square } from "chess.js";
import { Chessboard, type SquareHandlerArgs } from "react-chessboard";
import MediaControlBar from "./media_contrller";
import { useChessSound } from "../hooks/sound";
export function MobileChessGame({ socket, send, color }: { color: "white" | "black" | undefined, socket: RefObject<WebSocket | null> | null, send: (data: any) => void }) {
  const localVideo = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection>(null)
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const [game, setGame] = useState(new Chess());
  const { playMove, playCapture } = useChessSound();
  const [history, setHistory] = useState<historyType[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [moveFrom, setMoveFrom] = useState('');
  const [optionSquares, setOptionSquares] = useState({});
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [history])
  function getMovesOption(square: Square) {
    const moves = game.moves({
      square,
      verbose: true
    });

    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }
    if (color && game.get(square)?.color === (color === "white" ? "b" : "w")) {
      return
    }
    const newSquares: Record<string, React.CSSProperties> = {};
    for (const move of moves) {
      newSquares[move.to] = {
        background: game.get(move.to) && game.get(move.to)?.color !== game.get(square)?.color ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)' // larger circle for capturing
          : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
        borderRadius: '50%'
      };
    }
    newSquares[square] = {
      background: 'rgba(255, 255, 0, 0.4)'
    };
    setOptionSquares(newSquares);
    return true;
  }
  useEffect(() => {
    pcRef.current = new RTCPeerConnection()
    if (socket?.current?.readyState !== WebSocket.OPEN) return;
    pcRef.current.onicecandidate = (event) => {
      socket.current?.send(JSON.stringify({
        type: "ice-candidate",
        candidate: event.candidate
      }))
    }
    pcRef.current.ontrack = (track) => {
      const remoteStream = track.streams[0]
      if (remoteVideo.current && remoteStream) {
        console.log('Steram')
        remoteVideo.current.srcObject = remoteStream
      }
    }
    socket.current.onmessage = async (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "offer" && pcRef.current) {
        await pcRef.current.setRemoteDescription(msg.sdp);
        const ans = await pcRef.current?.createAnswer();
        await pcRef.current.setLocalDescription(ans);
        socket.current?.send(JSON.stringify({
          type: "answer",
          sdp: ans
        }))
      }

      else if (msg.type === "ice-candidate" && pcRef.current) {
        console.log("Getting ice")
        await pcRef.current.addIceCandidate(msg.candidate)
      }
      else if (msg.type === "answer") {
        console.log('GEtting answer')
        await pcRef.current?.setRemoteDescription(msg.sdp)
      }
      else if (msg.type === "UPDATE") {
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

    }
  }, [])

  function onSquareClick({
    square,
    piece
  }: SquareHandlerArgs) {
    // piece clicked to move
    if (!moveFrom && piece) {
      // get the move options for the square
      const hasMoveOptions = getMovesOption(square as Square);

      // if move options, set the moveFrom to the square
      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      // return early
      return;
    }

    // square clicked to move to, check if valid move
    const moves = game.moves({
      square: moveFrom as Square,
      verbose: true
    });
    const foundMove = moves.find(m => m.from === moveFrom && m.to === square);

    // not a valid move
    if (!foundMove) {
      // check if clicked on new piece
      const hasMoveOptions = getMovesOption(square as Square);

      // if new piece, setMoveFrom, otherwise clear moveFrom
      setMoveFrom(hasMoveOptions ? square : '');

      // return early
      return;
    }

    // is normal move
    try {
      const move = game.move({
        from: moveFrom,
        to: square,
        promotion: 'q'
      });
      if (move) {
        if (move.isCapture()) {
          playCapture()
        }
        else {
          playMove()
        }
      }
      const data = send({
        type: "MOVE",
        from: move.from,
        to: move.to,
        color: move.color,
        peice: move.piece
      });

      if (game.isCheckmate()) {
        alert('game Over')
      }
    } catch {
      // if invalid, setMoveFrom and getMoveOptions
      const hasMoveOptions = getMovesOption(square as Square);

      // if new piece, setMoveFrom, otherwise clear moveFrom
      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      // return early
      return;
    }

    setMoveFrom('');
    setOptionSquares({});
  }



  async function SendVideo() {
    if (!pcRef.current) return;
    console.log('fasdf')
    if (socket?.current?.readyState !== WebSocket.OPEN) return;

    const media = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })
    const videoTrack = media.getVideoTracks()[0];
    if (localVideo.current) {
      localVideo.current.srcObject = media
    }

    pcRef.current.onnegotiationneeded = async () => {
      const senderoffer = await pcRef.current!.createOffer();
      await pcRef.current!.setLocalDescription(senderoffer);
      socket?.current?.send(JSON.stringify({
        type: "offer",
        sdp: senderoffer
      }))
    }
    if (videoTrack) {
      console.log("adding meddsf")
      pcRef.current.addTrack(videoTrack, media)
    }
  }
  const chessboardOptions = {
    allowDragging: false,
    onSquareClick,
    position: game.fen(),
    squareStyles: optionSquares,
    boardOrientation: color,

  };
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
        {history.filter(color => color.color === "w" || color.color === "b").map((move, id) => (

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