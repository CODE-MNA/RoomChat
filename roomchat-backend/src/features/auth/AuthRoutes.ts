import { Router } from "express";
import AuthController from "./AuthController";


let authRouter : Router = Router();

let setupAuthRoutes = (authController : AuthController) => {
    authRouter.get('login', (req, res) => {

        authController.login(req.body.email, req.body.password)
    })
    authRouter.get('logout', (req, res) => {
    
       
    })
}
 

export default setupAuthRoutes;