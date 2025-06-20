import { apiRoutes } from "@/constants/routeApi";
import { refreshAccessToken } from "./handleToken";
import { decodeJwt } from "jose";

export async function checkRole(roleName: "manager" | "staff" | "draft") {
  const accessToken = await refreshAccessToken();
  try {
    const res = await fetch(apiRoutes.checkRole, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        role: roleName,
      }),
    });
    const data = await res.json();
    const protectedHeader = decodeJwt(data.detail);
    return protectedHeader.role_valid;
  } catch (error) {
    return error;
  }
}
