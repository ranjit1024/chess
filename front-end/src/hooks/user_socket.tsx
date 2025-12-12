import { use, useEffect, useReducer, useRef } from "react";

export function UseSocket(){
    const socketRef = useRef<WebSocket|null>(null);
    useEffect(()=> {
        const ws = new WebSocket('ws://localhost:8080');
        ws.onopen = () =>{
            socketRef.current = ws;
        }
        ws.onclose = () =>{
            socketRef.current = null;
        }
        return ()=>{
            ws.close()
        }

    },[])
    return socketRef.current
}



