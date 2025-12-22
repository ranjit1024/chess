// Responsibilities

// ✔ Match players
// ✔ Create games
// ✔ Listen to player messages
// ✔ Route moves to the right game

import WebSocket from "ws";
import { Game } from "./game";

export class GameManager {
    private games = new Map<string, Game>();
    private waintingPlayer: WebSocket | null = null;

    addPlayer(ws: WebSocket) {
        if (this.waintingPlayer) {
            const gameId = crypto.randomUUID();
            const game = new Game(gameId, this.waintingPlayer, ws)// game logig new to write
            this.games.set(gameId, game);
            this.sendStart(game, gameId);
            this.listen(game);
            this.waintingPlayer = null;
        }
        else {
            this.waintingPlayer = ws;
            ws.send(JSON.stringify({ type: "WAITING" }))
        }


    }
    listen(game: Game) {
        Object.values(game.players).forEach((players) => {
            players.on("message", (data) => {
                const msg = JSON.parse(data.toString());
                try{
                if (msg.type === "MOVE") {
                    const success = game.makeMove(
                        players,
                        msg.from,
                        msg.to
                    )
                    console.log(success)
                    if (!success) return;
                    const state = JSON.stringify({
                        type: "UPDATE",
                        from: msg.from,
                        to:msg.to,
                        color:msg.color,
                        peice:msg.peice,
                        ...game.getState()
                    })
                    game.players.white.send(state);
                    game.players.black.send(state);
                }
            }
            catch(e){
                console.log(e)
            }
            })
        })
    }

    sendStart(game: Game, gameId: string) {
        game.players.white.send(JSON.stringify({
            type: "START",
            color: "white",
            gameId,
        }));

        game.players.black.send(JSON.stringify({
            type: "START",
            color: "black",
            gameId,
        }));
    }

}