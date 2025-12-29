import {Chess} from "chess.js";
import WebSocket from "ws";
export class Game{
    id:string
    chess:Chess;
    players:{
        black:WebSocket;
        white:WebSocket
    };

    constructor(id:string,white:WebSocket, black:WebSocket){
        this.id = crypto.randomUUID();
        this.chess = new Chess();
        this.players = {white,black};
    }
    
    makeMove(player:WebSocket, from:string, to:string){
        const color = player === this.players.white ? "w" :"b";

        if(this.chess.turn() !== color) return;
        const move = this.chess.move({from,to});
        return  move ? true : false
    }

    getState(){
        return {
            fen:this.chess.fen(),
            board:this.chess.board(),
            turn:this.chess.turn()
        }
    }
}