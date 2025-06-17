import { routes } from "@/constants/route";
import { redirect } from "next/navigation";
import { removeToken, removeUsername } from "../saveToCookies";

export const signOut = async () => {
  await removeToken();
  await removeUsername();

  return redirect(routes.home);
};
