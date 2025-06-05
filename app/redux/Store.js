import { configureStore } from '@reduxjs/toolkit';
import User from './features/userSlice';

export const store = configureStore({
  reducer: {
    User,
  },
});
