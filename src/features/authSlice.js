import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: null,
  lastName: null,
  token: null,
  isLogin: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload.token;
    },
    logout: (state) => {
      localStorage.clear();
      state.token = null;
      state.isLogin = false;
      state.firstName = null;
      state.lastName = null;
    },
    setUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.isLogin = true;
    },
  },
});

export const selectAuth = (state) => state.auth;

export const { setUser, setUserToken, logout } = authSlice.actions;

export default authSlice.reducer;
