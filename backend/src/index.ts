import { WebSocket, WebSocketServer } from "ws";
const wss = new WebSocketServer({port:8080});

wss.on('connection',(ws)=>{
    ws.on('error', console.error);
    
    ws.on('message', (data)=>{
        console.log(`receivd data from ${data}`);
    });
    ws.send('Connected')
})