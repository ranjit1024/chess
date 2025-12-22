import { Chess } from "chess.js";

export default function MoveList({ game }: { game: Chess }) {
  const history = game.history({verbose:true});
//   console.log(history)
  const whiteMoves = history.filter(m => m.color === "w");
  const blackMoves = history.filter(m => m.color === "b");

  return (
    <div className="flex gap-4 text-white">
      {/* WHITE MOVES */}
      <div className="w-1/2">
        <h3 className="font-semibold mb-2">White</h3>
        <ul className="space-y-1">
          {whiteMoves.map((move, i) => (
            <li key={i} className="text-sm text-zinc-300">
              {i + 1}. {move.san}
            </li>
          ))}
        </ul>
      </div>

      {/* BLACK MOVES */}
      <div className="w-1/2">
        <h3 className="font-semibold mb-2">Black</h3>
        
        <ul className="space-y-1">
          {blackMoves.map((move, i) => (
              <li key={i} className="text-sm text-zinc-300">
                {i + 1}. {move.san} 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
