import { Button } from "../components/button";
import { Chessboard } from "../components/chess_board";

export default function Chess(){
    return <div className="flex justify-center h-[100vh] p-4 bg-gray-900 ">
        <div className="grid grid-cols-[70%_30%] w-full">

        <div className="w-full bg-green-50">
            <Chessboard/>
        </div>
    <div>
        
    </div>
        </div>
    </div>
}