import type { RefObject } from "react";
import { useChessSound } from "../hooks/sound";
import { useEffect, useRef, useState } from "react";
import { Chess, type Square } from "chess.js";
import { Chessboard, type SquareHandlerArgs } from "react-chessboard";
import MediaControlBar from "./media_contrller";
import { type historyType } from "@/types/type";
import { useMediaQuery } from 'react-responsive'
import { ArrowBigLeft, ArrowBigRight, ArrowRight, ArrowUpWideNarrow } from "lucide-react";
import scrollbar from "tailwind-scrollbar";
import { Mobile } from "./mobile";
import { Desktop } from "./desktop";


export function ChessGame({ socket, send, color }: { color: "white" | "black" | undefined, socket: RefObject<WebSocket | null> | null, send: (data: any) => void }) {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const localVideo = useRef<HTMLVideoElement>(null);
    const pcRef = useRef<RTCPeerConnection>(null)
    const remoteVideo = useRef<HTMLVideoElement>(null);
    const [game, setGame] = useState(new Chess());
    const { playMove, playCapture } = useChessSound();
    const [history, setHistory] = useState<historyType[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [moveFrom, setMoveFrom] = useState('');
    const [optionSquares, setOptionSquares] = useState({});
    const [videoOn, setVideoOn] = useState(true);
    const [audioOn, setAudioOn] = useState(true);
    const [stream, setStream] = useState<MediaStream | null>(null);
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
        setStream(media)
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

  const toggleVideo = (): void => {
    if (!stream) return;

    stream.getVideoTracks().forEach((track: MediaStreamTrack) => {
      track.enabled = !track.enabled;
      setVideoOn(track.enabled);
    });
  };

  const toggleAudio = (): void => {
    if (!stream) return;

    stream.getAudioTracks().forEach((track: MediaStreamTrack) => {
      track.enabled = !track.enabled;
      setAudioOn(track.enabled);
    });
  };
    const chessboardOptions = {
        allowDragging: false,
        onSquareClick,
        position: game.fen(),
        squareStyles: optionSquares,
        boardOrientation: color,
        arePiecesDraggable: game.turn() === (color === "white" ? "w" : "b")
    };
    return <div>
        {isMobile ? <Mobile remoteVideo={remoteVideo} localVideo={localVideo} chessboardOptions={chessboardOptions} history={history} SendVideo={SendVideo} /> : <Desktop remoteVideo={remoteVideo} localVideo={localVideo} chessboardOptions={chessboardOptions} history={history} SendVideo={SendVideo} />}
    </div>
}