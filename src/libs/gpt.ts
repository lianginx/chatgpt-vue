import type { ChatMessage } from "@/types";
import axios, { AxiosError } from "axios";

const model = "gpt-3.5-turbo";
const apiKey = import.meta.env.VITE_API_KEY;

axios.defaults.headers.common["Authorization"] = `Bearer ${apiKey}`;
axios.defaults.headers.post["Content-Type"] = "application/json";

export async function chat(messageList: ChatMessage[]) {
  try {
    const completion = await axios({
      url: "https://api.openai.com/v1/chat/completions",
      method: "post",
      data: {
        model,
        messages: messageList,
      },
    });
    return {
      status: "success",
      data: completion.data.choices[0].message,
    };
  } catch (error: any) {
    return { status: "error", message: error.response.data.error.message };
  }
}
