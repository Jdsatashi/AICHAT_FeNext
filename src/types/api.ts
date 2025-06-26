export interface ApiQueryParams {
  query?: string;
  page?: number;
  limit?: number;
  order_by?: string;
  filter?: string;
  strict?: boolean;
}

export const ApiQueryParamKeys = [
  "query",
  "page",
  "limit",
  "order_by",
  "filter",
  "strict",
];

export const initApiQueryParams: ApiQueryParams = {
  query: "",
  page: 1,
  limit: 10,
  order_by: "created_at",
  filter: "",
  strict: false,
};

export interface ChatTopic {
  id: number;
  name: string;
  description: string;
  note: string;
  origin_user: number;
}

export interface FormCreateTopic {
  name: string;
  description: string;
  model: string;
  system_prompt: string;
  temperature: number;
  max_token: number;
  max_msg_retrieve: number;
  notes: string;
  origin_user: string | number;
}

export interface User {
  id: number | string;
  username: string;
  email: string;
  is_active: boolean;
}

export interface FormCreateUser {
  username: string;
  email: string;
  password: string;
}
