"use client";

import React, { useEffect, useRef, useState } from "react";
import { Message } from "@/types/clientState";
import ReactMarkdown from "react-markdown";
import { refreshAccessToken } from "@/actions/api/handleToken";
import { getTopicMessages } from "@/actions/api/chatMessages";

const ChatBoxWS: React.FC<{
  topicId: string | number;
}> = ({ topicId }) => {
  const [inputText, setInputText] = useState<string>("");
  const [msgList, setMessages] = useState<Message[]>([]);
  const [token, setToken] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [responseMsg, setResponseMsg] = useState<string | null>(null);
  const responseRef = useRef<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const updateMsg = (content: string, role: "assistant" | "user") => {
    const newMsg: Message = {
      id: crypto.randomUUID(),
      content,
      role,
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  useEffect(() => {
    const interval = setInterval(async () => {
      const newToken = await refreshAccessToken();
      setToken(newToken);
    }, 4.5 * 60 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      if (typeof topicId === "string") {
        const { data, error } = await getTopicMessages(topicId);
        if (error) {
          alert(error);
        }
        console.log("test herer");
        console.log(data.data);
        setMessages(data.data);
      } else {
        alert("Topic id is not valid");
      }
      const newToken = await refreshAccessToken();
      setToken(newToken);
    };
    getMessages();
  }, [topicId]);

  useEffect(() => {
    if (responseRef.current !== "") {
      responseRef.current = "";
    }
  }, [msgList]);

  useEffect(() => {
    let ws: WebSocket | null = null;

    ws = new WebSocket(
      `ws://localhost:8000/comepass/api/v1/chat-gpt/ws/topic-${topicId}?token=${token}`
    );
    wsRef.current = ws;

    ws.onmessage = (event) => {
      if (event.data && event.data !== "None") {
        responseRef.current += event.data;
        setResponseMsg(responseRef.current);
      } else if (event.data === "None") {
        console.log("Presave message:", responseRef.current);
        updateMsg(responseRef.current, "assistant");
        setResponseMsg("");
      }
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };
    setIsSubmit(false);
    return () => {
      if (ws) ws.close();
    };
  }, [topicId, isSubmit, token]);

  const sendMessage = () => {
    console.log("Send messages!");
    if (
      wsRef.current &&
      wsRef.current.readyState === WebSocket.OPEN &&
      inputText.trim() !== ""
    ) {
      updateMsg(inputText, "user");
      wsRef.current.send(JSON.stringify({ content: inputText }));
      setInputText("");
    }
  };

  return (
    // Main wrapper for the entire chat UI
    <div className="container mx-auto px-4 pt-8 pb-24 h-screen max-h-screen">
      {/* Chat card container */}
      <div className="flex flex-col h-full glass shadow-lg rounded-lg overflow-hidden mx-auto my-0 w-full">
        {/* Chat title header */}
        <div className="flex justify-between p-4 btn-gradient btn-accent border-none  shadow-md">
          <div className=""></div>
          <div className="items-center justify-center text-slate-100 text-xl font-semibold">
            Chat with {"GPT"} 2
          </div>
          <div className=""></div>
        </div>

        {/* Message container */}
        {/* flex-1: fills available vertical space */}
        {/* overflow-y-auto: allows vertical scrolling */}
        {/* flex-col-reverse: reverses order so new messages appear at bottom */}
        <div
          id="messages-container"
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto flex flex-col-reverse p-4 gap-3 scrollbar-custom"
        >
          {/* Render messages from state.
              Since using flex-col-reverse, the newest message (first in array)
              appears at the bottom of the view. */}
          {responseMsg ? (
            <div
              className={`p-3 rounded-lg max-w-[80%] shadow-sm bg-linear-to-bl from-slate-100 to-slate-300 text-gray-700 self-start`}
            >
              {responseMsg}
            </div>
          ) : (
            ""
          )}
          {msgList.map((msg) => (
            <div
              key={msg.id} // Key required for React list rendering
              className={`p-3 rounded-lg w-auto prose break-words shadow-sm ${
                msg.role === "user"
                  ? "btn-gradient btn-accent border-none text-amber-50 self-end" // User message: aligned right
                  : "bg-linear-to-bl from-slate-100 to-slate-300 text-gray-700 self-start" // assistant message: aligned left
              }`}
            >
              {<ReactMarkdown>{msg.content}</ReactMarkdown>}
            </div>
          ))}
        </div>
        <div className="p-4 bg-white border-t flex items-end shadow-md">
          <textarea
            className="flex-1 p-3 border rounded-md focus:outline-none resize-none max-h-40"
            placeholder="Write your message..."
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>

          <button
            className="btn btn-gradient btn-accent ms-2"
            onClick={sendMessage}
            disabled={!inputText.trim()}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxWS;
