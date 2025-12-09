import { WebSocket } from "ws";
import { INIT_GAME } from "./messages";
import { Game } from "./Game";

export class GameManager{
    private games:Game[];
    private pendingUser :WebSocket | null;
    private users:WebSocket[];
     constructor(){
        this.games = [];
        this.users = [];
        this.pendingUser = null
     }
     addUser(socket:WebSocket){
        this.users.push(socket);
     }

     removeUser(socket:WebSocket){
        this.users.find(user => user !== socket);
     }

     private handler(socket:WebSocket){
        socket.on("message", (data)=>{ 
            const message = JSON.parse(data.toString());
            this.createGame(message.INIT_GAME, socket)
        })
     }

     private createGame = (type:string,socket:WebSocket) => {
           if(type === INIT_GAME){
                if(this.pendingUser){
                    const game = new Game(this.pendingUser,socket)
                    this.games.push(game);
                    this.pendingUser = null;
                }
                else{
                    this.pendingUser = socket;
                }
            }
     }

     private Move = (type:string, socket:WebSocket) =>{
        const game = this.games.find(game => game.player1 === socket || game.player2 === socket);
        if(game){
            // game.makeMove(socket)
        }
     }
}