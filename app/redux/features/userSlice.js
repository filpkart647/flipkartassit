import { getReq } from '@/utils/apiHandlers';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUserData = createAsyncThunk('userData', async () => {
  const res = await getReq('/user/me');
  return res;
});

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userDetails: {},
    isLoading: false,
    isError: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.userDetails = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getUserData.rejected, (state, action) => {
      state.isError = action.payload;
      state.isLoading = false;
    });
  },
});

export default UserSlice.reducer;
