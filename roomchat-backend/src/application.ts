import { createServer } from 'http';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import * as middlewares from './middlewares';
import authRouter from './features/auth/AuthRoutes';
import { AddAuthModule } from './features/auth';


require('dotenv').config();

const environment : string = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const app = express();





//Add middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

// Add Route Handlers..
app.get("/",(req,res)=>{
    let redirectTo = process.env.FRONTEND_URL

    if(redirectTo === typeof(undefined) || redirectTo === ''){
        res.send('<h1>No Frontend Proxy!</h1>')
    }
    redirectTo = process.env.FRONTEND_URL!
    res.redirect(redirectTo)
})



AddAuthModule(app,environment);



app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;