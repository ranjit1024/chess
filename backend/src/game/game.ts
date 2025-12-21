// Responsibilities

// ✔ Hold chess board
// ✔ Validate moves
// ✔ Enforce turns
// ✔ Provide game state
import { Chess } from 'chess.js';
import WebSocket from 'ws';

export class Game {
    id: string;
    chess: Chess;
    players: {
        white: WebSocket;
        black: WebSocket
    }

    constructor(id: string, white: WebSocket, black: WebSocket) {
        this.id = id;
        this.chess = new Chess();
        this.players = { white, black };
    }


    makeMove(player: WebSocket, from: string, to: string) {
        const color = player === this.players.white ? "w" : "b";

        if (this.chess.turn() !== color) return false;

        const move = this.chess.move({ from, to });
        return move ? true : false;
    }

    getState() {
        return {
            fen: this.chess.fen(),
            board: this.chess.board(),
            turn: this.chess.turn(),
        };
    }
}