import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { WishId, WishState } from "./wishTypes"
import * as wishApi from "./wishApi"


const initialState : WishState = {
    list : [],
    error : undefined
}


export const getUnmoderatedWishes = createAsyncThunk('wishes/unmoderated',
async ()=> {
    const data = await wishApi.requestUnmoderatedWishes();
    console.log(data)
    return data;

})

export const deleteWishes = createAsyncThunk('wishes/delete', async (id : WishId)=> {
   await wishApi.requestDeleteWishes(id);
   console.log(id);
    return id;
})


export const changeWishes = createAsyncThunk('wishes/change', async ( arrayId : WishId[]) => {
    await wishApi.requestChangeWishes(arrayId);
    return arrayId;
})


const wishSlice = createSlice({
 name : 'wishes',
 initialState,
reducers: {},
extraReducers:(builder) => {
 builder
 .addCase(getUnmoderatedWishes.fulfilled, (state, action)=>{
    const wishes = action.payload
    state.list = wishes;
 })
 .addCase(getUnmoderatedWishes.rejected, (state, action)=> {
    state.error = action.error.message
 })
 .addCase(deleteWishes.fulfilled, (state, action)=>{
    const wishId = action.payload
    state.list.filter((el) => el.id !== Number(wishId));
    console.log(state.list);
 })
 .addCase(deleteWishes.rejected, (state, action)=> {
    state.error = action.error.message
 })
 .addCase(changeWishes.fulfilled, (state, action)=>{
    const arrayId = action.payload
    arrayId.map((el) => state.list.filter((wishes) => {
    if (wishes.id === el) {
        wishes.isPublic = false
    }
 } ))
 })
 .addCase(changeWishes.rejected, (state, action)=> {
    state.error = action.error.message
 })
}
})




export default wishSlice.reducer