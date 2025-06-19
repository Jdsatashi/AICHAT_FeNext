export const modelList = [
  "gpt-4o",
  "gpt-4o-nano",
  "gpt-4o-mini",
  "gpt-4.1-nano",
  "gpt-4.1-mini",
  "gpt-4.1-turbo",
  "gpt-4.1",
];

export const topicFields = [
  {
    name: "name",
    label: "Topic name",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    type: "text",
  },
  {
    name: "model",
    label: "GPT model",
    type: "select",
    options: modelList,
  },
  {
    name: "system_prompt",
    label: "System prompt",
    type: "text",
  },
  {
    name: "temperature",
    label: "Temperature (1 - 100)",
    type: "float",
  },
  {
    name: "max_token",
    label: "Max token",
    type: "number",
  },
  {
    name: "max_msg_retrieve",
    label: "Max message retrieve",
    type: "number",
  },
  {
    name: "notes",
    label: "Notes",
    type: "text",
  },
  {
    name: "origin_user",
    label: "Create for user",
    type: "combobox",
  },
];

export const topicInit = {
  name: "",
  description: "",
  model: "gpt-4o",
  system_prompt: "",
  temperature: 60,
  max_token: 512,
  max_msg_retrieve: 10,
  notes: "",
  origin_user: "",
};
