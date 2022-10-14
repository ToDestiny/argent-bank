import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          token: action.payload.token,
        })
      );
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.clear();
      state.token = null;
    },
  },
});

export const selectAuth = (state) => state.auth;

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
