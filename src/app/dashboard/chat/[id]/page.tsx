"use client";

// import { getTopicMessages } from "@/actions/api/chatMessages";
// import ChatBox from "@/components/ChatBox";
import ChatBoxWS from "@/components/ChatBoxWS";
import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

export default function Detail() {
  const params = useParams();
  // const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   const getMessages = async () => {
  //     if (typeof params.id === "string") {
  //       const { data, error } = await getTopicMessages(params.id);
  //       if (error) {
  //         alert(error);
  //       }
  //       console.log("test herer");
  //       console.log(data.data);
  //       setMessages(data.data);
  //     } else {
  //       alert("Topic id is not valid");
  //     }
  //   };
  //   getMessages();
  // }, [params.id]);

  return (
    <>
      <ChatBoxWS topicId={params.id as string} />
    </>
  );
}
