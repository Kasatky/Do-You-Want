import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { User, UserId, UserState } from './usersTypes';
import * as authApi from './authApi';

const initialState: UserState = {
  list: [],
  error: undefined,
};

export const register = createAsyncThunk(
  'users/authRegister',
  async (newUser: User) => {
    const isOk = await authApi.requestRegister(newUser);
    if (isOk) return newUser;
    throw new Error('Ошибка при реигстрации');
  },
);

export const login = createAsyncThunk('users/authLogin', async (id: UserId) => {
  const isOk = await authApi.requestLogin(id);
  if (isOk) return 'Вход выполнен';
  throw new Error('Ошибка входа');
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        const newUser = action.payload;
        state.list.push(newUser);
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
