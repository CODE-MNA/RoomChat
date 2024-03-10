import EventEmitter from "events";
import { Router } from "express";
import { IChatController, DefaultChatController } from "./ChatController";
import { DefaultRoomController, IRoomController } from "./RoomController";






export const RegisterListenersWhenFirstReady = (clientSocket : EventEmitter, c : IChatController, rc:IRoomController) => {
    
    changeStateToReady(clientSocket,c,rc)


}


let changeStateToJoined = (clientSocket: EventEmitter, c : IChatController, rc : IRoomController) => {
  
    removeHandlersAfterJoiningRoom(clientSocket)
    clientSocket.on('send',(data)=>c.sendMessage(clientSocket,data)) 

    clientSocket.on('leaveRoom', ()=> {
        rc.leaveRoom(clientSocket)
        changeStateToReady(clientSocket,c,rc)
    })

    
}
let changeStateToReady = (clientSocket : EventEmitter,c : IChatController, rc : IRoomController) =>{
    removeHandlersAfterLeavingRoom(clientSocket)
    clientSocket.on('joinRoom',(data)=> {
        rc.joinRoom(clientSocket,data)
        changeStateToJoined(clientSocket,c,rc);
    }
    )    
}



let removeHandlersAfterLeavingRoom = (clientSocket: EventEmitter)=>{
    clientSocket.removeAllListeners('send')
    clientSocket.removeAllListeners('leaveRoom')
}
let removeHandlersAfterJoiningRoom = (clientSocket: EventEmitter)=>{
    clientSocket.removeAllListeners('joinRoom')
}