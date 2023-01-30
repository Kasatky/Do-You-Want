import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WishId, WishState } from "./wishTypes";
import * as wishApi from "./wishApi";

const initialState: WishState = {
  list: [],
  error: undefined,
};

export const getUnmoderatedWishes = createAsyncThunk(
  "wishes/unmoderated",
  async () => {
    const data = await wishApi.requestUnmoderatedWishes();
    console.log(data);
    return data;
  }
);

export const deleteWish = createAsyncThunk(
  "wishes/delete",
  async (id: WishId) => {
    await wishApi.requestDeleteWishes(id);
    return id;
  }
);

export const changeWishes = createAsyncThunk(
  "wishes/change",
  async (arrayId: WishId[]) => {
    await wishApi.requestChangeWish(arrayId);
    return arrayId;
  }
);

const wishSlice = createSlice({
  name: "wishes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUnmoderatedWishes.fulfilled, (state, action) => {
        const wishes = action.payload;
        state.list = wishes;
      })
      .addCase(getUnmoderatedWishes.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteWish.fulfilled, (state, action) => {
        const wishId = action.payload;
        state.list = state.list.filter((el) => el.id !== Number(wishId));
      })
      .addCase(deleteWish.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(changeWishes.fulfilled, (state, action) => {
        const arrayIds = action.payload;
        arrayIds.forEach((id) => {
          const wishIndex = state.list.findIndex((w) => w.id === id);
          if (wishIndex) {
            state.list.splice(wishIndex,1)
          }
        });
      })
      .addCase(changeWishes.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default wishSlice.reducer;
