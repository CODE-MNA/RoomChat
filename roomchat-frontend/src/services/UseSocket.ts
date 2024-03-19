import {Socket, io} from 'socket.io-client'
import {ChatEvents} from '@contracts/chatEvents'
import { ref } from 'vue';

const backendUrl = 'https://roomchat-mna.webpubsub.azure.com'



interface ClientToServerEvents {
    [ChatEvents.JOIN_ROOM] : (room : string) => void,
    [ChatEvents.LEAVE_ROOM] : (roomLeft : string) => void,
    [ChatEvents.SEND_MESSAGE] : (message : string, room : string) => void,

  }
  
  interface ServerToClientEvents {
    [ChatEvents.JOIN_ROOM] : (room : string) => void,
    [ChatEvents.LEAVE_ROOM] : (roomLeft : string) => void,
    [ChatEvents.SEND_MESSAGE] : (message : string, senderName : string, timeStamp : number) => void,

  }
  const clientSocket : Socket<ServerToClientEvents,ClientToServerEvents> = io(backendUrl,{
   path:"/clients/socketio/hubs/RoomChatHub"
})
export function UseSocket(){

    const state = ref({
        room : "",
        connected: false,
        
    });

  

    state.value.connected = clientSocket.connected 
    clientSocket.onAny(e=>{
        console.log("received " + e)
    })

 


    const EmitJoinRoomEvent = (requestedRoom:string)=>{
            
        clientSocket.emit(ChatEvents.JOIN_ROOM,requestedRoom)
        
        state.value.room = requestedRoom

    }

    const EmitLeaveRoomEvent = ()=>{
            
        clientSocket.emit(ChatEvents.LEAVE_ROOM,state.value.room)
        state.value.room = ""
    }

    const EmitSendMessageEvent = ( message:string) =>{

        clientSocket.emit(ChatEvents.SEND_MESSAGE,message,state.value.room)

    }

    const SubscribeToRoomEvents = (OnMessage : Function,OnUserJoined : Function,OnUserLeft : Function)=>{
        clientSocket.on(ChatEvents.SEND_MESSAGE,(msg,sender,dateSent)=>{
                OnMessage(msg,sender,dateSent)
        })

        clientSocket.on(ChatEvents.JOIN_ROOM, (room : string)=> OnUserJoined(room))
        clientSocket.on(ChatEvents.LEAVE_ROOM, (room : string)=> OnUserLeft(room))
    }

    const UnsubscribeFromRoomEvents = ()=>{
        clientSocket.off(ChatEvents.JOIN_ROOM)
        clientSocket.off(ChatEvents.LEAVE_ROOM)
        clientSocket.off(ChatEvents.SEND_MESSAGE)
    }



    return {
        state,
        EmitJoinRoomEvent,
        EmitLeaveRoomEvent,
        SubscribeToRoomEvents,
        UnsubscribeFromRoomEvents,
        EmitSendMessageEvent
    }
}    

