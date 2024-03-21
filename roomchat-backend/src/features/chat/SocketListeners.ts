import {Server, Socket} from "socket.io";
import {ChatEvents} from "@contracts/chatEvents";
import { ClientToServerEvents, ServerToClientEvents } from "@contracts/chatInterfaces";


let server : Server<
ClientToServerEvents,
ServerToClientEvents
>


export const RegisterListenersWhenFirstReady = (clientSocket : Socket<ClientToServerEvents,ServerToClientEvents>,  io : Server<ClientToServerEvents,ServerToClientEvents>,) => {
    
    changeStateToReady(clientSocket)
    server = io;

    clientSocket.on('disconnect', () => {
        io.to(Array.from(clientSocket.rooms)).emit(ChatEvents.LEAVE_ROOM,"ALL",clientSocket.id)
        clientSocket._cleanup()
    })
}


let changeStateToJoined = (clientSocket: Socket<ClientToServerEvents,ServerToClientEvents>) => {
  
    removeHandlersAfterJoiningRoom(clientSocket)
    clientSocket.on(ChatEvents.SEND_MESSAGE,(message,room)=>{
            let sender = clientSocket.id;
            let timestamp = Date.now()

            clientSocket.to(room).emit(ChatEvents.SEND_MESSAGE, message, sender, timestamp, room)
    }) 

    clientSocket.on(ChatEvents.LEAVE_ROOM, (room : string)=> {
        clientSocket.to(room).emit(ChatEvents.LEAVE_ROOM,room, clientSocket.id)
        clientSocket.leave(room)
    

        changeStateToReady(clientSocket)
    })



    
}
let changeStateToReady = (clientSocket : Socket<ClientToServerEvents,ServerToClientEvents>) =>{
    removeHandlersAfterLeavingRoom(clientSocket)
    clientSocket.on(ChatEvents.JOIN_ROOM,(room : string)=> {
       clientSocket.join(room)

        clientSocket.to(room).emit(ChatEvents.JOIN_ROOM, room,clientSocket.id)
       
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