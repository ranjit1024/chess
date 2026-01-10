
import { useEffect, useRef, useState, type RefObject } from "react";
import { Chess } from "chess.js";
import { Chessboard, type PieceDropHandlerArgs } from "react-chessboard";
import { useSocket } from "../hooks/useScoket";
import { AwardIcon, Mic, VideoIcon } from "lucide-react";
export function White(socket: { socket: RefObject<WebSocket | null> }) {
    const localVideoRef = useRef<HTMLVideoElement>(null);
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const localStreamRef = useRef<MediaStream | null>(null);
    const pcRef = useRef<RTCPeerConnection | null>(null);
    const [isVideoEnabled, setIsVideoEnabled] = useState(true);
    const [isAudioEnabled, setIsAudioEnabled] = useState(true);
    const [callStarted, setCallStarted] = useState(false);

    useEffect(() => {
        // Initialize RTCPeerConnection
        const pc = new RTCPeerConnection({
            iceServers: [
                { urls: 'stun:stun.l.google.com:19302' },
                { urls: 'stun:stun1.l.google.com:19302' }
            ]
        });
        pcRef.current = pc;

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate && socket.socket.current?.readyState === WebSocket.OPEN) {
                socket.socket.current.send(JSON.stringify({
                    type: 'candidate',
                    candidate: event.candidate
                }));
            }
        };

        // Handle remote stream
        pc.ontrack = (event) => {
            if (remoteVideoRef.current && event.streams[0]) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        // Handle WebSocket messages
        const handleMessage = async (event: MessageEvent) => {
            const data = JSON.parse(event.data);

            switch (data.type) {
                case 'offer':
                    // Auto-start media for incoming call
                    if (!callStarted) {
                        await startCall();
                    }
                    await pc.setRemoteDescription(data.offer);
                    const answer = await pc.createAnswer();
                    await pc.setLocalDescription(answer);
                    socket.socket.current?.send(JSON.stringify({
                        type: 'answer',
                        answer: answer
                    }));
                    break;

                case 'answer':
                    await pc.setRemoteDescription(data.answer);
                    break;

                case 'candidate':
                    await pc.addIceCandidate(data.candidate);
                    break;
            }
        };

        // Attach message listener
        if (socket.socket.current) {
            socket.socket.current.addEventListener('message', handleMessage);
        }

        // Cleanup
        return () => {
            localStreamRef.current?.getTracks().forEach(track => track.stop());
            pc.close();
            if (socket.socket.current) {
                socket.socket.current.removeEventListener('message', handleMessage);
            }
        };
    }, [callStarted]);

    // Start call function - triggered by button click
    const startCall = async () => {
        try {
            // Get local media
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            localStreamRef.current = stream;

            // Display local video
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }

            // Add tracks to peer connection
            stream.getTracks().forEach(track => {
                pcRef.current?.addTrack(track, stream);
            });

            setCallStarted(true);

            // Create and send offer (for white player initiating)
            const offer = await pcRef.current?.createOffer();
            await pcRef.current?.setLocalDescription(offer);
            socket.socket.current?.send(JSON.stringify({
                type: 'offer',
                offer: offer
            }));

        } catch (error) {
            console.error('Error starting call:', error);
            alert('Failed to access camera/microphone. Please check permissions.');
        }
    };

    // End call function
    const endCall = () => {
        localStreamRef.current?.getTracks().forEach(track => track.stop());
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = null;
        }
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
        }
        setCallStarted(false);
    };

    // Toggle video
    const toggleVideo = () => {
        const videoTrack = localStreamRef.current?.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
            setIsVideoEnabled(videoTrack.enabled);
        }
    };

    // Toggle audio
    const toggleAudio = () => {
        const audioTrack = localStreamRef.current?.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            setIsAudioEnabled(audioTrack.enabled);
        }
    };

    return (
        <div className="justify-between flex-col p-1 flex h-fit">
            <div className="flex items-center gap-2 bg-zinc-800 rounded px-3 py-1 absolute top-0 right-1 w-full justify-between">
                <div className="">moves</div>
                <div className="flex gap-2">
                    {!callStarted ? (
                        <button 
                            onClick={startCall}
                            className="rounded-2xl bg-green-500 px-3 py-1 text-white text-sm"
                        >
                            Start Call
                        </button>
                    ) : (
                        <>
                            <div 
                                onClick={toggleVideo} 
                                className={`rounded-2xl ${isVideoEnabled ? 'bg-blue-400' : 'bg-red-500'} size-5 p-1 text-white flex rotate-180 justify-center items-center cursor-pointer`}
                            >
                                <VideoIcon />
                            </div>
                            <div 
                                onClick={toggleAudio} 
                                className={`rounded-2xl ${isAudioEnabled ? 'bg-blue-400' : 'bg-red-500'} size-5 p-1 text-white flex justify-center items-center cursor-pointer`}
                            >
                                <Mic />
                            </div>
                            <button 
                                onClick={endCall}
                                className="rounded-2xl bg-red-500 px-2 py-1 text-white text-xs"
                            >
                                End
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Local video */}
            <div className="w-full h-64 overflow-hidden">
                <video 
                    ref={localVideoRef}
                    autoPlay 
                    playsInline 
                    muted
                    className="w-full h-full object-cover bg-black"
                />
            </div>

            {/* Remote video - only show when call started */}
            {callStarted && (
                <div className="w-full h-64 overflow-hidden mt-2">
                    <video 
                        ref={remoteVideoRef}
                        autoPlay 
                        playsInline
                        className="w-full h-full object-cover bg-black"
                    />
                </div>
            )}
        </div>
    );
}
