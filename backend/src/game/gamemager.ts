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
            this.player_2 = { id: id, socket: ws }
            if (this.player_1.id === this.player_2.id) {
                console.log("Same user")
                ws.send(JSON.stringify({
                    msg: "same User"
                }))
                return;
            }
            const gameId = crypto.randomUUID()
            const game = new Game(gameId, this.player_1.socket, ws);
            this.games.set(gameId, game);
            this.startGame(game, gameId);
            this.listen(game);
            this.player_1 = null;
            this.player_2 = null;
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
                        from: msg.from,
                        to: msg.to,
                        color: msg.color,
                        peice: msg.peice,
                        ...game.getState(),
                    });

                    game.players.white.send(state);
                    game.players.black.send(state);
                }else{
                    this.relayOpponent(game,player,msg)
                }
               
            })
        })
    }
     private relayOpponent(game: Game, sender: WebSocket, msg: SignalingMsg): void {
    const opponent = sender === game.players.white ? game.players.black : game.players.black;
    if (opponent.readyState === WebSocket.OPEN) {
      const relayMsg: SignalingMsg = {
        type: msg.type,
        payload: msg.payload.offer || msg.payload.answer || msg.payload.candidate || msg.payload,
      };
      opponent.send(JSON.stringify(relayMsg));
    }
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