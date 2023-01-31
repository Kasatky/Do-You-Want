import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { WishId, NewWish, WishState, UserWish } from "../wishTypes";
import * as wishApi from "./wishApi";

const initialState: WishState = {
  list: [],
  addedWishes: [],
  error: undefined,
  random: undefined,
};

// санки на кабинет админа

export const getUnmoderatedWishes = createAsyncThunk(
  "wishes/unmoderated",
  async () => {
    const data = await wishApi.requestUnmoderatedWishes();
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

// санки на получение рандомного вопроса

export const getRandomWish = createAsyncThunk("wishes/random", async () => {
  const data = await wishApi.requestRandomdWish();
  return data;
});

// санки на добавление вопроса в кабинете пользователя

export const addWish = createAsyncThunk(
  "wishes/new",
  async (newWish: NewWish) => {
    await wishApi.requestNewWish(newWish);
  }
);

// санки на кабинет пользователя

export const addUserWishes = createAsyncThunk("wishes/userWishes", async () => {
  const data = await wishApi.requestUserWishes();
  return data;
});

// санки добавления вопроса к пользователю

export const addWishToUser = createAsyncThunk("wishes/addWishToUser", async (id) => {
  const data = await wishApi.requestAddWishToUser(id);
  return data;
});

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
          if (wishIndex || wishIndex === 0) {
            state.list.splice(wishIndex, 1);
          }
        });
      })
      .addCase(getRandomWish.fulfilled, (state, action) => {
        const wish = action.payload;
        state.list = wish;
      })
      .addCase(getRandomWish.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addWish.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addUserWishes.fulfilled, (state, action) => {
        const userWishes = action.payload;
        state.addedWishes = userWishes;
      })
      .addCase(addUserWishes.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addWishToUser.fulfilled, (state, action) => {
        const userWishes = action.payload;
        state.addedWishes.push(userWishes);
      })
      .addCase(addWishToUser.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default wishSlice.reducer;
