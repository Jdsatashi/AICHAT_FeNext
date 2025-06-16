import { saveToken, saveUsername } from "../saveToCookies";
import { redirect } from "next/navigation";
import { routes } from "@/constants/route";
import { fetchSignin } from "../api/signin";
import { StateSignin } from "@/types/clientState";

export async function signin(
  state: StateSignin | undefined,
  formData: FormData
) {
  const username = formData.get("username");
  const password = formData.get("password");
  if (!username || !password) {
    return {
      ...state,
      username: username as string,
      errors: {
        ...state?.errors,
        username: !username ? "Username is required" : undefined,
        password: !password ? "Password is required" : undefined,
      },
    };
  }
  const { data, error } = await fetchSignin(
    username as string,
    password as string
  );

  if (error) {
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

  await saveToken(data.refresh_token, data.access_token);
  await saveUsername(data.user.username);
  return redirect(routes.dashboard);
}
