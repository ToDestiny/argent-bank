import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    status: 'void',
    data: null,
    error: null,
  },
  reducers: {
    fetching: (state) => {},
    resolved: (state) => {},
    rejected: (state) => {},
  },
});

// Action creators are generated for each case reducer function
export const { fetching, resolved, rejected } = loginSlice.actions;

export default loginSlice.reducer;
