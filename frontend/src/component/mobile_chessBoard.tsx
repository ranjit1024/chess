export interface historyType {
    from: string;
    to: string; peice: string;
    color: "b" | "w"
}
import { useState } from "react";
import { Chess } from "chess.js";

import { useSocket } from "../hooks/useScoket";
import { MobileChessGame } from "./Mobile_chess_game"


import MatchmakingLoader from "./loader";
export default function chess() {
    const [game, setGame] = useState(new Chess());
    const [color, setColor] = useState<"white" | "black" | undefined>(undefined);
    const [history, setHistory] = useState<historyType[]>([]);
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
                    {color === "white" ? <MobileChessGame socket={color === "white"?socket.socketRef:null} color={color} send={socket.send}/>:null}
                        </div>
                        <div className="h-full">
                             {color === "black" ? <MobileChessGame socket={color === "black"?socket.socketRef:null} color={color} send={socket.send}/>:null}
                            </div>
                </div>
               
                :<MatchmakingLoader/>
            }
        </div>
    );
}


