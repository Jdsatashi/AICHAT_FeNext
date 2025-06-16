export interface StateSignin {
  username?: string;
  errors?: {
    username?: string;
    password?: string;
    error?: string;
  };
}

// Define the Message type
export interface Message {
  id: string | number;
  content: string;
  role: "user" | "assistant";
}
