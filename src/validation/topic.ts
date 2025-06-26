import z from "zod";

export const TopicSchema = z.object({
  name: z.string().min(1, { message: "Topic name is required" }),
  description: z.string(),
  model: z.string().min(1, { message: "Topic model is required" }),
  system_prompt: z
    .string()
    .min(1, { message: "Topic system prompt is required" }),
  temperature: z.coerce
    .number()
    .min(10, { message: "Topic temperature must be greater than 10" })
    .max(100, { message: "Topic temperature must not be greater 100" }),
  max_token: z.coerce
    .number()
    .min(128, { message: "Topic max token must be greater than 128" })
    .max(10000, { message: "Topic max token must not be greater 10000" }),
  max_msg_retrieve: z.coerce
    .number()
    .min(4, { message: "Topic max message retrieve must be greater than 4" })
    .max(50, { message: "Topic max message retrieve must not be greater 50" }),
  notes: z.string(),
  origin_user: z.string().or(z.number()),
});
