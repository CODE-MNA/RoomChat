import { ICache } from "../../shared/ICache";
import { IRepository } from "../../shared/IRepository";
import { IPasswordHasher } from "./IPasswordHasher";
import { User } from "./UserRepository";




//Changeable


export default class AuthController{
   
    
    //Takes in interface services
    constructor(private cacheService : ICache, private hasher : IPasswordHasher, private repository: IRepository<User>){
        
        if(cacheService === null || undefined){
            throw new Error("Cache service not injected")
        }

        if(hasher === null || undefined){
            throw new Error("Hashing service not injected")
        }

        if(repository === null || undefined){
            throw new Error("Repository service not injected")
        }
    }

     public login = (email: string, password: string) : string =>{
       
       //find auth record from email (email should be indexed in db)
       
       //throw rejection if email doesn't exists
       
       //get hashed password from record. Hash input password and compare it with stored one in database
       
       //throw rejection if hashes dont match

       //generate both tokens if hashes do match
        let token = "access"
        let refreshToken = "refresh"


        //store refresh token in cache
        this.cacheService?.set(email,refreshToken)
        
        //return access token
        return token
    }

    public logout = ()=>{
        //delete from cache
        throw new Error("Not Implemented")
        
    }

    public refresh = ()=>{
        //take refresh token and expired access token

        throw new Error("Not Implemented")

        // if valid access token before expiration, check cache for refresh token

        //if expired logout redirect

        //if not, lo
    }

    public register = ()=>{
        //validate displayname, email, password string format

        //check email if it already exists throw error

        //add email, password, displayname to database
        
        //return valid code
    }
    
}