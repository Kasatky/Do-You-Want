import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import userSlice from "./Auth/userSlice";
import wishSlice from "./wishSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    wish: wishSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
