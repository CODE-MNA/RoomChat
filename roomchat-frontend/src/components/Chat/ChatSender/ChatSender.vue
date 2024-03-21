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


input[type="text"] {
  flex: 1;
  margin-right: 10px;
  border: 4px solid #ccc;
  border-radius: 5px;

  transition: border-color 0.3s;
}

input[type="text"]:focus {
  border-color: #53b065;
}

button {

  height: max-content;
  background-color: #181b1d;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.send-controls-container {
  display: flex;
  align-items:center;
  justify-content: start;
  flex-grow: 3 1;

    width: 100%;
    min-width: 0;
    
    min-height: 4em;
}
.send-controls-container > * {
  font-size: calc(50% + 0.6rem);
  padding: 2vh 2vw;
}
button:hover {
  background-color: #19782c;
}
</style>
