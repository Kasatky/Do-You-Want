import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DiaryState } from './diaryTypes';
import * as diaryApi from './diaryApi';

const initialState: DiaryState = {
  notes: [],
  error: undefined,
};

export const getDiary = createAsyncThunk('diary/all', async () => {
  const data = await diaryApi.requestDiary();
  return data;
});

export const diarySlice = createSlice({
  name: 'diary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDiary.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(getDiary.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default diarySlice.reducer;
