<script setup lang="ts">

import ChatMessagesContainer from '@components/Chat/ChatMessagesContainer/ChatMessagesContainer.vue';
import ChatSender from '@components/Chat/ChatSender/ChatSender.vue';


import { UseChat } from '@services/chat/UseChat';

const {messages,SendMessage} = UseChat("DEFAULT");

const list = ((messages))



</script>

<template>
    <div class="chatroom-container">

        <ChatMessagesContainer v-bind:messageListProp="list"></ChatMessagesContainer>
        <ChatSender @messageSend="SendMessage"></ChatSender>
    </div>

  
</template>

<style scoped>
    .chatroom-container{
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 80%;
        justify-content: space-between;
        margin: 0.5em auto;
    }
</style>
