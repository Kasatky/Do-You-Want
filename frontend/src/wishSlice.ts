import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { WishId, NewWish, WishState } from './wishTypes';
import * as wishApi from './wishApi';

const initialState: WishState = {
  list: [],
  addedWishes: [],
  error: undefined,
  loading: false,
  random: undefined,
  stat: undefined,
};

// санки на кабинет админа

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

// санки на добавление вопроса в кабинете пользователя

export const addWish = createAsyncThunk(
  'wishes/new',
  async (newWish: NewWish) => {
    const data = await wishApi.requestNewWish(newWish);
    return data;
  },
);

// санки на кабинет пользователя

export const addUserWishes = createAsyncThunk('wishes/userWishes', async () => {
  const data = await wishApi.requestUserWishes();
  return data;
});

// санки добавления вопроса к пользователю

export const addWishToUser = createAsyncThunk(
  'wishes/addWishToUser',
  async (id: number | undefined) => {
    const data = await wishApi.requestAddWishToUser(id);
    return data;
  },
);

export const getStat = createAsyncThunk('wishes/stat', async () => {
  const data = await wishApi.requestStat();
  return data;
});

export const completeUserWish = createAsyncThunk(
  'wishes/completeUserWish',
  async (wishId: WishId) => {
    await wishApi.requestCompleteWish(wishId);
    return wishId;
  },
);

export const deleteUserWish = createAsyncThunk(
  'wishes/deleteUserWish',
  async (wishId: WishId) => {
    await wishApi.requestDeleteWish(wishId);
    return wishId;
  },
);

export const wishSlice = createSlice({
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
        state.loading = action.payload.loading;
        state.addedWishes.push(action.payload.newUserWish);
      })
      .addCase(addUserWishes.fulfilled, (state, action) => {
        const userWishes = action.payload;
        state.addedWishes = userWishes;
      })
      .addCase(addUserWishes.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addWishToUser.fulfilled, (state, action) => {
        state.addedWishes.push(action.payload);
      })
      .addCase(addWishToUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getStat.fulfilled, (state, action) => {
        state.stat = action.payload;
      })
      .addCase(getStat.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(completeUserWish.fulfilled, (state, action) => {
        state.addedWishes = state.addedWishes.filter(
          (wish) => wish.id !== action.payload,
        );
      })
      .addCase(completeUserWish.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(deleteUserWish.fulfilled, (state, action) => {
        state.addedWishes = state.addedWishes.filter(
          (wish) => wish.id !== action.payload,
        );
      })
      .addCase(deleteUserWish.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default wishSlice.reducer;
