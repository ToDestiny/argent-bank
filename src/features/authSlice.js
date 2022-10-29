import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstName: null,
  lastName: null,
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserToken: (state, action) => {
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
    setUser: (state, action) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
  },
});

export const selectAuth = (state) => state.auth;

export const { setUser, setUserToken, logout } = authSlice.actions;

export default authSlice.reducer;
