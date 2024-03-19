import EventEmitter from "events";

// Should have domain classes (User, Message, Room)
export type IChatController =  {
    sendMessage : (socket:EventEmitter, message:string) => void;
  
   
}

export class DefaultChatController implements IChatController {
    sendMessage(socket: EventEmitter, message: string): void {
        console.log(message);
        
    }
}