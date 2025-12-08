import { WebSocket, WebSocketServer } from "ws";
import { GameManager } from "./GameManger";
const wss = new WebSocketServer({port:8080});
const gameManager = new GameManager();

wss.on('connection',(ws)=>{
    ws.on('error', console.error);
    gameManager.addUser(ws);
    ws.on("disconnect",()=>{
        gameManager.removeUser(ws)
        
    })
})