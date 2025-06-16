import { sendChatMessage } from "../api/chatMessages";
import { Message } from "@/types/clientState";

export async function sendChatMessageState(
  state: {
    error?: object;
    data: {
      topicId: string | number;
      messages: Message[];
      message: string | null;
    };
  },
  formData: FormData
) {
  const { topicId, messages } = state.data;

  const content = formData.get("content");

  if (!content) {
    return {
      error: { message: "Content is required" },
      data: { ...state.data },
    };
  }

  const { data, error } = await sendChatMessage(
    parseInt(`${topicId}`),
    content as string
  );

  if (error) {
    return { error, data: { ...state.data } };
  }
  return {
    data: {
      topicId,
      messages,
      message: data.assistant,
    },
  };
}
