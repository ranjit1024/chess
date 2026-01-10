import { WebSocketServer, WebSocket } from "ws";

function Video({socket}:{socket:WebSocket}){


type Client = {
  socket: WebSocket;
  roomId: string;
};

const rooms = new Map<string, Client[]>();


  let currentRoom = "";

  socket.on("message", (data) => {
    const message = JSON.parse(data.toString());

    switch (message.type) {
      case "join": {
        currentRoom = message.roomId;

        if (!rooms.has(currentRoom)) {
          rooms.set(currentRoom, []);
        }

        rooms.get(currentRoom)!.push({ socket, roomId: currentRoom });

        console.log("Joined room:", currentRoom);
        break;
      }

      case "offer":
      case "answer":
      case "ice-candidate": {
        const clients = rooms.get(currentRoom) || [];
        clients.forEach((client) => {
          if (client.socket !== socket) {
            client.socket.send(JSON.stringify(message));
          }
        });
        break;
      }
    }
  });

  socket.on("close", () => {
    const clients = rooms.get(currentRoom) || [];
    rooms.set(
      currentRoom,
      clients.filter((c) => c.socket !== socket)
    );
  });


}