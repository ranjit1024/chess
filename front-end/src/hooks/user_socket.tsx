import { useEffect, useRef, useState } from "react";

export function UseSocket(){
    const [socket,setScoket] = useState<WebSocket|null>(null);
    useEffect(()=> {
        const ws = new WebSocket('ws://localhost:8080');
        ws.onopen = () =>{
            setScoket(ws)
        }
        ws.onclose = () =>{
            setScoket(null)
        }
        return ()=>{
            ws.close()
        }

    },[])
    return socket;
}



