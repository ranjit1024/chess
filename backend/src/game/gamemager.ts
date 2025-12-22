import WebSocket from "ws";
import { Game } from "./game";


export class GameManager {
    private game = new Map<string, Game>();
    private waitingPlayers: WebSocket | null = null;

    addPlayer(ws: WebSocket) {
        if (this.waitingPlayers) {
            new Game(crypto.randomUUID(), this.waitingPlayers, ws)
        }
        else {
            this.waitingPlayers = ws;
            ws.send(JSON.stringify("WAITING"))
        }
    }

    listen(game: Game) {
        Object.values(game.players).forEach((player) => {
            player.on("message", (data) => {
                const msg = JSON.parse(data.toString())
                if (msg.type === "MOVE") {
                    const success = game.makeMove(
                        player,
                        msg.from,
                        msg.to
                    );

                    if (!success) return;

                    const state = JSON.stringify({
                        type: "UPDATE",
                        ...game.getState(),
                    });

                    game.players.white.send(state);
                    game.players.black.send(state);
                }
            })
        })
    }

    startGame(game: Game, gameId: string) {
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