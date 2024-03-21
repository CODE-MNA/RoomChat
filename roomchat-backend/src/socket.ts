
import {DisconnectReason, Socket, Server as WebSocketServer} from 'socket.io'
import {Server as Http} from 'http'
import { ChatEvents } from '@contracts/chatEvents'
import {ClientToServerEvents,ServerToClientEvents} from '@contracts/chatInterfaces'
import { RegisterListenersWhenFirstReady } from './features/chat/SocketListeners';
import { useAzureSocketIO } from '@azure/web-pubsub-socket.io';



export class SocketApplication {
    io : WebSocketServer<ClientToServerEvents,ServerToClientEvents>;
    port : number = 3005;

    
    constructor(httpServer : Http, cors_origin?: string){
        this.io  = new WebSocketServer<
            ClientToServerEvents,
            ServerToClientEvents
            >(httpServer, {allowUpgrades:true,cors:{origin:cors_origin ||
            '*'}, perMessageDeflate:false});
        
        useAzureSocketIO(this.io, {
                hub: "RoomChatHub",
                connectionString: process.argv[2] || process.env.AZURE_PUBSUB_CONNECTION || "NO STRING PRESENT"
            });
        
    }

    InitializeSocketIo(overridenPort? : number){

        if(overridenPort){
            this.port = overridenPort;
        }
        console.log(`Listening to ${this.port} ` );
        this.io.listen(this.port)

        this.io.on('connection',(newClientSocket : Socket<ClientToServerEvents,ServerToClientEvents>)=>{
            let connectedUsersCount = this.io.of('/').sockets.size
            console.log(`Connected users: ${connectedUsersCount}`)

            RegisterListenersWhenFirstReady(newClientSocket, this.io)


            newClientSocket.on('disconnect',(reason : DisconnectReason)=>{
                let connectedUsersCount = this.io.of('/').sockets.size
                console.log(`Connected users: ${connectedUsersCount} (-1)`)
              
            })
        })

       
    }
}