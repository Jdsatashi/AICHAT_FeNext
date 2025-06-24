import { apiRoutes } from "@/constants/routeApi";
import { refreshAccessToken } from "./handleToken";
import { ApiQueryParams, FormCreateTopic } from "@/types/api";
import StringQueryParam from "@/utils/StringQueryParam";

export const getChatTopics = async (queries: ApiQueryParams) => {
  const queryString = StringQueryParam(queries);
  try {
    const access = await refreshAccessToken();
    const res = await fetch(apiRoutes.chatTopic + `${queryString}`, {
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
