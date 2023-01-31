import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { WishId, NewWish, WishState } from './wishTypes';
import * as wishApi from './wishApi';

const initialState: WishState = {
  list: [],
  error: undefined,
  loading: false,
  random: undefined,
};

export const getUnmoderatedWishes = createAsyncThunk(
  'wishes/unmoderated',
  async () => {
    const data = await wishApi.requestUnmoderatedWishes();
    return data;
  },
);

export const deleteWish = createAsyncThunk(
  'wishes/delete',
  async (id: WishId) => {
    await wishApi.requestDeleteWishes(id);
    return id;
  },
);

export const changeWishes = createAsyncThunk(
  'wishes/change',
  async (arrayId: WishId[]) => {
    await wishApi.requestChangeWish(arrayId);
    return arrayId;
  },
);

export const getRandomWish = createAsyncThunk('wishes/random', async () => {
  const wish = await wishApi.requestRandomWish();
  return wish;
});

export const addWish = createAsyncThunk(
  'wishes/new',
  async (newWish: NewWish) => {
    const { loading } = await wishApi.requestNewWish(newWish);
    return loading;
  },
);

const wishSlice = createSlice({
  name: 'wishes',
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
        state.random = wish;
      })
      .addCase(getRandomWish.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addWish.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(addWish.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addWish.fulfilled, (state, action) => {
        state.loading = action.payload;
      });
  },
});

export default wishSlice.reducer;
