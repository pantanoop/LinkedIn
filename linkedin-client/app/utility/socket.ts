import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) {
    socket = io("http://localhost:3003", {
      autoConnect: false,
      withCredentials: true,
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("🔴 Socket disconnected:", reason);
    });

    socket.on("connect_error", (err) => {
      console.log("⚠️ Socket error:", err.message);
    });

    socket.io.on("reconnect_attempt", () => {
      console.log("🔄 Reconnecting...");
    });

    socket.io.on("reconnect", () => {
      console.log("✅ Reconnected");
    });

    socket.io.on("reconnect_failed", () => {
      console.log("❌ Reconnect failed");
    });
  }

  return socket;
};
