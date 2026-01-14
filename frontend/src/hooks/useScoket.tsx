import { useEffect, useRef } from "react";
// https://chess.ranjitdasproject.space/
export function useSocket(onMessage: (msg: any) => void) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const id = localStorage.getItem("id");
    if(!id){
      const id = crypto.randomUUID()
      localStorage.setItem("id", id)
      return
    }

    const socket = new WebSocket(`http://localhost:8080/?id=${id}`);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };

    return () => socket.close();
  }, []);

  function send(data: any) {
    socketRef.current?.send(JSON.stringify(data));
  }

  return { send, socketRef };
}
