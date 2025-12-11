import WebSocket from "ws";
import { Chess } from "chess.js";
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";
import { th } from "zod/v4/locales";
export class Game {
    public player1: WebSocket;
    public player2: WebSocket;
    private board: Chess;
    private moves: string;
    private startTime: Date;
    constructor(player1: WebSocket, player2: WebSocket) {
        this.player1 = player1;
        this.player2 = player2;
        this.board = new Chess();
        this.moves = "";
        this.startTime = new Date();
        
        this.player1.send(JSON.stringify({
            type: INIT_GAME,
            payload:{
                color:"white"
            }
        }))
        this.player2.send(JSON.stringify({
            type: INIT_GAME,
            payload:{
                color:"black"
            }
        }))
    }

    makeMove(socket: WebSocket, move: { from: string, to: string }) {
        const turn = this.board.turn();
        
        if(turn === 'w' && socket !== this.player1){
            console.log("Not Player 1's turn");
            return;
        }
        if(turn === 'b' && socket !== this.player2){
            console.log("Not Player 2's turn");
            return;
        }
        try{
            this.board.move(move);
        }catch(e){
            console.log(e)
        }
        if(this.board.isGameOver()){
            this.player1.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn() === "w" ? "black" : "white"
                }
            }))
            this.player2.send(JSON.stringify({
                type:GAME_OVER,
                payload:{
                     winner:this.board.turn() === "w" ? "black" : "white"
                }
            }))
            return;
        }
        const opponent = (socket === this.player1) ? this.player2 : this.player1;
        if(opponent){
            console.log("Inside 1")
            opponent.send(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
    }
}