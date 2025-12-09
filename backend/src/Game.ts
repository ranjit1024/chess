import { Chess } from "chess.js";
import { errorMonitor, WebSocket } from "ws";
import z, { base64, ZodAny } from "zod";
import { GAME_OVER } from "./messages";
const movesType = z.object({
    from:z.string(),
    to:z.string()
})
export class Game{
    public player1:WebSocket;
    public player2:WebSocket;
    private board : Chess;
    private moves :string[];
    private startTime: Date;
    
    constructor(player1:WebSocket, player2:WebSocket){
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess()
        this.moves = [];
        this.startTime = new Date()
    }
    makeMove(socket:WebSocket, moves:{
        from:string,
        to:string
    }){
        const parseMoves = movesType.safeParse(moves);

        if(!parseMoves.success){
            return console.error("invlid moves type");
             
        }

        try{
            this.board.move(moves)
        }catch(e){
            console.log(e)
        }
        if(this.board.isGameOver()){
            this.player1.emit(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn() === 'w' ? "black" :"white"
                }
            }))
            this.player2.emit(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn() === 'w' ? "black" :"white"
                }
            }))
            return
        }
    }

    
}

