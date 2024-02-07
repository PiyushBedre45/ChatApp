import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
const Try = () => {
  const [msg, setMsg] = useState("");
  const [socketId, setSocketId] = useState("");
  const [room, setRoom] = useState("");

  const socket = useMemo(() => io("http://localhost:3000"), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form submit");
    socket.emit("message", { msg, room });
    setMsg("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
      console.log(socket.id);
      setSocketId(socket.id);
    });
    socket.on("receive-message", (data) => {
      console.log(data);
    });
    socket.on("welcome", (s) => {
      console.log(s);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <h1>hi from try</h1>
      <h1>{socketId}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <input
          type="text"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
};

export default Try;
