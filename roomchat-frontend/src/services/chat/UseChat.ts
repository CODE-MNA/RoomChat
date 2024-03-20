import {Ref, onMounted, onUnmounted, ref, shallowReadonly} from 'vue'
import { ChatMessage } from '../../models/ChatMessage'
import { UseSocket } from '@services/UseSocket'
import { ChatEvents } from '@contracts/chatEvents';



export function UseChat(roomName : string){
 const { socketState, EmitLeaveRoomEvent,EmitJoinRoomEvent,EmitSendMessageEvent,UnsubscribeFromRoomEvents,SubscribeToRoomEvents } = UseSocket();


const messages : Ref<ChatMessage[]> = ref([{
    sender:"System",
    message:"Hello user, this is default message!",
    UTC_timestamp: "---"
}])

const SendMessage = (message: ChatMessage) =>{
    
    if(message.message === "") return;
    if(socketState.id === undefined) return;
    message.UTC_timestamp = Date.UTC(Date.now()).toString();
    message.sender = socketState.id.value || "ERROR_MISSING_ID" ;
    messages.value.push(message)

    EmitSendMessageEvent(message.message)
    
    console.log("new message: " + JSON.stringify(message))
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
                    sender:senderName, message:message, UTC_timestamp:timeStamp.toString()
                }

                messages.value.push(displayed);

            },
            [ChatEvents.JOIN_ROOM](room, joiner) {
                if(room !== roomName) {return;}
                messages.value.push({
                    sender:"SYSTEM - " + room ,
                    message:joiner + " joined this room!",
                    UTC_timestamp: "---"
                })
            },
            [ChatEvents.
                LEAVE_ROOM](roomLeft, leaver) {
                    if(roomLeft !== roomName) {return;}
                    messages.value.push({
                        sender:"SYSTEM - " + roomLeft ,
                        message:leaver + " left this room! 😔",
                        UTC_timestamp: "---"
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
    //socket emit (leaveRoom)
} 
    

    return {
        messages : shallowReadonly(messages),
        JoinRoom, LeaveRoom,
        SendMessage
    }
}    




