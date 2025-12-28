export interface historyType{
from:string;
to:string;peice:string;
color:"b" | "w"
}
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import { useSocket } from "../hooks/useScoket";
import VideoPanel from "@/component/siderbar";
import { MBmoves } from "./msiderBar";
export default function Mchess() {
    const [game, setGame] = useState(new Chess());
    const [color, setColor] = useState<"white" | "black" | undefined>(undefined);
    const [history,setHistory] = useState<historyType[]>([]);
    const history1 = game.history({verbose:true})
    const socket = useSocket((msg) => {
        if (msg.type === "START") {
            setColor(msg.color);
        }
        
        if (msg.type === "UPDATE") {
            // console.log("data", game.history())
            setHistory(prev => [
               ...prev, 
               {
               from:msg.from,
               to:msg.to,
               peice:msg.peice,
               color:msg.color
           }])
            const newGame = new Chess(msg.fen);
            setGame(newGame);
        }
    });

    function onPieceDrop({ sourceSquare, targetSquare }: PieceDropHandlerArgs) {
        try{
            const move = game.move({from:sourceSquare,to:targetSquare as string});
            console.log(move.piece)
            const data = socket?.send({
                type: "MOVE",
                from: sourceSquare,
                to: targetSquare,
                color:move.color,
                peice:move.piece
            });
        }
        catch(e){
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
    return (
        <div className="min-h-screen h-fit bg-zinc-950 flex items-center justify-center p-1">

            {color ? (
                <div className=" gap-5 ">
                    <div className=" grid h-screen grid-rows-[20%_60%_20%]">
                        <div className="h-fit">
                        <MBmoves/>
                            </div>
                        <div>

                        <Chessboard
                            options={chessboardOptions}
                        />
                        </div>
                          <div className="h-full">
                        <MBmoves/>
                            </div>
                        
                    </div>


                </div>
            ) : (
                <p className="text-white">Waiting for opponent...</p>
            )}
        </div>
    );
}


