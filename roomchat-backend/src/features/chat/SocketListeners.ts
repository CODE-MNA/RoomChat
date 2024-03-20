import {Socket} from "socket.io";
import {ChatEvents} from "@contracts/chatEvents";
import { ClientToServerEvents, ServerToClientEvents } from "@contracts/chatInterfaces";


let server : Socket<
ClientToServerEvents,
ServerToClientEvents
>


export const RegisterListenersWhenFirstReady = (clientSocket : Socket<ClientToServerEvents,ServerToClientEvents>,  io : any) => {
    
    changeStateToReady(clientSocket)
    server = io;

}


let changeStateToJoined = (clientSocket: Socket<ClientToServerEvents,ServerToClientEvents>) => {
  
    removeHandlersAfterJoiningRoom(clientSocket)
    clientSocket.on(ChatEvents.SEND_MESSAGE,(message,room)=>{
            let sender = clientSocket.id;
            let timestamp = new Date().getUTCDate()

            clientSocket.to(room).emit(ChatEvents.SEND_MESSAGE, message, sender, timestamp, room)
    }) 

    clientSocket.on(ChatEvents.LEAVE_ROOM, (room : string)=> {
        clientSocket.leave(room)
        clientSocket.to(room).emit(ChatEvents.LEAVE_ROOM,room, clientSocket.id)
    

        changeStateToReady(clientSocket)
    })

    
}
let changeStateToReady = (clientSocket : Socket<ClientToServerEvents,ServerToClientEvents>) =>{
    removeHandlersAfterLeavingRoom(clientSocket)
    clientSocket.on(ChatEvents.JOIN_ROOM,(room : string)=> {
       clientSocket.join(room)
        clientSocket.to(room).emit(ChatEvents.JOIN_ROOM, room,clientSocket.id )

        changeStateToJoined(clientSocket);
    }
    )    
}



let removeHandlersAfterLeavingRoom = (clientSocket: Socket)=>{
    clientSocket.removeAllListeners(ChatEvents.SEND_MESSAGE)
    clientSocket.removeAllListeners(ChatEvents.LEAVE_ROOM)
}
let removeHandlersAfterJoiningRoom = (clientSocket: Socket)=>{
    clientSocket.removeAllListeners(ChatEvents.JOIN_ROOM)
}