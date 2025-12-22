import { WebSocketServer } from "ws";
import { GameManager } from "./game/gameManager";


const wss = new WebSocketServer({ port: 8080 });
const gameManager = new GameManager();

wss.on("connection", (ws) => {
  gameManager.addPlayer(ws);
});
