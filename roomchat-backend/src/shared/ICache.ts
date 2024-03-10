export type ICache  = {
    get : (key: string) => Promise<string>,
    set : (key: string, value: string) => Promise<"Added" | "Updated">,
    delete: (key: string) => Promise<void>
 };
 
export class MemoryCache implements ICache {
    cacheMap : Map<string,string>;

    constructor(){
        this.cacheMap = new Map<string,string>();
    }
    get(key: string): Promise<string> {
        if(this.cacheMap.has(key)){
           let val =  this.cacheMap.get(key)

           if(val !== undefined){
                let result : string = val
               return Promise.resolve(result); 

           }
        }
          
        return Promise.reject("Not Found")
      
     
    }

    set(key: string, value: string) : Promise<"Added" | "Updated">{
        try{

            if(this.cacheMap.has(key)){
                this.cacheMap.set(key, value);
                return Promise.resolve("Updated")

            }else{
                this.cacheMap.set(key, value);
                return Promise.resolve("Added")

            }
        }catch(error){
           return Promise.reject(error)
        }
        
    };
    delete (key: string) : Promise<void>{
        try{
            if(this.cacheMap.has(key)){
               let result =  this.cacheMap.delete(key);
               if(result){
                   return Promise.resolve()

               }
            }

        }catch(error){
            return Promise.reject(error)
        }
        return Promise.reject("Couldn't delete from memory")
        
    };

}
