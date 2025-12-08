import { WebSocket } from "ws";
import { INIT_GAME } from "./messages";

export class GameManager{
    private games = Game[];
    private pendingUser:WebSocket;
    private users:WebSocket[];
     constructor(){
        this.games = [];
        this.users = [];
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
            if(message.type === INIT_GAME){
                if(this.pendingUser){
                    // start the game
                }
                else{
                    this.pendingUser = socket;
                }
            }
        })
     }
}