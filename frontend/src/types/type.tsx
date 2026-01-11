import { type RefObject } from "react";
import {type ChessboardOptions } from "react-chessboard";

export interface historyType {
    from: string;
    to: string; peice: string;
    color: "b" | "w"
}
export interface compType{
        remoteVideo:RefObject<HTMLVideoElement | null>
    localVideo:RefObject<HTMLVideoElement | null>
    chessboardOptions:ChessboardOptions
    history:historyType[]
    SendVideo:()=>void
}