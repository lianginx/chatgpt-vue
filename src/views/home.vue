<script setup lang="ts">
import type { ChatMessage } from "@/types";
import { ref, watch, nextTick } from "vue";
import { chat } from "@/libs/gpt";

const chatListDom = ref<HTMLDivElement>();
const roleAlias = {
  user: "ME",
  assistant: "ChatGPT",
};
let messageContent = ref("");
const messageList = ref<ChatMessage[]>([
  {
    role: "assistant",
    content: `你好，我是AI语言模型，我可以提供一些常用服务和信息，例如：\n\n1. 翻译：我可以把中文翻译成英文，英文翻译成中文，还有其他一些语言翻译，比如法语、日语、西班牙语等。\n\n2. 语音识别：如果你需要语音转文字，我可以帮你实现。\n\n3. 咨询服务：如果你有任何问题需要咨询，例如健康、法律、投资等方面，我可以尽可能为你提供帮助。\n\n4. 闲聊：如果你感到寂寞或无聊，我们可以聊一些有趣的话题，以减轻你的压力。\n\n请告诉我你需要哪方面的帮助，我会根据你的需求给你提供相应的信息和建议。`,
  },
]);

async function sendChatMessage(content: string, messageList: ChatMessage[]) {
  if (!content.length) return;
  if (messageList.length === 1) messageList.pop(); // 移除开场白
  messageContent.value = "";
  messageList.push(
    { role: "user", content },
    { role: "assistant", content: "" }
  );
  const { status, data, message } = await chat(messageList);
  if (status === "success") {
    messageList[messageList.length - 1].content = data.content;
  } else {
    messageList[messageList.length - 1].content = message;
  }
}

// 聊天列表更新时滚动到页面底部
watch(messageList.value, () =>
  nextTick(() => {
    if (!chatListDom.value) return;
    scrollTo(0, chatListDom.value.scrollHeight);
  })
);
</script>

<template>
  <div class="flex flex-col h-screen">
    <div class="flex sticky top-0 items-baseline px-6 py-4 bg-gray-100">
      <div class="text-2xl font-bold"><a href="/">ChatGPT</a></div>
      <div class="ml-4 text-sm text-gray-500">
        基于 OpenAI 的 ChatGPT 自然语言模型人工智能对话
      </div>
    </div>
    <div class="flex-1">
      <div ref="chatListDom" class="m-6">
        <div class="mb-6" v-for="item of messageList">
          <div class="font-bold mb-3">{{ roleAlias[item.role] }}：</div>
          <pre
            v-if="item.content"
            class="text-gray-600 text-sm whitespace-pre-wrap"
            >{{ item.content.replace(/^\n\n/, "") }}</pre
          >
          <div v-else class="text-gray-400 text-sm">Loading……</div>
        </div>
      </div>
    </div>
    <div class="flex sticky bottom-0 w-full p-6 pb-12 bg-gray-100">
      <input
        v-model="messageContent"
        @keydown.enter="sendChatMessage(messageContent, messageList)"
        class="px-4 py-2 text-gray-700 bg-white border rounded-md mr-2 sm:mr-4 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 flex-grow"
        type="text"
        placeholder="请输入"
      />
      <button
        :disabled="!messageList[messageList.length - 1].content"
        @click="sendChatMessage(messageContent, messageList)"
        class="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 whitespace-nowrap disabled:bg-blue-300"
      >
        发送
      </button>
    </div>
  </div>
</template>
