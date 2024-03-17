<script setup lang="ts">
import { ref } from 'vue';
import { ChatMessage } from '@models/ChatMessage';


const emit = defineEmits<{
  messageSend: [message : ChatMessage],
  
}>()

const currentMessage = ref("")

const TriggerSendMessage = (event: Event) =>{
   event.preventDefault()
    
  if (currentMessage.value == "") return;

    const msg : ChatMessage = {
        sender:"default",
        message: currentMessage.value,
        UTC_timestamp: new Date().toUTCString()

        
    }

   
    emit("messageSend",msg)
    currentMessage.value = ""
}
</script>

<template>
    <form class="send-controls-container">
        <input type="text" v-model="currentMessage" @keydown.enter="TriggerSendMessage" >
        <button @click="TriggerSendMessage">Send</button>
    </form>
</template>

<style scoped>
.send-controls-container {
  display: flex;
  align-items: center;
}

input[type="text"] {
  flex: 1;
  padding: 8px;
  margin-right: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  border-color: #53b065;
}

button {
  padding: 8px 16px;
  background-color: #181b1d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #19782c;
}
</style>
