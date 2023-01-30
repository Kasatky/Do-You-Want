import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { WishState } from './wishTypes';
import * as wishApi from './wishApi';

const initialState: WishState = {
  list: [],
  error: undefined,
};

export const getUnmoderatedWishes = createAsyncThunk(
  'wishes/unmoderated',
  async () => {
    const data = await wishApi.requestUnmoderatedWishes();
    return data;
  }
);

export const getRandomWish = createAsyncThunk('wishes/random', async () => {
  const data = await wishApi.requestRandomdWish();
  return data;
});

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
      .addCase(getRandomWish.fulfilled, (state, action) => {
        const wish = action.payload;
        state.list = wish;
      })
      .addCase(getRandomWish.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default wishSlice.reducer;
