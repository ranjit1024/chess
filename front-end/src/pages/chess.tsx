import { Button } from "../components/button";
import { Chessboard } from "../components/chess_board";
import { UseSocket } from "../hooks/user_socket";
import { useEffect, useState } from "react";
export const INIT_GAME = "init_game"
export const MOVE = "move";
export const GAME_OVER = "game_over"
import { Chess } from "chess.js";
export default function ChessHnader(){
    const socket = UseSocket();
    const [chess,setChess] = useState(new Chess());
    const [board,setBoard] = useState(chess.board());
    
    useEffect(()=>{
        if(!socket) return;
        socket.onmessage = (event)=>{
            const message =  JSON.parse(event.data);
            console.log(message);
            switch(message.type){
                case INIT_GAME:
                    setBoard(chess.board());
                    console.log("Game Init");
                case MOVE:
                    const move = message.payload;
                    chess.move(move);
                    setBoard(chess.board())
                    console.log("move made");
                    break;
                case GAME_OVER:
                    console.log("GAME Over");
                    break;
            }
        }
    },[])
    if(!socket) return <div> Loading...</div>
    return <div className="flex justify-center h-[100vh] p-4 bg-gray-900 ">
        <div className="grid grid-cols-[65%_35%] w-[95%] m-1 gap-4">

        <div className="w-full bg-slate-900 rounded-sm flex justify-center items-center ">
            <Chessboard board={board} socket={socket}/>
        </div>
    <div className="p-2 bg-slate-800 rounded-sm ">
        
    <Button onClick={()=>{
        socket.send(JSON.stringify({
            type:INIT_GAME
        }))
    }}>
        Play Game
    </Button>
    </div>
        </div>
    </div>
}