import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

function setVoidUndefined(draft, userId) {
  if (draft[userId] === undefined) {
    draft[userId] = { status: 'void' };
  }
}

const { actions, reducer } = createSlice({
  name: 'login',
  initialState,
  reducers: {
    fetching: {
      prepare: (userId) => ({
        payload: { userId },
      }),
      reducer: (draft, action) => {
        setVoidUndefined(draft, action.payload.userId);
      },
    },
    /*     resolved,
    rejected, */
  },
});

export const { fetching } = actions;
export default reducer;
