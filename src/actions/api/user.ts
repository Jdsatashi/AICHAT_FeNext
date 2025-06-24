import { apiRoutes } from "@/constants/routeApi";
import { ApiQueryParams } from "@/types/api";

export async function getAllUsers(queries: ApiQueryParams) {
  console.log(queries);
  try {
    const result = await fetch(apiRoutes.users, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    return data;
  } catch (error) {
    console.log(error);
    return {
      error: error,
    };
  }
}
