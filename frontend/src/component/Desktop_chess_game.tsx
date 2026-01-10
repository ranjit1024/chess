export interface historyType {
    from: string;
    to: string; peice: string;
    color: "b" | "w"
}
import type { RefObject } from "react";
import { useChessSound } from "../hooks/sound";
import { useEffect, useRef, useState } from "react";
import { Chess, type Square } from "chess.js";
import { Chessboard, type SquareHandlerArgs } from "react-chessboard";
import MediaControlBar from "./media_contrller";
import ChessVideoCall from "./videos";
import { ArrowBigLeft, ArrowBigRight, ArrowRight, ArrowUpWideNarrow } from "lucide-react";
import scrollbar from "tailwind-scrollbar";
const chessPieces = [
    { letter: 'K', name: 'King', unicode: { white: '♔', black: '♚' } },
    { letter: 'Q', name: 'Queen', unicode: { white: '♕', black: '♛' } },
    { letter: 'R', name: 'Rook', unicode: { white: '♖', black: '♜' } },
    { letter: 'B', name: 'Bishop', unicode: { white: '♗', black: '♝' } },
    { letter: 'N', name: 'Knight', unicode: { white: '♘', black: '♞' } },
    { letter: 'P', name: 'Pawn', unicode: { white: '♙', black: '♟' } },
];

export function DesktopChessGame({ socket, send, color }: { color: "white" | "black" | undefined, socket: RefObject<WebSocket | null> | null, send: (data: any) => void }) {
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
        arePiecesDraggable: game.turn() === (color === "white" ? "w" : "b")
    };
    return <div className="bg-gray-950 h-screen min-w-screen grid grid-cols-[50%_50%] gap-5 p-5 justify-center items-center">


        <div className="flex justify-center items-start">
            <div className="w-full flex    aspect-square min-h-[90vh] min-w-[90vh] max-w-[80vh]  max-h-[80vh] shadow-2xl rounded-lg overflow-hidden">
                <Chessboard options={chessboardOptions} />
            </div>
        </div>
        <div className="overflow-y-auto no-scrollbar border flex p-3 flex-col gap-3 border-white/10 rounded-md h-[100%]  ">


            <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl aspect-video">

                <video ref={localVideo} autoPlay muted className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
                    You
                </div>

            </div>
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl aspect-video">

                <video ref={remoteVideo} autoPlay muted className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
                    Oppnent
                </div>

            </div>

            <div className="bg-gray-800/40 border border-gray-700 rounded-2xl ">

                <MediaControlBar startVideo={SendVideo} />
            </div>
            <div className="bg-slate-800/20  backdrop-blur-xl  rounded-2xl border  border-slate-700 shadow-2xl  flex flex-col">
                {/* Header */}
                <div className="border-b border-slate-700 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-white text-2xl font-bold">Move History</h2>

                        </div>
                    </div>
                </div>
                <div className="flex-1 px-5 py-2  ">
                    <div className="bg-slate-900/50 border-b-white/20 border justify-center rounded-md overflow-hidden h-10 flex flex-col">
                        {/* Table Header */}
                        <div className="grid grid-cols-2 gap-2 bg-slate-800 p-4 border-b border-slate-700">

                            <div className="col-span-1 w-full justify-center text-slate-400 text-sm font-bold flex items-center">

                                White
                            </div>
                            <div className="col-span-1 flex  justify-center text-slate-400 text-sm font-bold  items-center gap-2">

                                Balck
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" overflow-y-auto no-scrollbar py-1 px-5   grid grid-cols-2 min-h-10 pb-6  max-h-50 w-full ">
                    {
                        history.filter(color => color.color === "w" || color.color == "b").map((move, id) => {
                            return <div className="flex   h-12   justify-center items-center">

                                <div className="inline-block w-full text-center  bg-blue-900/10 hover:bg-blue-800/40 px-4 py-2 border-b-white/20  border border-slate-700/30 transition-colors">
                                    <span className="text-white font-mono font-bold text-sm flex gap-2 items-center">
                                        <span className="text-gray-300 flex gap-2 items-center ">
                                            <span className="text-xl">
                                                {
                                                    chessPieces.find(piece => piece.letter === move.peice.toUpperCase())?.unicode.black
                                                }
                                            </span>
                                            <span>
                                                {
                                                    move.from
                                                }
                                            </span>
                                        </span>
                                        <ArrowRight size={15} />
                                        <span>
                                            {move.to}</span>
                                    </span>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </div>
}