import type { Color, PieceSymbol, Square } from "chess.js";
import { useState } from "react";
import { MOVE } from "../pages/chess";

export function Chessboard({board,socket}:{board:  ({
    square: Square;
    type: PieceSymbol;
    color: Color;
} | null)[][], socket:WebSocket}){
   const [from,setFrom] = useState<null | Square>(null);
     return <div className="  ">
        {
         board.map((row,i)=>{
            return <div key={i} className="flex w-[100%] "> 
            {
               row.map((square,j)=>{
                  const squareRepresentation = String.fromCharCode(97 + (j % 8))+ "" + (8 - i )as Square;

                  // console.log(squareRepresentation) 
                  return <div 
                  onClick={()=>{
                     console.log(i,j);
                     
                     if(!from){
                        setFrom(squareRepresentation)
                     }
                     else{
                      
                         socket.send(JSON.stringify({
                           type:MOVE,
                           move:{
                              from:from,
                              to:squareRepresentation
                           }
                         }))
                         console.log({
                           from,
                           newTo:squareRepresentation
                         })
                         setFrom(null)
                     }
                  }}
                  key={j}  className={`w-18 h-18  flex justify-center items-center ${(i+j) % 2 == 0?'bg-green-600':'bg-green-200'}`}>
                     {square ? square.type : ""}
                  </div>
               })
            }
            </div>
         })
            
         }
     </div>
}