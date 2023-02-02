import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserLogin, UserProfile, UserRegister, UserState } from './usersTypes';
import * as authApi from './authApi';

const initialState: UserState = {
  isAuth: false,
  profile: undefined,
  error: undefined,
};

export const register = createAsyncThunk(
  'users/authRegister',
  async (newUser: UserRegister) => {
    const data = await authApi.requestRegister(newUser);
    return data;
  },
);

export const login = createAsyncThunk(
  'users/authLogin',
  async (user: UserLogin) => {
    const data: UserProfile = await authApi.requestLogin(user);
    // console.log('login', data);
    return data;
  },
);

export const logout = createAsyncThunk('users/authLogout', async () => {
  await authApi.requestLogout();
});

export const checkUser = createAsyncThunk('users/authCheckUser', async () => {
  const data = await authApi.requestIsAuth();
  return data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        const newUser = action.payload;
        state.profile = newUser;
        state.isAuth = true;
        state.error = undefined;
      })
      .addCase(register.pending, (state, action) => {
        state.error = undefined;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.isAuth = true;
      })
      .addCase(login.pending, (state, action) => {
        state.error = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuth = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        const { user } = action.payload;
        state.profile = user;
        state.isAuth = action.payload.isAuth;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.isAuth = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
