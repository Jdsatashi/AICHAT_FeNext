"use server";

import { jwtAccessExpire, jwtRefreshExpire } from "@/constants/env";
import { cookies } from "next/headers";

// Save cookies token
export async function saveToken(refreshToken: string, accessToken: string) {
  const cookieStore = await cookies();

  // Access Token – frontend
  cookieStore.set("session", accessToken, {
    path: "/",
    maxAge: 60 * jwtAccessExpire,
    sameSite: "lax",
  });

  // Refresh Token – HTTP-only, Secure
  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * jwtRefreshExpire,
    sameSite: "strict",
  });
}

// Get cookies token
export async function getToken(tokenType: "access" | "refresh" = "access") {
  const tType = tokenType === "access" ? "session" : "refresh_token";
  const cookieStore = await cookies();
  const token = cookieStore.get(tType);
  return token?.value;
}

// Remove cookies token for logout
export async function removeToken() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  cookieStore.delete("refresh_token");
}

// Save user id to token
export async function saveUsername(username: string) {
  const cookieStore = await cookies();
  cookieStore.set("username", username, {
    path: "/",
    maxAge: 60 * jwtAccessExpire,
    sameSite: "lax",
  });
}

// Get user id from token
export async function getUsername() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("username");
  return userId?.value || null;
}

// Remove user id from token
export async function removeUsername() {
  const cookieStore = await cookies();
  cookieStore.delete("username");
}
