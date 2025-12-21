import { WebSocket,WebSocketServer } from "ws";
const ws = new WebSocketServer({port:8080});
console.log(ws)