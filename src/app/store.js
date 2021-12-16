import { configureStore } from '@reduxjs/toolkit';
import appSlice from '../features/appSlice';
import cameraReducer from '../features/cameraSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    camera: cameraReducer
  },
});
