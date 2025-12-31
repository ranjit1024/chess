import { CameraIcon, VideoIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// Configuration
const WS_URL = "ws://localhost:8080"; // Note: ws:// protocol, not http://
const ICE_SERVERS = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
  ],
};

const VideoCall = () => {
  const [isConnected, setIsConnected] = useState(false);
  
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const wsRef = useRef(null);
  const localStreamRef = useRef(null);

  return (
    <div className="p-4 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Native WS WebRTC Client</h2>
      <div className="flex gap-4 flex-col">
      <button className='px-10 py-3 bg-slate-900 rounded-md text-white w-fit font-medium '>Start Video
        
        </button> 

        <video ref={localVideoRef} autoPlay playsInline muted className="w-full h-48 bg-gray-900 border-2 border-blue-500" />
       
        <video ref={remoteVideoRef} autoPlay playsInline className="w-full h-48 bg-gray-900 border-2 border-green-500" />
       
      </div>
    </div>
  );
};

export default VideoCall;
