type storeType = {
    link? : string, 
    name? : string,
    description? : string
    _id?:string | undefined,
}
type storesType = storeType[];

export type {storesType,storeType} ; 