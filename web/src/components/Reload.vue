<script setup lang="ts">
import { Refresh } from "@icon-park/vue-next";

const reload = () => window.location.reload();
</script>

<template>
  <Refresh
    class="flex justify-center items-center p-2 rounded hover:bg-white cursor-pointer"
    size="24"
    fill="#666"
    @click="reload()"
  />
</template>
