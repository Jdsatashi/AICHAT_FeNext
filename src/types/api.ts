export interface ApiQueryParams {
  query?: string;
  page?: number;
  limit?: number;
  order_by?: string;
  filter?: string;
  strict?: boolean;
}

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
