import { Wish, WishId } from "./wishTypes";

export const requestUnmoderatedWishes = async () : Promise<Wish[]> => {
    const url = 'api/cabinetAdmin'
    const response = await fetch (url)
    const data = await response.json()
    return data.wishes;
}

export const requestDeleteWishes = async (id : WishId) : Promise<WishId> => {
    await fetch('api/delete',{
        method: 'DELETE',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({id}
        ),
      })
      return id;
}

export const requestChangeWish = async ( arrayId : WishId[]) => {
      await fetch('api/isModeration',{
        method: 'PUT',
        headers: { 'Content-Type': 'Application/json' },
        body: JSON.stringify({
         arrayId
        }),
      })
  
}