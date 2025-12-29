import { AlignVerticalDistributeStart, CameraIcon, Mic, VideoIcon } from "lucide-react";

export function White() {
    return <div className=" justify-between  flex-col p-1 flex h-fit">
    
            <div className="flex items-center gap-2 bg-zinc-800 rounded px-3 py-1 absolute top-0 right-1 w-full justify-between">
               <div className="">
                moves
            </div>
            <div  className="flex gap-2">
            <div className=" rounded-2xl bg-blue-400 size-5 p-1 text-white flex rotate-180 justify-center items-center"><VideoIcon/></div>
            <div className=" rounded-2xl bg-blue-400 size-5 p-1 text-white flex  justify-center items-center"><Mic/></div>
            </div>
         
            </div>
        <div className="w-full h-64 overflow-hidden">
  <video className="w-full h-full object-cover bg-black">...</video>
</div>
    </div>
}
export function Black() {
    return <div className=" justify-between  flex-col p-1 flex h-fit">
    
            <div className="flex items-center gap-2 bg-zinc-800 rounded px-3 py-1 absolute  bottom-0 right-1 w-full justify-between">
               <div className="">
                moves
            </div>
            <div  className="flex gap-2">
            <div className=" rounded-2xl bg-blue-400 size-5 p-1 text-white flex rotate-180 justify-center items-center"><VideoIcon/></div>
            <div className=" rounded-2xl bg-blue-400 size-5 p-1 text-white flex  justify-center items-center"><Mic/></div>
            </div>
         
            </div>
        <div className="w-full h-64 overflow-hidden ">
  <video className="w-full h-full object-cover bg-black">...</video>
</div>
    </div>
}