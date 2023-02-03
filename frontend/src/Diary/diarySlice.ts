import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DiaryNote, DiaryState } from './diaryTypes';
import * as diaryApi from './diaryApi';

const initialState: DiaryState = {
  notes: [],
  error: undefined,
};

export const getDiary = createAsyncThunk('diary/all', async () => {
  const data = await diaryApi.requestDiary();
  return data;
});

export const addNewNote = createAsyncThunk(
  'diary/new',
  async (newNote: DiaryNote) => {
    const data = await diaryApi.requestNewNote(newNote);
    return data;
  },
);

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
      })
      .addCase(addNewNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(addNewNote.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default diarySlice.reducer;
