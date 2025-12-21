export function SidePanel() {
  return (
    <div className="flex-1 rounded-2xl bg-zinc-900/60 p-6 shadow-2xl border border-zinc-800 backdrop-blur flex flex-col">
      
      {/* Room Info */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Multiplayer Room</h2>
        <p className="text-sm text-zinc-400">Waiting for opponent</p>
      </div>

      {/* Players */}
      <div className="flex flex-col gap-4 mb-6">
        <PlayerCard name="You" status="Ready" />
        <PlayerCard name="Opponent" status="Waiting" />
      </div>

      {/* Join Button */}
      <button className="
        mt-auto w-full rounded-xl bg-emerald-500
        py-3 font-semibold text-black
        hover:bg-emerald-400 active:scale-[0.98]
        transition hover:cursor-pointer
      ">
        Join Game
      </button>
    </div>
  );
}
function PlayerCard({ name, status }: { name: string; status: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-zinc-800/70 px-4 py-3">
      <span className="font-medium">{name}</span>
      <span className="text-sm text-zinc-400">{status}</span>
    </div>
  );
}
