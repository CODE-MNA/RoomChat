import {Socket, io} from 'socket.io-client'
import {ChatEvents} from '@contracts/chatEvents'
import { ref, toRefs } from 'vue';
import {ClientToServerEvents,ServerToClientEvents} from '@contracts/chatInterfaces'

// const prodUrl = 'https://roomchat-mna.webpubsub.azure.com'
const devUrl = 'http://localhost:3005'



  const clientSocket : Socket<ServerToClientEvents,ClientToServerEvents> = io(devUrl,{
//    path:"/clients/socketio/hubs/RoomChatHub",
   autoConnect:false,
   withCredentials:false,
   
})

const socketState = toRefs({
    connected: clientSocket.connected,
    id: clientSocket.id
})


export function UseSocket(){

    const roomState = ref({
        room : "",
      
    });

   
   
   
    clientSocket.connect()

   

    


    const EmitJoinRoomEvent = (requestedRoom:string)=>{
            
        clientSocket.emit(ChatEvents.JOIN_ROOM,requestedRoom)
        
        roomState.value.room = requestedRoom

    }

    const EmitLeaveRoomEvent = ()=>{
            
        clientSocket.emit(ChatEvents.LEAVE_ROOM,roomState.value.room)
        roomState.value.room = ""
    }

    const EmitSendMessageEvent = ( message:string) =>{

        clientSocket.emit(ChatEvents.SEND_MESSAGE,message,roomState.value.room)

    }

    const SubscribeToRoomEvents = (onEvent_handle : ServerToClientEvents)=>{
        clientSocket.on(ChatEvents.SEND_MESSAGE,onEvent_handle[ChatEvents.SEND_MESSAGE])
        clientSocket.on(ChatEvents.JOIN_ROOM, onEvent_handle[ChatEvents.JOIN_ROOM])
        clientSocket.on(ChatEvents.LEAVE_ROOM, onEvent_handle[ChatEvents.LEAVE_ROOM])
    }

    const UnsubscribeFromRoomEvents = ()=>{
        clientSocket.off(ChatEvents.JOIN_ROOM)
        clientSocket.off(ChatEvents.LEAVE_ROOM)
        clientSocket.off(ChatEvents.SEND_MESSAGE)
    }



    return {
       socketState,
        EmitJoinRoomEvent,
        EmitLeaveRoomEvent,
        SubscribeToRoomEvents,
        UnsubscribeFromRoomEvents,
        EmitSendMessageEvent
    }
}    

