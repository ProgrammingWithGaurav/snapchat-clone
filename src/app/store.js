import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../features/appSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
  },
});
