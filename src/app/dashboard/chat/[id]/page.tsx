"use server";

import { getTopics } from "@/actions/api/chatMessages";
import ChatBox from "@/components/ChatBox";

const page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { data, error } = await getTopics(id);
  if (error) {
    throw error;
  }
  return (
    <>
      <ChatBox messages={data.data} topicId={id} />
    </>
  );
};

export default page;
