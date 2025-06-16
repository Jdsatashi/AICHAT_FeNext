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
