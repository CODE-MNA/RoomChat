<script setup lang="ts">

import { ChatMessage } from '@models/ChatMessage';
import ChatMessageDisplay from '../ChatMessageDisplay/ChatMessageDisplay.vue';
import { onMounted, onUnmounted, ref, watch } from 'vue';
const props = defineProps<{messageListProp: ChatMessage[]}>()

//Scrolling
const messageContainer = ref<HTMLElement | null>(null)
const showScrollButton = ref(false)
let offset: number = 70;
const scrollToBottom = ()=> {
  const container = messageContainer.value as HTMLElement
  container.scrollTo({
    top: container.scrollHeight
  })
}
const handleScroll = ()=> {
    const container = messageContainer.value as HTMLElement;
    showScrollButton.value = container.scrollTop < (container.scrollHeight - container.clientHeight) - offset;
  }


//react to the message list props change and scroll to bottom
//Set flush to post so that this effect runs afte the dom has been updated with new message div
watch(props.messageListProp,()=>{
  scrollToBottom()
}, {flush:'post'})


onMounted(()=>{
  messageContainer.value?.addEventListener('scroll',OnScrollContainer)
})

onUnmounted(()=>{
  messageContainer.value?.removeEventListener('scroll',OnScrollContainer)
})




  //Event Handlers
function OnRecentMessageScrollButtonClick(this: HTMLElement) {
 scrollToBottom()
}
function OnScrollContainer(this: HTMLElement) {
  handleScroll();


}
</script>

<template>
  <div class="container" ref="messageContainer">
   <ChatMessageDisplay
  v-for="(item, index) in messageListProp"
  :message="item"
  :index="index"
  :key="index"
/>
<button :class="{'btn-scroll-down':true, 'show-scroll-btn': showScrollButton}"  @click="OnRecentMessageScrollButtonClick">Recent Messages..</button>
</div>
</template>

<style scoped>
  .container{
    display: block;
    gap: 0.6em;
    flex-direction: column;
    overflow-y: auto;
    scroll-behavior: smooth;

    overflow-x: hidden;
    width: 100%;
    max-height: calc(80vh - 5rem);
    justify-content: flex-end;
    align-items: center;
    
    margin-bottom: 0.5em;
  }

  .btn-scroll-down{
    position:absolute;
    background-color: #364237;
   bottom:16%;
   left: 50%;
    padding: 0.8em;
    font-size: calc(0.4rem + 0.6vw);
    border: solid 2px #444444;
    pointer-events: none;
   
    opacity: 0;
    transition: opacity 0.2s ease-out;
    min-width: 12vw;
    transform: translateX(-50%);
    
  }
  
  .show-scroll-btn{
    pointer-events: all;
    opacity: 1;
    transition: opacity 0.3s ease-in;
    
  }
  
</style>
