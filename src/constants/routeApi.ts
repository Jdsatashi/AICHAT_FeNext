import { backendUrl } from "@/constants/env";

export const apiUri = backendUrl + "/comepass/api/v1";

export const apiRoutes = {
  login: apiUri + "/auth/login",
  refreshToken: apiUri + "/auth/refresh-token",
  checkAccessToken: apiUri + "/auth/check-access",
  chatTopic: apiUri + "/chat-gpt/topic",
};
