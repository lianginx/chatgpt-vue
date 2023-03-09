export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}
