"use client";

import { getTopicMessages } from "@/actions/api/chatMessages";
import ChatBox from "@/components/ChatBox";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Detail() {
  const params = useParams();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const getMessages = async () => {
      if (typeof params.id === "string") {
        const { data, error } = await getTopicMessages(params.id);
        if (error) {
          alert(error);
        }
        setMessages(data);
      } else {
        alert("Topic id is not valid");
      }
    };
    getMessages();
  }, [params.id]);

  return (
    <>
      <ChatBox messages={messages} topicId={params.id as string} />
    </>
  );
}
