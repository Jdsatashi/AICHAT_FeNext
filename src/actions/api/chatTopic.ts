import { apiRoutes } from "@/constants/routeApi";
import { refreshAccessToken } from "./handleToken";
import { FormCreateTopic } from "@/types/api";

export const getChatTopics = async () => {
  try {
    const access = await refreshAccessToken();
    const res = await fetch(apiRoutes.chatTopic, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const createTopic = async (inputData: FormCreateTopic) => {
  try {
    const access = await refreshAccessToken();
    const res = await fetch(apiRoutes.chatTopic, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
      body: JSON.stringify(inputData),
    });
    const data = await res.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
