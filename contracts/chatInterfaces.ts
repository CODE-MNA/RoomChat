import {ChatEvents} from "./chatEvents";

export interface ClientToServerEvents {
    [ChatEvents.JOIN_ROOM] : (room : string) => void,
    [ChatEvents.LEAVE_ROOM] : (roomLeft : string) => void,
    [ChatEvents.SEND_MESSAGE] : (message : string, room : string) => void,
  
  }
  
 export  interface ServerToClientEvents {
    [ChatEvents.JOIN_ROOM] : (room : string, joiner : string) => void,
    [ChatEvents.LEAVE_ROOM] : (roomLeft : string, leaver:string) => void,
    [ChatEvents.SEND_MESSAGE] : (message : string, senderName : string, timeStamp : number, room:string) => void,
  
  }
  