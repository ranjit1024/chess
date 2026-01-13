import { type RefObject, type Dispatch } from "react";
import { type ChessboardOptions } from "react-chessboard";

export interface historyType {
    from: string;
    to: string; peice: string;
    color: "b" | "w"
}
export interface compType {
    remoteVideo: RefObject<HTMLVideoElement | null>,
    localVideo: RefObject<HTMLVideoElement | null>,
    remoteStream : RefObject<MediaStream | null>,
    chessboardOptions: ChessboardOptions,
    history: historyType[],
    color: "white" | "black",
    win: boolean,
    loss: boolean
    disconnect: boolean,
    camaraNotFound: boolean,
    toggleVideo: () => void;
    toggleAudio: () => void;
    SendVideo: () => Promise<boolean>
}