"use server";

import { apiRoutes } from "@/constants/routeApi";
import { getToken } from "../saveToCookies";
import { redirect } from "next/navigation";

export const refreshAccessToken = async () => {
  const refreshToken = await getToken("refresh");
  if (!refreshToken) {
    return redirect("/signin");
  }
  try {
    const res = await fetch(apiRoutes.refreshToken, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh_token: refreshToken,
      }),
    });
    const data = await res.json();
    return data.access_token;
  } catch (error: unknown) {
    let errorDetail = "Unknown error";
    if (typeof error === "object" && error !== null && "detail" in error) {
      errorDetail = (error as { detail: string }).detail;
    }
    return errorDetail;
  }
};
