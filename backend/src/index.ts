import { WebSocketServer } from "ws";
import { Gamermanger } from "./gamemanager";
const wss = new WebSocketServer({port:8080});
const gameManger = new Gamermanger()
wss.on('connection', (ws)=>{
    gameManger.addUser(ws);
    ws.on('close', ()=>gameManger.removeUser(ws));
})

console.log('WebSocket server is running on ws://localhost:8080');