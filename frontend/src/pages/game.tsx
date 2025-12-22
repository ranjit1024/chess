import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import { useSocket } from "../hooks/useScoket";

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
    var config = {
        draggable: true,
        position: 'start'
    }
    const chessboardOptions = {
        position:  game.fen(),
        onPieceDrop,
        boardOrientation: color ,
        arePiecesDraggable:  game.turn() === (color === "white" ? "w" : "b")
        
    } 
    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center">

            {color ? (
                <div className="w-150">

                    <Chessboard
                    options={chessboardOptions }
                    />
                </div>
            ) : (
                <p className="text-white">Waiting for opponent...</p>
            )}
        </div>
    );
}
