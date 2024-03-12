import { MemoryRepositoryBase } from "../../shared/IRepository";
import AuthController from "./AuthController";
import setupAuthRouteFunction from "./AuthRoutes";
import { Express } from "express";
import { User } from "./UserRepository";
import { MemoryCache } from "../../shared/ICache";
import { FakePasswordHasher } from "./IPasswordHasher";



const PrepareAuthServices  = (fakes: boolean)=>{
 
 let authCache : MemoryCache = new MemoryCache();
 let authHasher :FakePasswordHasher = new FakePasswordHasher();
 let authRepo : MemoryRepositoryBase<User> = new MemoryRepositoryBase<User>([]); 
    return{
        authCache, authHasher, authRepo
    }
}

export const AddAuthModule = (app : Express, env : string) =>{
    
     const {authCache, authHasher, authRepo} = PrepareAuthServices(true);
     
    //Add services to controller
    let authController = new AuthController(authCache,authHasher,authRepo);


    //Add controller to routes and setup routes
    setupAuthRouteFunction(authController)

    
}
