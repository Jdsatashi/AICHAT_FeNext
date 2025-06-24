"use client";

import React, { useState, useRef, useEffect, useActionState } from "react";
import ReactMarkdown from "react-markdown";
import { sendChatMessageState } from "@/actions/client/sendMessageState";
import { Message } from "@/types/clientState";

const ChatBox: React.FC<{
  messages: Message[];
  topicId: string | number;
}> = ({ messages, topicId }) => {
  // State to store the input box content
  const [inputText, setInputText] = useState<string>("");
  const [submitText, setSubmitText] = useState<string>("");

  // State to store the list of messages
  const [msgList, setMessages] = useState<Message[]>(messages);

  const [state, action, isPending] = useActionState(sendChatMessageState, {
    data: {
      topicId: topicId,
      messages: msgList,
      message: null,
    },
    error: {},
  });

  // Ref to access the textarea DOM element
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  // Ref to access the messages container, used for scrolling if needed
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Adjust the height of the textarea based on its content
  const adjustTextareaHeight = () => {
    const textarea = chatInputRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // Reset to auto height
      textarea.style.height = textarea.scrollHeight + "px"; // Set to scrollHeight
      if (textarea.scrollHeight > 160) {
        // Limit max height to ~5 lines
        textarea.style.overflowY = "auto"; // Show scrollbar
      } else {
        textarea.style.overflowY = "hidden"; // Hide scrollbar
      }
    }
  };

  useEffect(() => {
    setMessages(messages);
  }, [messages]);

  // Auto-adjust textarea height whenever inputText changes
  useEffect(() => {
    adjustTextareaHeight();
    if (inputText !== "") {
      setSubmitText(inputText);
    }
  }, [inputText]);

  useEffect(() => {
    console.table(state);
    if (state && state.data && state.data.message && !state.error) {
      updateMsg(state.data.message, "assistant");
      setInputText("");
    }
  }, [state]);

  const updateMsg = (content: string, role: "assistant" | "user") => {
    const newMessage: Message = {
      id: crypto.randomUUID(), // Generate a unique ID
      content: content,
      role: role,
    };
    setMessages([newMessage, ...msgList]);
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
          {msgList.map((msg) => (
            <div
              key={msg.id} // Key required for React list rendering
              className={`p-3 rounded-lg max-w-[80%] shadow-sm ${
                msg.role === "user"
                  ? "btn-gradient btn-accent border-none text-amber-50 self-end" // User message: aligned right
                  : "bg-linear-to-bl from-slate-100 to-slate-300 text-gray-700 self-start" // assistant message: aligned left
              }`}
            >
              {<ReactMarkdown>{msg.content}</ReactMarkdown>}
            </div>
          ))}
        </div>

        {/* Message input area */}
        <form
          action={action}
          className="p-4 bg-white border-t border-gray-200 flex items-end shadow-md"
        >
          <input
            name="content"
            value={submitText}
            readOnly={true}
            className="hidden"
          />
          {/* Textarea for multiline input */}
          <span className="icon-[tabler--message] mx-2 size-8 shrink-0 items-center justify-center my-auto"></span>
          <textarea
            id="chat-input"
            ref={chatInputRef}
            className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 resize-none max-h-40"
            placeholder="Write your message..."
            rows={1}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isPending}
          ></textarea>

          {/* Send button */}
          <button
            type="submit"
            className="btn btn-gradient btn-accent my-auto ms-2"
            id="send-button"
            disabled={isPending}
            onClick={() => {
              updateMsg(inputText, "user");
              setInputText("");
            }}
          >
            {isPending ? (
              <span className="loading loading-spinner loading-xl"></span>
            ) : (
              "Send"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBox;
