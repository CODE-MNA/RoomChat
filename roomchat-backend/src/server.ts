import app from './application';
import { SocketApplication } from './socket';
import { createServer } from 'http';



const socketApp = new SocketApplication(createServer(app),process.env.FRONTEND_URL) 
socketApp.InitializeSocketIo(parseInt(process.env.SOCKET_PORT!) || 3005)


const port : number = parseInt(process.env.PORT!) || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening to : ${port}`);
  /* eslint-enable no-console */
});
