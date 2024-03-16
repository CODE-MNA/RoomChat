import {Ref, onMounted, onUnmounted, readonly, ref, shallowReadonly} from 'vue'
import { ChatMessage } from '../../models/ChatMessage'



export function UseChat(roomName : string){



const messages : Ref<ChatMessage[]> = ref([{
    sender:"System",
    message:"Hello user, this is default message!",
    UTC_timestamp: "2021-3-5"
}])

const SendMessage = (message: ChatMessage) =>{
    //validation
    //use a socket to send messages
    
    messages.value.push(message)
    console.log("new message: " + JSON.stringify(message))
} 

onMounted(()=>{
    //Subscribe to incoming IN-ROOM events i.e OnMessage and OnUserLeave and OnUserJoined
  

console.log("Subscribed to events on : " + roomName)

})
onUnmounted(()=>{
console.log("Unsubscribed from events on : " + roomName)

    //Remove Subscribtions to incoming IN-ROOM events i.e OnMessage and OnUserLeave and OnUserJoined
})


const JoinRoom = () =>{
    console.log("Joined Room" + roomName)
    //socket emit (joinRoom)
} 
const LeaveRoom = () =>{
    console.log("Left Room" + roomName)

    //socket emit (leaveRoom)
} 
    

    return {
        messages : shallowReadonly(messages),
        JoinRoom, LeaveRoom,
        SendMessage
    }
}    

