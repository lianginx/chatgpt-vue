<script setup lang="ts">
import type { ChatMessage } from "@/types";
import { ref, watch, nextTick, onMounted } from "vue";
import cryptoJS from "crypto-js";

import Message from "@/components/Message.vue";
import Reload from "@/components/Reload.vue";

let apiKey = "";
let isConfig = ref(true);
let isTalking = ref(false);
let messageContent = ref("");
const chatListDom = ref<HTMLDivElement>();
const messageList = ref<ChatMessage[]>([
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
  if (getAPIKey()) {
    switchConfigStatus();
  }
});

const sendChatMessage = (content: string = messageContent.value) => {
  isTalking.value = true;
  if (messageList.value.length === 1) {
    messageList.value.pop();
  }
  messageList.value.push({ role: "user", content });
  clearMessageContent();
  messageList.value.push({ role: "assistant", content: "" });

  fetch("http://localhost:8000/gpt-3.5", {
    method: "post",
    body: JSON.stringify({
      apiKey,
      messages: messageList.value,
    }),
  })
    .then(async (res) => {
      const complete = await res.json();
      appendLastMessageContent(
        complete.status === "success" ? complete.data.content : complete.message
      );
    })
    .catch((e) => {
      appendLastMessageContent(e.message);
    })
    .finally(() => {
      isTalking.value = false;
    });
};

const appendLastMessageContent = (content: string) =>
  (messageList.value[messageList.value.length - 1].content += content);

const sendOrSave = () => {
  if (!messageContent.value.length) return;
  if (isConfig.value) {
    if (saveAPIKey(messageContent.value.trim())) {
      switchConfigStatus();
    }
    clearMessageContent();
  } else {
    sendChatMessage();
  }
};

const clickConfig = () => {
  if (!isConfig.value) {
    messageContent.value = getAPIKey();
  } else {
    clearMessageContent();
  }
  switchConfigStatus();
};

const getSecretKey = () => "lianginx";

const saveAPIKey = (apiKey: string) => {
  if (apiKey.slice(0, 3) !== "sk-" || apiKey.length !== 51) {
    alert("API Key 错误，请检查后重新输入！");
    return false;
  }
  const aesAPIKey = cryptoJS.AES.encrypt(apiKey, getSecretKey()).toString();
  localStorage.setItem("apiKey", aesAPIKey);
  return true;
};

const getAPIKey = () => {
  if (apiKey) return apiKey;
  const aesAPIKey = localStorage.getItem("apiKey") ?? "";
  apiKey = cryptoJS.AES.decrypt(aesAPIKey, getSecretKey()).toString(
    cryptoJS.enc.Utf8
  );
  return apiKey;
};

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
      <div class="ml-4 text-sm text-gray-500 hidden sm:block">
        基于 OpenAI 的 ChatGPT 自然语言模型人工智能对话
      </div>
      <div
        class="ml-auto px-3 py-2 text-sm cursor-pointer hover:bg-white rounded-md"
        @click="clickConfig()"
      >
        设置
      </div>
    </div>

    <div class="flex-1 mx-2 mt-20 mb-2" ref="chatListDom">
      <Message
        v-for="item of messageList.filter((v) => v.role !== 'system')"
        :message="item"
      />
    </div>

    <div class="sticky bottom-0 w-full p-6 pb-8 bg-gray-100">
      <div class="-mt-2 mb-2 text-sm text-gray-500" v-if="isConfig">
        请输入 API Key：
      </div>
      <div class="flex items-center">
        <Reload />
        <input
          class="input ml-2 mr-4"
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
