import WebSocket from "ws";
import { Game } from "./game";


export class GameManager {
    private games = new Map<string, Game>();
    private waitingPlayers: {id:string, socket:WebSocket} | null = null;

    addPlayer(ws: WebSocket,id:string) {
        if (this.waitingPlayers) {
            if(this.waitingPlayers.id === id){
                ws.send(JSON.stringify({
                    msg:"Same User"
                }))
                this.waitingPlayers = null;
                return;
            }
            const gameId = crypto.randomUUID()
            const game = new Game(gameId, this.waitingPlayers.socket, ws);
            this.games.set(gameId, game);

            this.startGame(game, gameId);
            this.listen(game);

            this.waitingPlayers = null;
        }
        else {
            this.waitingPlayers = {id:id,socket:ws};
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
                        from:msg.from,
                        to:msg.to,
                        color:msg.color,
                        peice:msg.peice,
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