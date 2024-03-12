

export interface IRepository<T> {
    add(item: T): Promise<void>;
    update(id: number, item: T): Promise<void>;
    delete(id: number): Promise<void>;
    getOne : (id : number) => Promise<T>;
    getList : (search : ((item : T) => boolean) | undefined) => Promise<T[]>;
  }

export class MemoryRepositoryBase<T> implements IRepository<T> {
    items: T[] = []

    constructor(seedData : T[]){
        this.items = seedData
    }
    add(item: T): Promise<void>{
        
        try {
            this.items.push(item)
            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
            
        }
        
    }
    update(id: number, item: T): Promise<void> {
        try {
            this.items[id] = item
            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
            
        }
    }
    delete(id: number): Promise<void> {
        try {
            this.items.splice(id,1)
            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
            
        }
    }
    getOne(id: number): Promise<T>{

        try {
            
            return Promise.resolve(this.items[id])
        } catch (error) {
            return Promise.reject(error)
            
        }

    }
    getList(search: ((item: T) => boolean) | undefined): Promise<T[]>{
       if(search === undefined){
            if(this.items === undefined) return Promise.reject(new Error("No array initialized."));
        return Promise.resolve(this.items);
       }
       
        let result : T[] = []
        this.items.forEach((x : T)=>{

            try{
                if(search(x)){
                    result.push(x)
                }
            }catch(error){
                Promise.reject(error)
            }
            
       });

       return Promise.resolve(result)
    }
    
   
}