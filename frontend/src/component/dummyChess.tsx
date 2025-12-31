import { Chess, type Square } from 'chess.js';
import { useEffect, useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
interface MoveInput {
  from: Square;
  to: Square;
  promotion?: 'q' | 'r' | 'b' | 'n';
}
export function ChessBoard() {
  const chess = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState<string>(chess.fen());
  const [moveIndex, setMoveIndex] = useState<number>(0);
  const demoMoves: MoveInput[] = useMemo(() => [
  // White: London System setup
  { from: 'd2', to: 'd4' },
  { from: 'd7', to: 'd5' },
  { from: 'c1', to: 'f4' },    // London bishop
  { from: 'g8', to: 'f6' },
  { from: 'e2', to: 'e3' },
  { from: 'c7', to: 'c5' },
  { from: 'g1', to: 'f3' },
  { from: 'b8', to: 'c6' },
  { from: 'b1', to: 'd2' },    // Knight to d2
  { from: 'e7', to: 'e6' },
  { from: 'c2', to: 'c3' },    // Support d4 pawn
  { from: 'f8', to: 'e7' },
  { from: 'f1', to: 'd3' },    // Bishop to d3
  { from: 'e8', to: 'g8' },    // Black castles
  { from: 'e1', to: 'g1' },    // White castles
  { from: 'b7', to: 'b6' },
  { from: 'd1', to: 'e2' },
  { from: 'c8', to: 'b7' },
], []);
  useEffect(() => {
    const intervel = setInterval(() => {
      if (moveIndex < demoMoves.length) {
        const currentMove = demoMoves[moveIndex]!
        try {
          chess.move(currentMove);
          setFen(chess.fen());
          setMoveIndex(prev => prev + 1);
        } catch (error) {
          console.error('Invalid move:', error);
        }
      }
      else {
        chess.reset();
        setFen(chess.fen());
        setMoveIndex(0);
      }
    }, 1000);
    return () => clearInterval(intervel)
  }, [moveIndex, chess, demoMoves]);
  const chessboardOptions = {
    position:fen,
    animationDuration:10,
    arePiecesDraggable:false,

  }
  return (
    <div className="rounded-2xl  bg-zinc-900/60 p-6 shadow-2xl border border-zinc-800 backdrop-blur">
      <div className={`grid w-fit aspect-square  rounded-xl overflow-hidden`}>
        <Chessboard
          options={chessboardOptions}
        />
      </div>
    </div>
  );
}
