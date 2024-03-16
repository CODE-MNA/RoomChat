<script setup lang="ts">

import { ChatMessage } from '@models/ChatMessage';
import ChatMessageDisplayVue from '../ChatMessageDisplay/ChatMessageDisplay.vue';
defineProps<{messageListProp: ChatMessage[]}>()


</script>

<template>
  <div class="container">
   <ChatMessageDisplayVue
  v-for="(item, index) in messageListProp"
  :message="item"
  :index="index"
  :key="index"
/>
</div>
</template>

<style scoped>
  .container{
    display: flex;
    gap: 1em;
    flex-direction: column;
  }
</style>
