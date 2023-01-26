import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import usersSlice from './usersSlice';

const store = configureStore({
  reducer: {
    users: usersSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
