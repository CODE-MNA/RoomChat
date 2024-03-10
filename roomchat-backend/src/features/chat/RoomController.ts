import { EventEmitter } from "stream";

// Should have domain classes (User, Message, Room)
export type IRoomController =  {
    joinRoom : (emitter: EventEmitter, room : string)=> void;
    leaveRoom: (emitter: EventEmitter)=> void;
}
export class DefaultRoomController implements IRoomController {
    joinRoom(socket: EventEmitter, room: string): void {
        console.log(`Joined room ${room}`);
        // Implement join logic
    }

    leaveRoom(socket: EventEmitter): void {
        console.log("Left room");
        // Implement leave logic
    }
}