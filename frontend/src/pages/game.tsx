import { useState } from "react";
import { Chess } from "chess.js";

import { useSocket } from "../hooks/useScoket";

import MatchmakingLoader from "../component/loader";
import { ChessGame } from "../component/chess_game";
export default function chess() {
    const [game, setGame] = useState(new Chess());
    const [color, setColor] = useState<"white" | "black" | undefined>(undefined);
    const history1 = game.history({ verbose: true })
    const socket = useSocket((msg) => {
        if (msg.type === "START") {
            setColor(msg.color);
        }
    });

    return (
        <div className="min-h-screen  bg-zinc-950 flex ">
            {
                color ? <div className="h-full">
                    <div className="h-full">
                    {color === "white" ? <ChessGame socket={color === "white"?socket.socketRef:null} color={color} send={socket.send}/>:null}
                        </div>
                        <div className="h-full">
                             {color === "black" ? <ChessGame socket={color === "black"?socket.socketRef:null} color={color} send={socket.send}/>:null}
                             
                            </div>
                </div>
               
                :<MatchmakingLoader/>
            }
        </div>
    );
}


