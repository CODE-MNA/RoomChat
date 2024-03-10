import EventEmitter from "events";
import { RegisterListenersWhenFirstReady } from "../../src/features/chat/SocketListeners";
import { IChatController } from "../../src/features/chat/ChatController";
import { IRoomController } from "../../src/features/chat/RoomController";

describe("Socket Listener", () => {
    let emitter: EventEmitter;
    let roomOne: string;
    let msg1: string;
    let mockChatController: IChatController;
    let mockRoomController: IRoomController;

    beforeEach(() => {
        emitter = new EventEmitter();
        roomOne = "ROOM_1";
        msg1 = "Hello";

        mockChatController = {
            sendMessage: jest.fn(),
        };
        mockRoomController = {
            joinRoom: jest.fn(),
            leaveRoom: jest.fn(),
        };

        RegisterListenersWhenFirstReady(emitter, mockChatController, mockRoomController);
    });

    test("Send message event", async () => {
        // Act
        emitter.emit("send", msg1);
        await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for event handlers to execute

        // Assert
        expect(mockChatController.sendMessage).not.toHaveBeenCalled();
        expect(mockRoomController.leaveRoom).not.toHaveBeenCalled();
        expect(mockRoomController.joinRoom).not.toHaveBeenCalled();
    });

    test("Join room event", async () => {
        // Act
        emitter.emit("joinRoom", roomOne);
        await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for event handlers to execute

        // Assert
        expect(mockChatController.sendMessage).not.toHaveBeenCalled();
        expect(mockRoomController.leaveRoom).not.toHaveBeenCalled();
        expect(mockRoomController.joinRoom).toHaveBeenCalledTimes(1);
    });

    test("Leave room event", async () => {
        // Act

        emitter.emit("joinRoom","ABC")
        emitter.emit("leaveRoom");
        await new Promise((resolve) => setTimeout(resolve, 0)); // Wait for event handlers to execute

        // Assert
        expect(mockChatController.sendMessage).not.toHaveBeenCalled();
        expect(mockRoomController.joinRoom).toHaveBeenCalledTimes(1);
        expect(mockRoomController.leaveRoom).toHaveBeenCalledTimes(1);

        
    });


    test("Integration Test case : Sequence of events", async () => {
        // Act: Sequence of events
        emitter.emit("joinRoom", "ABC"); // Step 1
        emitter.emit("send", "XYZ");     // Step 2
        emitter.emit("send", "422");      // Step 3
        emitter.emit("leaveRoom");        // Step 4
        emitter.emit("leaveRoom");        // Step 5 (shouldn't leave)
        emitter.emit("send", "LLK");      // Step 6 (shouldn't send)
        emitter.emit("joinRoom", "BYC");  // Step 7
        emitter.emit("joinRoom", "DIZ");  // Step 8 (shouldn't join)
        emitter.emit("send", "RandomXCZ");// Step 9
        emitter.emit("leaveRoom");        // Step 10
        emitter.emit("leaveRoom");        // Step 11 (shouldn't be called)

        // Wait for event handlers to execute
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Assert: Handlers called appropriate amount of times
        expect(mockRoomController.joinRoom).toHaveBeenCalledTimes(2); // Step 1, 7
        expect(mockRoomController.leaveRoom).toHaveBeenCalledTimes(2); // Step 4,10
        expect(mockChatController.sendMessage).toHaveBeenCalledTimes(3); // Step 2,3,9

        // Additional assertions: Spy calls with correct parameters based on emitted events
        expect(mockRoomController.joinRoom).toHaveBeenCalledWith(emitter,"ABC");
        expect(mockChatController.sendMessage).toHaveBeenCalledWith(emitter,"XYZ");
        expect(mockChatController.sendMessage).toHaveBeenCalledWith(emitter,"422");
        expect(mockChatController.sendMessage).toHaveBeenCalledWith(emitter,"RandomXCZ");
    });
});