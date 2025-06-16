import { backendUrl } from "@/constants/env";

export const fetchSignin = async (username: string, password: string) => {
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
    return { data: await res.json(), error: null };
  } catch (error) {
    return { data: null, error };
  }
};
