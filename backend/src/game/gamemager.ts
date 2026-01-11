import WebSocket from "ws";
import { Game } from "./game";

interface SignalingMsg {
    type: 'offer' | 'answer' | 'ice-candidate';
    payload?: any;  // RTCSessionDescriptionInit | RTCIceCandidateInit
}
export class GameManager {
    private games = new Map<string, Game>();
    private player_1: { id: string, socket: WebSocket } | null = null;
    private player_2: { id: string, socket: WebSocket } | null = null;


    addPlayer(ws: WebSocket, id: string) {
        if (this.player_1 === null) {
            this.player_1 = { id: id, socket: ws }
            ws.send(JSON.stringify("WAITING"))
        }
        else {
            if (this.player_1.id === id) {
                console.log("Same user")
                ws.send(JSON.stringify({
                    msg: "same User"
                }))
                return;
            }
            this.player_2 = { id: id, socket: ws }
            const gameId = crypto.randomUUID()
            const game = new Game(gameId, this.player_1.socket, this.player_2.socket);
            this.games.set(gameId, game);
            this.startGame(game, gameId);
            this.listen(game);
            this.player_1 = null;
            this.player_2 = null;
        }
    }
    listen(game: Game) {
        Object.values(game.players).forEach((player) => {
            player.on('close', (event)=>{
                console.log(event.valueOf())
                console.log('end')
                this.handleDisconnect(game)
            });
            player.on("message", (data) => {
                const msg = JSON.parse(data.toString())
                if (msg.type === "MOVE") {
                    try {

                        const success = game.makeMove(
                            player,
                            msg.from,
                            msg.to
                        );
                        if (!success) return;

                        const state = JSON.stringify({
                            type: "UPDATE",
                            from: msg.from,
                            to: msg.to,
                            color: msg.color,
                            peice: msg.peice,
                            ...game.getState(),
                        });

                        game.players.white.send(state);
                        game.players.black.send(state);
                    }
                    catch (e) {
                        console.log(e)
                    }
                }
               
                else if (msg.type === "offer") {
                    console.log("Relaying Offer");
                    this.relayToOpponent(game, player, {
                        type: "offer",
                        sdp: msg.sdp
                    });
                }

                else if (msg.type === "answer") {
                    console.log("Relaying Answer");
                    this.relayToOpponent(game, player, {
                        type: "answer",
                        sdp: msg.sdp
                    });
                }

                else if (msg.type === "ice-candidate") {
                    console.log("Relaying ICE Candidate");
                    this.relayToOpponent(game, player, {
                        type: "ice-candidate",
                        candidate: msg.candidate
                    });
                }

            })
        })
    }
    relayToOpponent(game: Game, sender: any, message: any) {
        const opponent = sender === game.players.white ? game.players.black : game.players.white;
        if (opponent && opponent.readyState === WebSocket.OPEN) {
            opponent.send(JSON.stringify(message));
        }
    };

    private handleDisconnect(game: Game) {
        this.games.delete(game.id);
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