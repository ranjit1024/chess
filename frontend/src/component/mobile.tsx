import { Chessboard } from "react-chessboard"
import type { compType } from "@/types/type";
import { ControlButton } from "./media_contrller"
import GameNotification from "./player_left";
import AestheticWin from "./win";
import AestheticLoss from "./loss";
import Toast from "./caramranotfound";
import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Video, VideoOff, Volume2, VolumeX } from "lucide-react"
export function Mobile({ remoteVideo, remoteStream, camaraNotFound, win, loss, localVideo, chessboardOptions, history, SendVideo, toggleVideo, toggleAudio, color, disconnect }: compType) {
  const [startCamara, setStartCmara] = useState<boolean>(false);
  const [isCamaraon, setIscamaraOn] = useState<boolean>(false);

  const [isMicOn, setIsMicOn] = useState(true);
  const [isRemoteMuted, setIsRemoteMuted] = useState<boolean>(true);
  const endRef = useRef<HTMLDivElement>(null)
   
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollLeft = endRef.current.scrollWidth;
    }
  }, [history]);
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

  return <div className="h-screen w-screen bg-gray-950 flex flex-col">

    {camaraNotFound ? <Toast
      type="error"
      title="Camera Failed"
      message="Unable to access webcam. Please check permissions."
      onClose={() => console.log('closed')}
    /> : null}

    {disconnect ? <GameNotification color={color} /> : null}
    {win ? <AestheticWin winner={color} /> : null}
    {loss ? <AestheticLoss losser={color} /> : null}
    <div className="h-52 flex gap-2 p-2 bg-gray-900 border-b border-white/10">

      <div className="flex-1 rounded-lg overflow-hidden border-2 border-white/30 bg-gray-800 relative">
        <video ref={remoteVideo}  muted={isRemoteMuted} playsInline className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
          Opponent
        </div>
      </div>


      <div className="flex-1 rounded-lg overflow-hidden border-2 border-blue-500 bg-gray-800 relative">
        <video ref={localVideo} autoPlay  muted={true} playsInline className="w-full h-full object-cover" />
        <div className="absolute top-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
          You
        </div>


      </div>
    </div>


    <div className="flex-1 flex items-center justify-center p-3">
      <div className="aspect-square w-full max-w-md">
        <Chessboard options={chessboardOptions} />
      </div>
    </div>


    <div className="h-14 bg-gray-900 border-t border-white/10 p-2">
      <div
      ref={endRef}
        className="flex gap-2 overflow-x-auto h-full scrollbar-hide"
      >
        {history.filter((color: any) => color.color === "w" || color.color === "b").map((move: any, id: any) => (

          <div key={id} className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded border border-white/20">

            <span className="text-gray-200 font-semibold">{move.peice.toUpperCase()}</span>
            <span className="text-gray-400 text-xs">{move.from}</span>
            <svg className="w-3 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" />
            </svg>
            <span className="text-gray-200 font-semibold">{move.to}</span>
          </div>


        ))}
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

  </div>
}