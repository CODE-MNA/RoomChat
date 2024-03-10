import app from './app';
import { SocketApplication } from './socket';
import { RegisterListenersWhenFirstReady } from './features/chat/SocketListeners';
import { createServer } from 'http';
import { DefaultRoomController, IRoomController } from './features/chat/RoomController';
import { DefaultChatController, IChatController } from './features/chat/ChatController';



const socketApp = new SocketApplication(createServer(app),process.env.socket_cors) 

//Extract into a factory function later on
let rc : IRoomController;
let c : IChatController;

if(process.env.NODE_ENV === 'development'){
  rc = new DefaultRoomController();
  c = new DefaultChatController();
}

socketApp.InitializeSocketIo((socket)=>{
    if (rc === undefined) throw new Error("No RoomController instance.")
    if (c === undefined) throw new Error("No ChatController instance.")
    RegisterListenersWhenFirstReady(socket,c,rc)
   
},3030)


const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
