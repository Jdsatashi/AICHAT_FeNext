import { apiRoutes } from "@/constants/routeApi";
import { ApiQueryParams, FormCreateUser } from "@/types/api";
import StringQueryParam from "@/utils/StringQueryParam";
import { UserCreateValidate } from "@/validation/email";

export async function getAllUsers(queries: ApiQueryParams) {
  console.log(queries);
  try {
    const queryString = StringQueryParam(queries);
    const result = await fetch(apiRoutes.users + queryString, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await result.json();
    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: error,
    };
  }
}

export async function createUser(user: FormCreateUser) {
  const validation = UserCreateValidate.safeParse(user);
  if (!validation.success) {
    return {
      data: null,
      error: validation.error.flatten().fieldErrors,
    };
  }
  try {
    const result = await fetch(apiRoutes.users, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await result.json();
    return { data: data, error: null };
  } catch (error) {
    console.log(error);
    return {
      data: null,
      error: error,
    };
  }
}
