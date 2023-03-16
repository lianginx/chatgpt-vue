<script setup lang="ts">
import type { ChatMessage } from "@/types";
import Loding from "@/components/Loding.vue";
import Copy from "@/components/Copy.vue";
import Avatar from "@/components/Avatar.vue";

const props = defineProps<{ message: ChatMessage }>();
</script>

<template>
  <div class="group flex flex-row px-4 py-4 hover:bg-slate-100 rounded-lg">
    <Avatar class="mr-4" :role="message.role" />
    <div>
      <div class="flex flex-col items-start" v-if="message.content">
        <pre class="text-slate-700 whitespace-pre-wrap leading-relaxed">{{
          message.content
        }}</pre>
        <Copy
          class="mt-3 invisible group-hover:visible"
          :content="message.content"
        />
      </div>
      <Loding v-else />
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
