import { WebSocketServer } from "ws";
import { GameManager } from "./game/gamemager";
const wss = new WebSocketServer({ port: 8080 });
const gameManager = new GameManager();
wss.on("connection", (ws,req:Response) => {
  const params = new URL(req.url, "http://localhost").searchParams;
  const id = params.get("id") as string;
  gameManager.addPlayer(ws,id);
});