<script setup lang="ts">
import type { Role } from "@/types";

const props = defineProps<{
  role: Role;
}>();
const avatars = {
  assistant: "/assistant.webp",
  system: "/system.png",
  user: "https://source.boringavatars.com/beam/?square",
};
</script>

<template>
  <img class="w-12 h-12 rounded-md" :src="avatars[role]" :alt="role" />
</template>
