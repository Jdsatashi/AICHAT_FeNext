import { apiRoutes } from "@/constants/routeApi";
import { refreshAccessToken } from "./handleToken";

function buildQuery(url: string, params: Record<string, string>) {
  const query = new URLSearchParams(params).toString();
  return `${url}?${query}`;
}

export const getTopics = async (topicId: string) => {
  const accessToken = await refreshAccessToken();
  try {
    const queryParams = { limit: "10", order_by: "-id" };
    const apiUrl = buildQuery(
      `${apiRoutes.chatTopic}/${topicId}/messages/${0}`,
      queryParams
    );
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const sendChatMessage = async (
  topicId: string | number,
  message: string
) => {
  const accessToken = await refreshAccessToken();
  try {
    const apiUrl = `${apiRoutes.chatTopic}/${topicId}/messages`;
    console.log(apiUrl);

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        content: message,
      }),
    });
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
