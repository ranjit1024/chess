import { Chessboard } from "react-chessboard"
import { type compType } from "@/types/type"
import MediaControlBar from "./media_contrller"
import { ArrowRight } from "lucide-react"
import GameNotification from "./player_left";
import AestheticWin from "./win";
import AestheticLoss from "./loss";
import Toast from "./caramranotfound";

const chessPieces = [
    { letter: 'K', name: 'King', unicode: { white: '♔', black: '♚' } },
    { letter: 'Q', name: 'Queen', unicode: { white: '♕', black: '♛' } },
    { letter: 'R', name: 'Rook', unicode: { white: '♖', black: '♜' } },
    { letter: 'B', name: 'Bishop', unicode: { white: '♗', black: '♝' } },
    { letter: 'N', name: 'Knight', unicode: { white: '♘', black: '♞' } },
    { letter: 'P', name: 'Pawn', unicode: { white: '♙', black: '♟' } },
];
export function Desktop({ remoteVideo, camaraNotFound, win, loss, localVideo, chessboardOptions, history, SendVideo, color, disconnect }: compType) {
    return <div className="bg-gray-950 h-screen min-w-screen grid grid-cols-[50%_50%] gap-5 p-5 justify-center items-center">
        {camaraNotFound ? <Toast
            
            
            type="error"
            title="Camera Failed"
            message="Unable to access webcam. Please check permissions."
            onClose={() => console.log('closed')}
        /> : null}
        {disconnect ? <GameNotification color={color} /> : null}
        {win ? <AestheticWin winner={color} /> : null}
        {loss ? <AestheticLoss losser={color} /> : null}
        <div className="flex justify-center items-start">

            <div className="w-full flex    aspect-square min-h-[90vh] min-w-[90vh] max-w-[80vh]  max-h-[80vh] shadow-2xl rounded-lg overflow-hidden">
                <Chessboard options={chessboardOptions} />
            </div>
        </div>
        <div className="overflow-y-auto no-scrollbar border flex p-3 flex-col gap-3 border-white/10 rounded-md h-[100%]  ">


            <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl aspect-video">

                <video ref={localVideo} autoPlay muted className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
                    You
                </div>

            </div>
            <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl aspect-video">

                <video ref={remoteVideo} autoPlay muted className="w-full h-full object-cover" />
                <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
                    Oppnent
                </div>

            </div>

            <div className="bg-gray-800/40 border border-gray-700 rounded-2xl ">

                <MediaControlBar startVideo={SendVideo} />
            </div>
            <div className="bg-slate-800/20  backdrop-blur-xl  rounded-2xl border  border-slate-700 shadow-2xl  flex flex-col">
                {/* Header */}
                <div className="border-b border-slate-700 p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-white text-2xl font-bold">Move History</h2>

                        </div>
                    </div>
                </div>
                <div className="flex-1 px-5 py-2  ">
                    <div className="bg-slate-900/50 border-b-white/20 border justify-center rounded-md overflow-hidden h-10 flex flex-col">
                        {/* Table Header */}
                        <div className="grid grid-cols-2 gap-2 bg-slate-800 p-4 border-b border-slate-700">

                            <div className="col-span-1 w-full justify-center text-slate-400 text-sm font-bold flex items-center">

                                White
                            </div>
                            <div className="col-span-1 flex  justify-center text-slate-400 text-sm font-bold  items-center gap-2">

                                Balck
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" overflow-y-auto no-scrollbar py-1 px-5   grid grid-cols-2 min-h-10 pb-6  max-h-50 w-full ">
                    {
                        history.filter(color => color.color === "w" || color.color == "b").map((move, id) => {
                            return <div key={id} className="flex   h-12   justify-center items-center">

                                <div className="inline-block w-full text-center  bg-blue-900/10 hover:bg-blue-800/40 px-4 py-2 border-b-white/20  border border-slate-700/30 transition-colors">
                                    <span className="text-white font-mono font-bold text-sm flex gap-2 items-center">
                                        <span className="text-gray-300 flex gap-2 items-center ">
                                            <span className="text-xl">
                                                {
                                                    chessPieces.find(piece => piece.letter === move.peice.toUpperCase())?.unicode.black
                                                }
                                            </span>
                                            <span>
                                                {
                                                    move.from
                                                }
                                            </span>
                                        </span>
                                        <ArrowRight size={15} />
                                        <span>
                                            {move.to}</span>
                                    </span>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    </div>
}