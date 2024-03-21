# RoomChat App
Welcome to our chat app! Alpha version deployment: https://icy-pebble-0418c9b10.5.azurestaticapps.net/

This application will allow users to engage in real-time chat conversations, join rooms, send/receive messages, and view active user counts. It's perfect for connecting with friends, colleagues, or anyone around the globe!


## Tech Stack
- Frontend: Typescript, Vue.js, Vite Build Tool
- Backend: TypeScript, Node.js, Express.js, Socket.IO
- Deployment / Infrastructure: Github Actions, Azure Static Web App, Azure Web Pub/Sub 

![Alpha-Architecture_RoomChat](https://github.com/CODE-MNA/RoomChat/assets/97069432/d4e77b40-59c4-4de1-a9a5-0587a34dabf7)


### Planned Features
- User Signup/Login: Users can sign up for an account or log in with existing credentials.
- Room Management: Browse available rooms, create new rooms, or join existing ones.
- Real-Time Messaging: Send and receive messages instantly within chat rooms.
- User Interaction: View announcements when users join or leave rooms, and see the current number of active users in each room.

### Folder Structure
- roomchat-frontend: Contains the frontend code written in Vue.js.
- roomchat-backend: Contains the backend code written in Node.js.
- contracts: Contains Data-Transfer Objects that will be serialized between the apps
<br/>



# Development Setup Instructions

Prerequisites: node, npm, typescript

### Clone the Repository:

```
git clone <repository-url>
cd roomchat
```
### Install Dependencies:
```
cd roomchat-frontend
npm install
```
```
cd ../roomchat-backend
npm install
```
### Setup Environment Variables:

<b>Create a .env file in the backend directory and add necessary environment variables such as database connection URI, JWT secret, etc. You can get more information in the backend readme.</b>

Later on when the front-end starts making requests to backend, remember
to configure the backend url in the frontend config as well.

### Start the Application (Dev Mode):

```
cd to backend dir
npm run dev
```

```
Start the frontend development server
cd to front end
npm run dev
```

### Access the Application:

- Open your web browser and navigate to http://localhost:5173 to access the front-end vite server. 
- To access the backend server, look at the port that shows when you do npm run dev in the backend. 

- When you develop and write tests, you can run them using npm test (not configured yet)


## License
This project is licensed under the MIT License.

