import React, { useState } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Settings, CameraIcon, CameraOffIcon, TestTube } from 'lucide-react';

export default function MediaControlBar({ startVideo, }: { startVideo: () => Promise<boolean> }) {
  const [isMicOn, setIsMicOn] = useState(false); // Default matches your image (Off)
  const [isCameraOn, setIsCameraOn] = useState(false); // Default matches your image (Off)
  const [camaraOn, setCamaraOn] = useState(false)
  return (<div className="flex items-center w-full gap-5 justify-center  py-3  ">


    {/* Microphone Toggle */}
    <ControlButton
      isActive={isMicOn}
      onClick={() => {
        setIsMicOn(!isMicOn)

      }}
      label={isMicOn ? "Mute" : "Unmute"}
    >
      {isMicOn ? <Mic size={20} /> : <MicOff size={20} />}


    </ControlButton>

{
  isCameraOn ?   <ControlButton
      isActive={isCameraOn}
      onClick={async () => {
        
      }}
      label={isCameraOn ? "Mute" : "Unmute"}
    >
      {isCameraOn ? <TestTube size={20} /> : <CameraOffIcon size={20} />}
    </ControlButton> : 
  <ControlButton
      isActive={isCameraOn}
      onClick={async () => {
        
        const status = await startVideo();
        if (status){
          setCamaraOn(true)
          setIsCameraOn(!isCameraOn)
        } 
        else { setCamaraOn(false) }

      }}
      label={isCameraOn ? "Mute" : "Unmute"}
    >
      {isCameraOn ? <CameraIcon size={20} /> : <CameraOffIcon size={20} />}
    </ControlButton>
}


  </div>

  );
}

// Reusable Button Component for cleaner code
interface ControlButtonProps {
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  label: string;
}

function ControlButton({ isActive, onClick, children, label }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      title={label}
      className={`
        flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 ease-in-out
        ${isActive
          ? "bg-zinc-800 text-white hover:bg-zinc-700" // ON State: Neutral/Dark
          : "bg-red-500 text-white shadow-lg shadow-red-500/30 hover:bg-red-600" // OFF State: Red (High alert)
        }
        hover:scale-110 active:scale-95
      `}
    >
      {children}
    </button>
  );
}
