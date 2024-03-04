# Chat App
### Overview
Welcome to our chat app! This application allows users to engage in real-time chat conversations, create/join rooms, send/receive messages, and view active user counts. It's perfect for connecting with friends, colleagues, or anyone around the globe!

### Features
- User Signup/Login: Users can sign up for an account or log in with existing credentials.
- Room Management: Browse available rooms, create new rooms, or join existing ones.
- Real-Time Messaging: Send and receive messages instantly within chat rooms.
- User Interaction: View announcements when users join or leave rooms, and see the current number of active users in each room.

## Tech Stack
- Frontend: Vue.js, Vite Build Tool, Typescript
- Backend: Node.js, Express.js, Socket.IO
- Database: MongoDB
- Infrastructure: Github Pages, Azure App Service

### Folder Structure
frontend: Contains the frontend code written in React.js.
backend: Contains the backend code written in Node.js and Express.js.
infra: Infrastructure-related files, such as deployment scripts or configuration files.
contracts: Contains Data-Transfer Objects that will be serialized between the databases
<br/>



# Development Setup Instructions
### Clone the Repository:

```
git clone <repository-url>
cd chat-app
```
### Install Dependencies:
```
cd frontend
npm install
```
```
cd ../backend
npm install
```
### Setup Environment Variables:

<b>Create a .env file in the backend directory and add necessary environment variables such as database connection URI, JWT secret, etc. You can get more information in the backend readme.</b>

Later on when the front-end starts making requests to backend, remember
to configure the backend url in the frontend config as well.

### Start the Application:

```
cd ../backend
npm run dev
```

```
Start the frontend development server
cd ../frontend
npm run dev
```

### Access the Application:

- Open your web browser and navigate to http://localhost:5173 to access the front-end vite server. 
- To access the backend server, look at the port that shows when you do npm run dev in the backend. 

- When you develop and write tests, you can run them using npm test (not configured yet)

## Contributing
We welcome contributions from the community! If you'd like to contribute to the project, please fork the repository, make your changes, and submit a pull request. Don't forget to follow our contribution guidelines.

## License
This project is licensed under the MIT License.

