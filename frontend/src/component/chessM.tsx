export interface historyType {
    from: string;
    to: string; peice: string;
    color: "b" | "w"
}
import { useEffect, useRef, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import { useSocket } from "../hooks/useScoket";
import { Mic, VideoIcon } from "lucide-react";
export default function MChess() {
    const [game, setGame] = useState(new Chess());
    const [color, setColor] = useState<"white" | "black" | undefined>(undefined);
    const [history, setHistory] = useState<historyType[]>([]);
    const pcRef = useRef<RTCPeerConnection | null>(null)
    const history1 = game.history({ verbose: true })
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const [callStarted, setCallStarted] = useState(false);
    const socket = useSocket((msg) => {
        if (msg.type === "START") {
            setColor(msg.color);
        }
        if (msg.type === "UPDATE") {
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
    useEffect(() => {
        const pc = new RTCPeerConnection();
        pcRef.current = pc;

        pc.onicecandidate = (event) => {
            if (event.candidate && socket.socketRef.current?.readyState === WebSocket.OPEN) {
                socket.socketRef.current.send(JSON.stringify({
                    type: 'candidate',
                    candidate: event.candidate
                }))
            }
        }
        pc.ontrack = (event) =>{
            if(remoteVideoRef.current && event.streams[0]){
                remoteVideoRef.current.srcObject = event.streams[0]
            }
        }

    }, [])
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
        boardWidth: 100,
        arePiecesDraggable: game.turn() === (color === "white" ? "w" : "b")
    }
    return (
        <div className="h-screen  bg-zinc-950 overflow-hidden flex items-center justify-center">

            {color ? (
                <div className="grid  w-full text-white grid-rows-[20%_60%_20%] justify-center items-center h-full">
                    <div className="relative">
                        <div className=" justify-between  flex-col p-1 flex h-fit">

                            <div className="flex items-center gap-2 bg-zinc-800 rounded px-3 py-1 absolute  -bottom-3 right-1 w-full justify-between">
                                <div className="">
                                    moves
                                </div>
                                <div className="flex gap-2">
                                    <div className=" rounded-2xl bg-blue-400 size-5 p-1 text-white flex rotate-180 justify-center items-center"><VideoIcon /></div>
                                    <div className=" rounded-2xl bg-blue-400 size-5 p-1 text-white flex  justify-center items-center"><Mic /></div>
                                </div>

                            </div>
                            <div className="w-full h-64 overflow-hidden ">
                                <video className="w-full h-full object-cover bg-black">...</video>
                            </div>
                        </div>
                    </div>
                    <div className=" ">
                        <Chessboard options={chessboardOptions} />

                    </div>
                    <div className="relative ">
                        <div className=" justify-between  bottom-1 flex-col p-1 flex h-fit">

                            <div className="flex items-center gap-2 bg-zinc-800 rounded px-3 py-1 absolute  -top-4 right-1 w-full justify-between">
                                <div className="">
                                    moves
                                </div>
                                <div className="flex gap-2">
                                    <div className=" rounded-2xl bg-blue-400 size-5 p-1 text-white flex rotate-180 justify-center items-center"><VideoIcon /></div>
                                    <div className=" rounded-2xl bg-blue-400 size-5 p-1 text-white flex  justify-center items-center"><Mic /></div>
                                </div>

                            </div>
                            <div className="w-full h-64 overflow-hidden ">
                                <video className="w-full h-full object-cover bg-black">...</video>
                            </div>
                        </div>
                    </div>

                </div>
            ) : (
                <p className="text-white">Waiting for opponent...</p>
            )}
        </div>
    );
}


