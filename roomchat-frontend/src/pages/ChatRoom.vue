<script setup lang="ts">

import ChatMessagesContainer from '@components/Chat/ChatMessagesContainer/ChatMessagesContainer.vue';
import ChatSender from '@components/Chat/ChatSender/ChatSender.vue';


import { UseChat } from '@services/chat/UseChat';

const {messages,SendMessage} = UseChat("DEFAULT");

const list = ((messages))



</script>

<template>

    <ChatMessagesContainer v-bind:messageListProp="list"></ChatMessagesContainer>
    <ChatSender @messageSend="SendMessage"></ChatSender>

  
</template>

<style scoped>

</style>
