import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    value: 0
  },
  reducers: {
    increase: (state, action) => {
      state.value += action.payload;
    }
  }
})

export const {increase} = appSlice.actions;
export const selectApp = state => state.app.value;
export default appSlice.reducer;