<script setup lang="ts">

import { ChatMessage } from '@models/ChatMessage';
import ChatMessageDisplay from '../ChatMessageDisplay/ChatMessageDisplay.vue';
defineProps<{messageListProp: ChatMessage[]}>()


</script>

<template>
  <div class="container">
   <ChatMessageDisplay
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
