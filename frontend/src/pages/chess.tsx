import { Chessboard } from "react-chessboard";

export function Chess(){
    return <div className="p-5 bg-gray-900 md:grid md:grid-cols-2 gap-5">
        <div className="">

            <Chessboard/>
        </div>
        <div className="text-white max-md:hidden p-5 bg-gray-800 rounded ">
            fdsf
        </div>

    </div>
}