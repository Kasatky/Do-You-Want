
export type Wish = {
    id : number,
    wish : string,
    userId : number,
    isPublic : boolean,
    isModerated : boolean,
}
export type WishState = {
    list : Wish[],
    error : string | undefined
}


