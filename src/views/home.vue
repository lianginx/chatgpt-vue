<script setup lang="ts">
import type { ChatMessage } from "@/types";
import { ref } from "vue";
import { chat } from "@/libs/gpt";

const roleAlias = {
  user: 'ME',
  assistant: 'ChatGPT',
};
let messageContent = ref('');
const messageList = ref<ChatMessage[]>([]);

async function sendChatMessage(content: string, messageList: ChatMessage[]) {
  if (!content.length) return;
  messageContent.value = '';
  messageList.push({ 'role': 'user', content, });
  const chatResult = await chat(messageList);
  if (chatResult.status === 'success') {
    messageList.push(chatResult.data);
  } else {
    console.log(chatResult.message);
  }
}
</script>

<template>
  <div class="m-6 mb-40">
    <div class="mb-4">
      <span class="text-3xl font-bold">ChatGPT</span><span class="ml-4 text-gray-500">基于 OpenAI 的 ChatGPT
        自然语言模型人工智能对话</span>
    </div>
    <div class="mb-6" v-for="item of messageList">
      <div class="font-bold pb-2">{{ roleAlias[item.role] }}：</div>
      <pre class="text-gray-800 whitespace-pre-wrap">{{ item.content.replace(/^\n\n/, "") }}</pre>
    </div>
  </div>
  <div class="fixed flex bottom-0 w-full p-6 pb-12 bg-gray-100">
    <input v-model="messageContent" @keydown.enter="sendChatMessage(messageContent, messageList)"
      class="px-4 py-2 text-gray-700 bg-white border rounded-md mr-2 sm:mr-4 focus:border-blue-400  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 flex-grow"
      type="text" placeholder="请输入">
    <button @click="sendChatMessage(messageContent, messageList)"
      class="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 whitespace-nowrap">发送</button>
  </div>
</template>
