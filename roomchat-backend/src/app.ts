import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import AuthHandler from './handlers/AuthHandler';

//Handler imports



require('dotenv').config();

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Add Route Handlers..
app.use("/",(req,res)=>{
res.status(200).json("OK");
})


app.use("/auth/login", (req, res) => {
    
    //validate

   return AuthHandler.login(req.body.email, req.body.password)
})


app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
