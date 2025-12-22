import { useEffect, useRef } from "react";

export function useSocket(onMessage: (msg: any) => void) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socketRef.current = socket;

    socket.onmessage = (event) => {
      onMessage(JSON.parse(event.data));
    };

    return () => socket.close();
  }, []);

  function send(data: any) {
    socketRef.current?.send(JSON.stringify(data));
  }

  return { send };
}
