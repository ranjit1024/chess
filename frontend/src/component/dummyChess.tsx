import { Chessboard } from "react-chessboard";

export function ChessBoard() {
  return (
    <div className="rounded-2xl bg-zinc-900/60 p-6 shadow-2xl border border-zinc-800 backdrop-blur">
      <div className="grid aspect-square w-130 rounded-xl overflow-hidden">
       <Chessboard/>
      </div>
    </div>
  );
}
