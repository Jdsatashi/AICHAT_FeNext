import { ApiQueryParams } from "@/types/api";

export default function StringQueryParam(queryParams: ApiQueryParams) {
  const queries = { ...queryParams };
  let stringParams = "?";
  for (const key in queries) {
    if (queries[key as keyof ApiQueryParams]) {
      stringParams += `${key}=${queries[key as keyof ApiQueryParams]}&`;
    }
  }
  return stringParams;
}
