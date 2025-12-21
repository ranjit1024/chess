import { WebSocket,WebSocketServer } from "ws";
const wss = new WebSocketServer({port:8080});
wss.on('connection',(ws)=>{
    ws.send(JSON.stringify({
        status:"Connected"
    }))
})