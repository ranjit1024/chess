import { SidePanel } from "@/component/dsidepanel";
import { ChessBoard } from "@/component/dummyChess";
export  function Chess() {
  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-950 via-zinc-900 to-black text-zinc-100 flex items-center justify-center p-6">
      <div className="grid grid-cols-2 w-fit max-w-6xl gap-8 max-md:flex-col max-md:flex ">
        <ChessBoard  />
        
        <SidePanel/>
      </div>
    </div>
  );
}
