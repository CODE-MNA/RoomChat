<script setup lang="ts">

import { ChatMessage } from '@models/ChatMessage';
import { computed } from 'vue';
const props = defineProps<{message : ChatMessage}>();

const computedClass = computed(() => {
      // Check if senderName contains 'System' (case insensitive)
      const regex = /System/i;
      const isSystemMessage = regex.test(props.message.sender);

      // Determine the CSS class based on the condition
      return isSystemMessage;
    });

   
</script>

<template>
    <div :class="{'message-container':true, 'system-sent':computedClass, 'mine':props.message.mine, 'error':props.message.error }">
      <div class="sender-name" >{{message.sender}}</div>
      <div class="message-content">{{message.message}}</div>
      <div class="timestamp">{{message.UTC_timestamp}}</div>
    </div>
  </template>
  
  <style scoped>
  .message-container {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: space-between;
    background-color: #333;
   

    border-radius: 0.6em;
    margin: 0.5em;
    padding: 6px 2em;
    width: calc(100%-3em);
  }

  .sender-name {
    font-weight: bold;
    font-size: 16px;
    color: #fff;
  }
  
  .message-content {
    flex: 1;
    margin-left: 20px;
    color: #fff;
  }
  
  
  .system-sent{
    background-color: #283037;
    color: green;
    letter-spacing: 0.2em;
    font-size: 0.8rem;
    border: 0.3em solid #0e171e;
    gap:0em;
    padding-right: 3em;
  }

  .mine{
    background-color: rgb(52, 65, 52);
    border: 0.3em solid #132117;

    
  }
  .mine > .sender-name{
    font-weight: 800;
    text-underline-position: below;
  }
  .timestamp {
    font-size: 12px;
    color: #999;
    align-self: flex-end;
    letter-spacing: 0.2em;
  }
  .error{
    background-color: #542c2f;
    letter-spacing: 0.2em;
    border: 0.3em solid #221016;

    
  }
  </style>
