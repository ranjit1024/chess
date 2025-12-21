import { WebSocketServer } from "ws";
import  {GameManager}  from "./game/gameManager";

export function setupWS(server: any) {
  const wss = new WebSocketServer({ server });
  const gameManager = new GameManager();

  wss.on("connection", (ws) => {
    gameManager.addPlayer(ws);
  });
}
