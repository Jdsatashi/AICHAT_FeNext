import { apiRoutes } from "@/constants/routeApi";

export const getChatTopics = async (accessToken: string) => {
  try {
    const res = await fetch(apiRoutes.chatTopic, {
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
