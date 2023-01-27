import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserLogin, UserRegister, UserState } from './usersTypes';
import * as authApi from './authApi';

const initialState: UserState = {
  profile: undefined,
  error: undefined,
};

export const register = createAsyncThunk(
  'users/authRegister',
  async (newUser: UserRegister) => {
    const response = await authApi.requestRegister(newUser);

    // на бэке сделать обработку на эту ошибку и отсылать этот статус
    if (response.status === 409)
      throw new Error('Такой пользователь уже существует');

    if (!response.ok) throw new Error('Ошибка при регистрации');

    return newUser;
  },
);

// +
export const login = createAsyncThunk(
  'users/authLogin',
  async (user: UserLogin) => {
    const response = await authApi.requestLogin(user);
    if (!response.ok) throw new Error('Ошибка входа');
    return user;
  },
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        const newUser = action.payload;
        state.profile = newUser;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload;
        state.profile = user;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
