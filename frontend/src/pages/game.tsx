import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import { useSocket } from "../hooks/useScoket";
import VideoPanel from "../component/siderbar";

export default function Game() {
    const [game, setGame] = useState(new Chess());
    const [color, setColor] = useState<"white" | "black" | undefined>(undefined);

    const socket = useSocket((msg) => {
        if (msg.type === "START") {
            setColor(msg.color);
        }

        if (msg.type === "UPDATE") {
            const newGame = new Chess(msg.fen);
            setGame(newGame);
        }
    });

    function onPieceDrop({sourceSquare ,targetSquare}:PieceDropHandlerArgs) {
        socket.send({
            type: "MOVE",
            from: sourceSquare,
            to: targetSquare,
        });

        return true;
    }
    const chessboardOptions = {
        position:  game.fen(),
        onPieceDrop,
        boardOrientation: color ,
        arePiecesDraggable:  game.turn() === (color === "white" ? "w" : "b")
        
    } 
    return (
        <div className="min-h-screen  bg-zinc-950 flex items-center justify-center">
            

           
            {color ? (
                <div className="grid grid-cols-2 p-5 gap-5">
                    <div>

                    <Chessboard
                    options={chessboardOptions }
                    />
                    </div>
                    
                        <div className="moves ">
                            <VideoPanel/>
                           
                            </div>
                        
                      
                </div>
            )  : (
                <p className="text-white">Waiting for opponent...</p>
            )}
        </div>
    );
}
