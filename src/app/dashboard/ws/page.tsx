"use client";

import React, { useEffect, useRef, useState } from "react";

const Websocket = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [responseMsg, setResponseMsg] = useState<string | null>(null);
  const responseRef = useRef<string>("");
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Kết nối WebSocket
    const socket = new WebSocket(
      "ws://localhost:8000/comepass/api/v1/chat-gpt/ws/topic-2"
    );

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onmessage = (event) => {
      console.log("Received:", event.data);

      if (event.data && event.data !== "None") {
        responseRef.current += event.data;
        setResponseMsg(responseRef.current);
      } else if (event.data === "None") {
        console.log("Presave message:", responseRef.current);
        setMessages((prev) => [...prev, responseRef.current]);
        setResponseMsg("");
      }
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socketRef.current = socket;

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    responseRef.current = "";
  }, [messages]);

  const handleSend = () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ content: input }));
      setInput("");
    } else {
      console.error("WebSocket is not open");
    }
  };

  return (
    <div>
      <h1 className="my-8 text-4xl text-center font-bold">Socket sample</h1>
      <div className="flex items-center justify-center gap-4 bg-green-200 rounded-lg p-4">
        <input
          type="text"
          value={input}
          className="input w-[300px]"
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button className="btn btn-gradient btn-accent" onClick={handleSend}>
          Send
        </button>
      </div>

      <h2>Messages:</h2>
      <ul className="glass">
        {messages.map((msg, idx) => (
          <li className="text-green-700" key={idx}>
            {msg}
          </li>
        ))}
        {responseMsg ? <li>{responseMsg}</li> : ""}
      </ul>
    </div>
  );
};

export default Websocket;
