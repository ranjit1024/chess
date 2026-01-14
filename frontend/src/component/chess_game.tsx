import type { RefObject } from "react";
import { useChessSound } from "../hooks/sound";
import { useEffect, useRef, useState, useMemo } from "react";
import { Chess, type Square } from "chess.js";
import { type SquareHandlerArgs } from "react-chessboard";
import { type historyType } from "@/types/type";
import { useMediaQuery } from 'react-responsive'
import { Mobile } from "./mobile";
import { Desktop } from "./desktop";


export function ChessGame({ socket, send, color }: { color: "white" | "black" | undefined, socket: RefObject<WebSocket | null> | null, send: (data: any) => void }) {
    const isMobile = useMediaQuery({ maxWidth: 767 })
    const localVideo = useRef<HTMLVideoElement>(null);
    const pcRef = useRef<RTCPeerConnection>(null)
    const remoteVideo = useRef<HTMLVideoElement>(null);
    const [game, setGame] = useState(new Chess());
    const { playMove, playCapture, playCheck } = useChessSound();
    const [history, setHistory] = useState<historyType[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [moveFrom, setMoveFrom] = useState('');
    const [optionSquares, setOptionSquares] = useState({});

    const [playerDisconnect, setPlayerDisconnect] = useState(false);
    const localStream = useRef<MediaStream | null>(null);
    const [win, setWin] = useState<boolean>(false)
    const [loss, setLoss] = useState<boolean>(false);
    const remoteStreamRef = useRef<MediaStream | null>(null); 
    const [camaraNotFound, setcamaraNotFound] = useState(false);
    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
        }
    }, [history])
    function getMovesOption(square: Square) {
        const moves = game.moves({
            square,
            verbose: true
        });

        if (moves.length === 0) {
            setOptionSquares({});
            return false;
        }
        if (color && game.get(square)?.color === (color === "white" ? "b" : "w")) {
            return
        }
        const newSquares: Record<string, React.CSSProperties> = {};
        for (const move of moves) {

            newSquares[move.to] = {
                background: game.get(move.to) && game.get(move.to)?.color !== game.get(square)?.color ? 'radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)'
                    : 'radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)',
                borderRadius: '50%'
            };
        }
        newSquares[square] = {
            background: 'rgba(255, 255, 0, 0.4)'
        };
        setOptionSquares(newSquares);
        return true;
    }
    useEffect(() => {
        pcRef.current = new RTCPeerConnection()
        if (socket?.current?.readyState !== WebSocket.OPEN) return;
        pcRef.current.onicecandidate = (event) => {
            socket.current?.send(JSON.stringify({
                type: "ice-candidate",
                candidate: event.candidate
            }))
        }
        pcRef.current.ontrack = (track) => {
            const remoteStream = track.streams[0]
            if (remoteVideo.current && remoteStream) {
                remoteStreamRef.current = remoteStream
                console.log('Steram')
                remoteVideo.current.srcObject = remoteStream
            }
        }
        socket.current.onmessage = async (event) => {
            const msg = JSON.parse(event.data);
            if (msg.type === "offer" && pcRef.current) {
                await pcRef.current.setRemoteDescription(msg.sdp);
                const ans = await pcRef.current?.createAnswer();
                await pcRef.current.setLocalDescription(ans);
                socket.current?.send(JSON.stringify({
                    type: "answer",
                    sdp: ans
                }))
            }
            else if (msg.type == "game-over") {
                console.log("didconnect")
                setPlayerDisconnect(true)
            }
            else if (msg.type === "ice-candidate" && pcRef.current) {
                console.log("Getting ice")
                await pcRef.current.addIceCandidate(msg.candidate)
            }
            else if (msg.type === "answer") {
                console.log('GEtting answer')
                await pcRef.current?.setRemoteDescription(msg.sdp)
            }
            else if (msg.type === "UPDATE") {
                // console.log("data", game.history())
                setHistory(prev => [
                    ...prev,
                    {
                        from: msg.from,
                        to: msg.to,
                        peice: msg.peice,
                        color: msg.color
                    }])
                const newGame = new Chess(msg.fen);
                setGame(newGame);
            }
            else if (msg.type === "CHECKMATE") {
                setLoss(true)
            }
          

        }
    }, [])


    function onSquareClick({
        square,
        piece
    }: SquareHandlerArgs) {
        // piece clicked to move
        if (!moveFrom && piece) {
            // get the move options for the square
            const hasMoveOptions = getMovesOption(square as Square);

            // if move options, set the moveFrom to the square
            if (hasMoveOptions) {
                setMoveFrom(square);
            }

            return;
        }

        // square clicked to move to, check if valid move
        const moves = game.moves({
            square: moveFrom as Square,
            verbose: true
        });
        const foundMove = moves.find(m => m.from === moveFrom && m.to === square);

        // not a valid move
        if (!foundMove) {
            // check if clicked on new piece
            const hasMoveOptions = getMovesOption(square as Square);

            // if new piece, setMoveFrom, otherwise clear moveFrom
            setMoveFrom(hasMoveOptions ? square : '');

            // return early
            return;
        }

        // is normal move
        try {
            const move = game.move({
                from: moveFrom,
                to: square,
                promotion: 'q'
            });
            if (move === null) {
                setOptionSquares({
                    [moveFrom]: { background: "rgba(255, 0, 0, 0.7)" }
                });
                setTimeout(() => {
                    setOptionSquares({});
                }, 500);

                return false;
            }
            if (move) {
                if (move.isCapture()) {
                    playCapture()
                }
                else if (game.inCheck()) {

                    playCapture()
                }
             
                else {
                    playMove()
                }
            }
            const data = send({
                type: "MOVE",
                from: move.from,
                to: move.to,
                color: move.color,
                peice: move.piece
            });

            if (game.isCheckmate()) {
                setWin(true)
                send({
                    type: "CHECKMATE"
                })
            }
        } catch {
            // if invalid, setMoveFrom and getMoveOptions
            const hasMoveOptions = getMovesOption(square as Square);

            // if new piece, setMoveFrom, otherwise clear moveFrom
            if (hasMoveOptions) {
                setMoveFrom(square);
            }

            // return early
            return;
        }

        setMoveFrom('');
        setOptionSquares({});
    }

        async function SendVideo(): Promise<boolean> {
        if (!pcRef.current) return false;

        console.log('fasdf')
        try {


            if (socket?.current?.readyState !== WebSocket.OPEN) return false;

            const media = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            })
            localStream.current = media
            const videoTrack = media.getVideoTracks()[0];
            const audioTrack = media.getAudioTracks()[0];
            if (localVideo.current) {
                localVideo.current.srcObject = media;
            }
           

            pcRef.current.onnegotiationneeded = async () => {
                const senderoffer = await pcRef.current!.createOffer();
                await pcRef.current!.setLocalDescription(senderoffer);
                socket?.current?.send(JSON.stringify({
                    type: "offer",
                    sdp: senderoffer
                }))
            }
            if (videoTrack && audioTrack) {
                console.log("adding meddsf")
                pcRef.current.addTrack(videoTrack, media)
                pcRef.current.addTrack(audioTrack, media)
            }
            return true
        }
        catch (e) {
            console.log(e);
            setcamaraNotFound(true);
       
            return false;
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            if (camaraNotFound === true) {
                setcamaraNotFound(false)
            }
        }, 2000);
        return () => clearTimeout(timer)
    }, [camaraNotFound])
    function toggleVideo() {
        if (!localStream.current) return;

        const videoTrack = localStream.current.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
 
        }
    }
    const toggleAudio = (): void => {
        if (!localStream.current) return;

        const videoTrack = localStream.current.getAudioTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;

        }
    };

    const chessboardOptions = {
        allowDragging: false,
        onSquareClick,
        position: game.fen(),
        squareStyles: optionSquares,
        boardOrientation: color,
        arePiecesDraggable: game.turn() === (color === "white" ? "w" : "b"),
        id: 'square-styles'
    };
    return <div>
        {isMobile ? <Mobile remoteStream={remoteStreamRef} toggleAudio={toggleAudio} camaraNotFound={camaraNotFound} win={win} loss={loss} remoteVideo={remoteVideo} color={color!} disconnect={playerDisconnect} localVideo={localVideo} chessboardOptions={chessboardOptions} history={history} SendVideo={SendVideo} toggleVideo={toggleVideo} /> :
            <Desktop
            remoteStream={remoteStreamRef}
                toggleAudio={toggleAudio}
                camaraNotFound={camaraNotFound}
                toggleVideo={toggleVideo}
                color={color!} win={win} loss={loss} disconnect={playerDisconnect} remoteVideo={remoteVideo} localVideo={localVideo} chessboardOptions={chessboardOptions} history={history} SendVideo={SendVideo} />}
    </div>
}