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
    display: block;
    gap: 0.6em;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
    width: 89%;
    max-height: calc(80vh - 5rem);
    justify-content: flex-end;
    align-items: center;
    padding-left: 2em;
    padding-right: 6em;
    margin-bottom: 0.5em;
  }
</style>
