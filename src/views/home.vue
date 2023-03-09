<script setup lang="ts">
import type { ChatMessage } from "@/types";
import { ref, watch, nextTick, onMounted } from "vue";
import { chat } from "@/libs/gpt";
import Loding from "@/components/Loding.vue";

let isConfig = ref(true);
let isTalking = ref(false);
let messageContent = ref("");
const chatListDom = ref<HTMLDivElement>();
const decoder = new TextDecoder("utf-8");
const roleAlias = { user: "ME", assistant: "ChatGPT", system: "System" };
const messageList = ref<ChatMessage[]>([
  {
    role: "system",
    content: "你是 ChatGPT，OpenAI 训练的大型语言模型，尽可能简洁地回答。",
  },
  {
    role: "assistant",
    content: `你好，我是AI语言模型，我可以提供一些常用服务和信息，例如：

1. 翻译：我可以把中文翻译成英文，英文翻译成中文，还有其他一些语言翻译，比如法语、日语、西班牙语等。

2. 咨询服务：如果你有任何问题需要咨询，例如健康、法律、投资等方面，我可以尽可能为你提供帮助。

3. 闲聊：如果你感到寂寞或无聊，我们可以聊一些有趣的话题，以减轻你的压力。

请告诉我你需要哪方面的帮助，我会根据你的需求给你提供相应的信息和建议。`,
  },
]);

onMounted(() => {
  if (loadConfig()) {
    switchConfigStatus();
  }
});

const sendChatMessage = async (content: string = messageContent.value) => {
  isTalking.value = true;

  if (messageList.value.length === 2) {
    messageList.value.pop();
  }

  messageList.value.push({ role: "user", content });
  clearMessageContent();

  messageList.value.push({ role: "assistant", content: "" });
  const { status, data, message } = await chat(messageList.value, loadConfig());

  if (status === "success" && data) {
    const reader = data.getReader();
    await readStream(reader);
  } else {
    appendLastMessageContent(message);
  }

  isTalking.value = false;
};

const readStream = async (reader: ReadableStreamDefaultReader<Uint8Array>) => {
  const { done, value } = await reader.read();
  if (done) {
    reader.closed;
    return;
  }
  const dataList = decoder.decode(value).match(/(?<=data: )\s*({.*?}]})/g);
  dataList?.forEach((v: any) => {
    const json = JSON.parse(v);
    appendLastMessageContent(json.choices[0].delta.content ?? "");
  });
  await readStream(reader);
};

const appendLastMessageContent = (content: string) =>
  (messageList.value[messageList.value.length - 1].content += content);

const sendOrSave = () => {
  if (!messageContent.value.length) return;
  if (isConfig.value) {
    if (saveConfig(messageContent.value.trim())) {
      switchConfigStatus();
    }
    clearMessageContent();
  } else {
    sendChatMessage();
  }
};

const clickConfig = () => {
  if (!isConfig.value) {
    messageContent.value = loadConfig();
  } else {
    clearMessageContent();
  }
  switchConfigStatus();
};

const saveConfig = (apiKey: string) => {
  if (apiKey.slice(0, 3) !== "sk-" || apiKey.length !== 51) {
    alert("API Key 错误，请检查后重新输入！");
    return false;
  }
  localStorage.setItem("apiKey", apiKey);
  return true;
};

const loadConfig = () => localStorage.getItem("apiKey") ?? "";

const switchConfigStatus = () => (isConfig.value = !isConfig.value);

const clearMessageContent = () => (messageContent.value = "");

const scrollToBottom = () => {
  if (!chatListDom.value) return;
  scrollTo(0, chatListDom.value.scrollHeight);
};

watch(messageList.value, () => nextTick(() => scrollToBottom()));
</script>

<template>
  <div class="flex flex-col h-screen">
    <div
      class="flex flex-nowrap fixed w-full items-baseline top-0 px-6 py-4 bg-gray-100"
    >
      <div class="text-2xl font-bold">ChatGPT</div>
      <div class="ml-4 text-sm text-gray-500">
        基于 OpenAI 的 ChatGPT 自然语言模型人工智能对话
      </div>
      <div class="ml-auto text-sm cursor-pointer" @click="clickConfig()">
        设置
      </div>
    </div>

    <div class="flex-1 mt-16">
      <div class="m-6" ref="chatListDom">
        <div
          class="mb-6"
          v-for="item of messageList.filter((v) => v.role !== 'system')"
        >
          <div class="font-bold mb-3">{{ roleAlias[item.role] }}：</div>
          <pre
            class="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed"
            v-if="item.content"
            >{{ item.content.replace(/^\n\n/, "") }}</pre
          >
          <Loding v-else />
        </div>
      </div>
    </div>

    <div class="sticky bottom-0 w-full p-6 pb-8 bg-gray-100">
      <div class="-mt-2 mb-2 text-sm text-gray-500" v-if="isConfig">
        请输入 API Key：
      </div>
      <div class="flex">
        <input
          class="input"
          :type="isConfig ? 'password' : 'text'"
          :placeholder="isConfig ? 'sk-xxxxxxxxxx' : '请输入'"
          v-model="messageContent"
          @keydown.enter="isTalking || sendOrSave()"
        />
        <button class="btn" :disabled="isTalking" @click="sendOrSave()">
          {{ isConfig ? "保存" : "发送" }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
pre {
  font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica,
    "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
    "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN",
    "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti",
    SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
}
</style>
