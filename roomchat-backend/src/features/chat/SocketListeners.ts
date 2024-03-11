import EventEmitter from "events";
import { Router } from "express";
import { IChatController, DefaultChatController } from "./ChatController";
import { DefaultRoomController, IRoomController } from "./RoomController";

import {ChatEvents} from "@contracts/chatEvents";





export const RegisterListenersWhenFirstReady = (clientSocket : EventEmitter, c : IChatController, rc:IRoomController) => {
    
    changeStateToReady(clientSocket,c,rc)


}


let changeStateToJoined = (clientSocket: EventEmitter, c : IChatController, rc : IRoomController) => {
  
    removeHandlersAfterJoiningRoom(clientSocket)
    clientSocket.on(ChatEvents.SEND_MESSAGE,(data)=>c.sendMessage(clientSocket,data)) 

    clientSocket.on(ChatEvents.LEAVE_ROOM, ()=> {
        rc.leaveRoom(clientSocket)
        changeStateToReady(clientSocket,c,rc)
    })

    
}
let changeStateToReady = (clientSocket : EventEmitter,c : IChatController, rc : IRoomController) =>{
    removeHandlersAfterLeavingRoom(clientSocket)
    clientSocket.on(ChatEvents.JOIN_ROOM,(data)=> {
        rc.joinRoom(clientSocket,data)
        changeStateToJoined(clientSocket,c,rc);
    }
    )    
}



let removeHandlersAfterLeavingRoom = (clientSocket: EventEmitter)=>{
    clientSocket.removeAllListeners(ChatEvents.SEND_MESSAGE)
    clientSocket.removeAllListeners(ChatEvents.LEAVE_ROOM)
}
let removeHandlersAfterJoiningRoom = (clientSocket: EventEmitter)=>{
    clientSocket.removeAllListeners(ChatEvents.JOIN_ROOM)
}