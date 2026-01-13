import { Chessboard } from "react-chessboard"
import { type compType } from "@/types/type"
import { ControlButton } from "./media_contrller"
import { ArrowRight, Mic, MicOff, Video, VideoOff, Volume2, VolumeX } from "lucide-react"
import GameNotification from "./player_left";
import AestheticWin from "./win";
import AestheticLoss from "./loss";
import Toast from "./caramranotfound";
import { useState, useEffect } from "react";

const chessPieces = [
    { letter: 'K', name: 'King', unicode: { white: '♔', black: '♚' } },
    { letter: 'Q', name: 'Queen', unicode: { white: '♕', black: '♛' } },
    { letter: 'R', name: 'Rook', unicode: { white: '♖', black: '♜' } },
    { letter: 'B', name: 'Bishop', unicode: { white: '♗', black: '♝' } },
    { letter: 'N', name: 'Knight', unicode: { white: '♘', black: '♞' } },
    { letter: 'P', name: 'Pawn', unicode: { white: '♙', black: '♟' } },
];

export function Desktop({ 
    remoteVideo, 
    camaraNotFound, 
    toggleVideo, 
    toggleAudio, 
    win, 
    loss, 
    localVideo, 
    chessboardOptions, 
    history, 
    SendVideo, 
    color, 
    disconnect ,
    remoteStream
}: compType) {
    const [startCamara, setStartCmara] = useState<boolean>(false);
    const [isCamaraon, setIscamaraOn] = useState<boolean>(false);

    const [isMicOn, setIsMicOn] = useState(true);
    
   
    const [isRemoteMuted, setIsRemoteMuted] = useState<boolean>(false);

    useEffect(() => {
        async function playVideos() {
            try{
                if(remoteVideo.current && remoteStream.current){
                    await remoteVideo.current.play()
                }
            }
            catch(e){
                console.log(e)
            }
        }
        playVideos();
    }, [remoteStream.current]);

    return (
        <div className="bg-gray-950 h-screen min-w-screen grid grid-cols-[50%_50%] gap-5 p-5 justify-center items-center">
            {camaraNotFound ? (
                <Toast
                    type="error"
                    title="Camera Failed"
                    message="Unable to access webcam. Please check permissions."
                    onClose={() => console.log('closed')}
                />
            ) : null}
            {disconnect ? <GameNotification color={color} /> : null}
            {win ? <AestheticWin winner={color} /> : null}
            {loss ? <AestheticLoss losser={color} /> : null}
            
            <div className="flex justify-center items-start">
                <div className="w-full flex aspect-square min-h-[90vh] min-w-[90vh] max-w-[80vh] max-h-[80vh] shadow-2xl rounded-lg overflow-hidden">
                    <Chessboard options={chessboardOptions} />
                </div>
            </div>
            
            <div className="overflow-y-auto no-scrollbar border flex p-3 flex-col gap-3 border-white/10 rounded-md h-[100%]">

                <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl aspect-video">
                    
                    <video ref={localVideo} autoPlay muted playsInline className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
                        You
                    </div>
                </div>
                
         
                <div className="relative rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 shadow-2xl aspect-video">
                  
                    <video 
                        ref={remoteVideo} 
                        autoPlay 
                        playsInline 
                        muted={isRemoteMuted} 
                        className="w-full h-full object-cover" 
                    />
                    <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
                        Opponent
                    </div>
                </div>

              
                <div className="bg-gray-800/40 border flex justify-center gap-3 p-2 border-gray-700 rounded-lg">
                   
                    {startCamara ? (
                        <ControlButton 
                            isActive={isCamaraon}
                            onClick={async () => {
                                setIscamaraOn(!isCamaraon);
                                toggleVideo();
                            }} 
                            label="video"
                        >
                            <div>
                                {isCamaraon && startCamara ? <Video size={20} /> : <VideoOff size={20} />}
                            </div>
                        </ControlButton>
                    ) : (
                        <ControlButton 
                            isActive={startCamara}
                            onClick={async () => {
                                const status = await SendVideo();
                                if (status === true) {
                                    setStartCmara(true);
                                    setIscamaraOn(true);
                                } else {
                                    setStartCmara(false);
                                }
                            }} 
                            label="video"
                        >
                            <div>
                                {startCamara ? <Video size={20} /> : <VideoOff size={20} />}
                            </div>
                        </ControlButton>
                    )}
                    
                    
                    <ControlButton 
                        isActive={isMicOn}
                        onClick={() => {
                            // This now correctly calls the prop to toggle Local Audio tracks
                            toggleAudio(); 
                            setIsMicOn(!isMicOn);
                        }} 
                        label="mic"
                    >
                        <div>
                            {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}
                        </div>
                    </ControlButton>

                    <ControlButton 
                        isActive={!isRemoteMuted}
                        onClick={() => {
                            if (remoteVideo.current) {
                             
                                setIsRemoteMuted(!isRemoteMuted);
                            }
                        }} 
                        label="speaker"
                    >
                        <div>
                            {!isRemoteMuted ? <Volume2 size={20} /> : <VolumeX size={20} />}
                        </div>
                    </ControlButton>
                </div>
                

                <div className="bg-slate-800/20 backdrop-blur-xl rounded-2xl border border-slate-700 shadow-2xl flex flex-col">
                    <div className="border-b border-slate-700 p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-white text-2xl font-bold">Move History</h2>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex-1 px-5 py-2">
                        <div className="bg-slate-900/50 border-b-white/20 border justify-center rounded-md overflow-hidden h-10 flex flex-col">
                            <div className="grid grid-cols-2 gap-2 bg-slate-800 p-4 border-b border-slate-700">
                                <div className="col-span-1 w-full justify-center text-slate-400 text-sm font-bold flex items-center">
                                    White
                                </div>
                                <div className="col-span-1 flex justify-center text-slate-400 text-sm font-bold items-center gap-2">
                                    Black
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-y-auto no-scrollbar py-1 px-5 grid grid-cols-2 min-h-10 pb-6 max-h-50 w-full">
                        {history
                            .filter(move => move.color === "w" || move.color === "b")
                            .map((move, id) => (
                                <div key={id} className="flex h-12 justify-center items-center">
                                    <div className="inline-block w-full text-center bg-blue-900/10 hover:bg-blue-800/40 px-4 py-2 border-b-white/20 border border-slate-700/30 transition-colors">
                                        <span className="text-white font-mono font-bold text-sm flex gap-2 items-center">
                                            <span className="text-gray-300 flex gap-2 items-center">
                                                <span className="text-xl">
                                                    {chessPieces.find(piece => piece.letter === move.peice.toUpperCase())?.unicode[move.color === "w" ? "white" : "black"]}
                                                </span>
                                                <span>{move.from}</span>
                                            </span>
                                            <ArrowRight size={15} />
                                            <span>{move.to}</span>
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}