"use server";

import { backendUrl } from "@/constants/env";
import { saveToken, saveUserId } from "./saveToCookies";
import { redirect } from "next/navigation";
import { routes } from "@/constants/route";

interface State {
  username?: string;
  password?: string;
  errors?: {
    username?: string;
    password?: string;
    error?: string;
  };
}

export async function signin(state: State | undefined, formData: FormData) {
  const username = formData.get("username");
  const password = formData.get("password");
  if (!username || !password) {
    return {
      ...state,
      errors: {
        ...state?.errors,
        username: !username ? "Username is required" : undefined,
        password: !password ? "Password is required" : undefined,
      },
    };
  }
  // Call api...
  try {
    const res = await fetch(`${backendUrl}/comepass/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const data = await res.json();
    await saveToken(data.refresh_token, data.access_token);
    await saveUserId(data.user.id);
    console.log(data);
  } catch (error: unknown) {
    console.log(error);

    let errorDetail = "Unknown error";
    if (typeof error === "object" && error !== null && "detail" in error) {
      errorDetail = (error as { detail: string }).detail;
    }

    return {
      ...state,
      errors: {
        ...state?.errors,
        error: errorDetail,
      },
    };
  }
  return redirect(routes.dashboard);
}
