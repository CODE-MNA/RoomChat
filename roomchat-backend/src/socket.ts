
import {DisconnectReason, Socket, Server as WebSocketServer} from 'socket.io'
import {Server as Http} from 'http'



interface ServerToClientEvents {
    noArg: () => void;
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  interface ClientToServerEvents {
    hello: () => void;
  }
  
  interface InterServerEvents {
    ping: () => void;
  }
  
  interface SocketData {
    name: string;
    age: number;
  }


export class SocketApplication {
    io : WebSocketServer;
    port : number = 3005;

    
    constructor(httpServer : Http, cors_origin?: string){
        this.io  = new WebSocketServer<
            ClientToServerEvents,
            ServerToClientEvents,
            InterServerEvents,
            SocketData
            >(httpServer, {allowUpgrades:true,cors:{origin:"*"}});
        
        
    }

    InitializeSocketIo(handler : (socket : Socket)=>void, overridenPort? : number){

        if(overridenPort){
            this.port = overridenPort;
        }
        console.log(`Listening to ${this.port} ` );
        this.io.listen(this.port)

        this.io.on('connection',(newClientSocket : Socket)=>{
            console.log("User Connected.")
            handler?.call(this,newClientSocket);

            newClientSocket.on('disconnect',(reason : DisconnectReason)=>{
                console.log("User Disconnected.")
                console.log("Reason : " + reason)
              
            })
        })

       
    }
}