import {Ref, onMounted, onUnmounted, ref, shallowReadonly} from 'vue'
import { ChatMessage } from '../../models/ChatMessage'
import { UseSocket } from '@services/UseSocket'
import { ChatEvents } from '@contracts/chatEvents';



export function UseChat(roomName : string){
 const { socketState, EmitLeaveRoomEvent,EmitJoinRoomEvent,EmitSendMessageEvent,UnsubscribeFromRoomEvents,SubscribeToRoomEvents } = UseSocket();


const messages : Ref<ChatMessage[]> = ref([{
    sender:"System",
    message:"Hello user, this is default message! 🚀",
    UTC_timestamp: "---"
}])

const SendMessage = (message: ChatMessage) =>{
    
    if(message.message === "") return;
    if(socketState.value.connected === false){
        message.error = true
    };
    message.UTC_timestamp = new Date().toLocaleString();
    message.sender = "YOU - " + socketState.value.id || "ERROR_MISSING_ID" ;
    message.mine = true;
    messages.value.push(message)

    EmitSendMessageEvent(message.message)
    
 
} 

onMounted(()=>{

    JoinRoom()

    SubscribeToRoomEvents(
        {
            [ChatEvents.SEND_MESSAGE](message, senderName, timeStamp, room) {

                if(room !== roomName) {
                    return;
                }
                let displayed : ChatMessage = {
                    sender:senderName, message:message, UTC_timestamp:new Date(timeStamp).toLocaleString()
                }

                messages.value.push(displayed);

            },
            [ChatEvents.JOIN_ROOM](room, joiner) {
                if(room !== roomName) {return;}
                messages.value.push({
                    sender:"SYSTEM - " + room ,
                    message:joiner + " joined this room! 😁",
                    UTC_timestamp: new Date(Date.now()).toLocaleString()
                })
            },
            [ChatEvents.
                LEAVE_ROOM](roomLeft, leaver) {
                    if(roomLeft !== roomName && roomLeft !== "ALL") {return;}
                    messages.value.push({
                        sender:"SYSTEM - " + roomLeft ,
                        message:leaver + " left this room! 😔",
                        UTC_timestamp: new Date(Date.now()).toLocaleString()
                    })
            },
        }
    )

console.log("Subscribed to events on : " + roomName)

})
onUnmounted(()=>{
    LeaveRoom()
console.log("Unsubscribed from events on : " + roomName)

UnsubscribeFromRoomEvents()
   
})



const JoinRoom = () =>{
    console.log("Joined Room" + roomName)
    
    EmitJoinRoomEvent(roomName)

} 
const LeaveRoom = () =>{
    console.log("Left Room" + roomName)

    EmitLeaveRoomEvent()
    
} 
    

    return {
        messages : shallowReadonly(messages),
        JoinRoom, LeaveRoom,
        SendMessage
    }
}    




