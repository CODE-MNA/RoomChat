import app from './app';
import { SocketApplication } from './socket';
import { createServer } from 'http';



const socketApp = new SocketApplication(createServer(app),process.env.socket_cors) 



if(process.env.NODE_ENV === 'development'){

}

socketApp.InitializeSocketIo(3005)


const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
