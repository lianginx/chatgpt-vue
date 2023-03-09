import type { ChatMessage } from "@/types";
import axios, { AxiosError } from "axios";

const model = "gpt-3.5-turbo";

axios.defaults.headers.post["Content-Type"] = "application/json";

export async function chat(messageList: ChatMessage[], apiKey: string) {
  try {
    const result = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        stream: true,
        messages: messageList,
      }),
    });

    return {
      status: "success",
      data: result.body,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: "error",
      message: error,
    };
  }
}
