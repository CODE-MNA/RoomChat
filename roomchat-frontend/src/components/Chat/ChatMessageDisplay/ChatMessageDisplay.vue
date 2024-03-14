<script setup lang="ts">

import { ChatMessage } from '@models/ChatMessage';
defineProps<{message : ChatMessage}>();

</script>

<template>
    <div class="message-container">
      <div class="sender-name">{{message.sender}}</div>
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
    padding: 10px;
    border-radius: 5px;
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
  
  .timestamp {
    font-size: 12px;
    color: #999;
    align-self: flex-end;
  }
  </style>
