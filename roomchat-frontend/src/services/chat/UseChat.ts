import {Ref, onMounted, onUnmounted, readonly, ref, shallowReadonly} from 'vue'
import { ChatMessage } from '../../models/ChatMessage'
import { UseSocket } from '@services/UseSocket'



export function UseChat(roomName : string){
 const {EmitLeaveRoomEvent,EmitJoinRoomEvent,EmitSendMessageEvent,UnsubscribeFromRoomEvents,SubscribeToRoomEvents } = UseSocket();


const messages : Ref<ChatMessage[]> = ref([{
    sender:"System",
    message:"Hello user, this is default message!",
    UTC_timestamp: "2021-3-5"
}])

const SendMessage = (message: ChatMessage) =>{
    
    if(message.message === "") return;
  
    message.UTC_timestamp = Date.UTC(Date.now()).toString();
    message.sender = getFromAuth();
    messages.value.push(message)

    EmitSendMessageEvent(roomName)
    
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
    
    EmitJoinRoomEvent(roomName)

} 
const LeaveRoom = () =>{
    console.log("Left Room" + roomName)

    EmitLeaveRoomEvent()
    //socket emit (leaveRoom)
} 
    

    return {
        messages : shallowReadonly(messages),
        JoinRoom, LeaveRoom,
        SendMessage
    }
}    


function getFromAuth(): string {
  return "User" + crypto.randomUUID().toString();
}

