import { Wish } from "./wishTypes";

export const requestUnmoderatedWishes = async () : Promise<Wish[]> => {
    const url = 'api/cabinetAdmin'
    const response = await fetch (url)
    const data = await response.json()
    return data.wishes;
}

