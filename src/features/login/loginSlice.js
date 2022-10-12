import { createSlice } from '@reduxjs/toolkit';

function setVoidUndefined(draft, userId) {
  if (draft[userId] === undefined) {
    draft[userId] = { status: 'void' };
  }
}

export function fecthLogin(emailUser, passwordUser) {
  return async (dispatch, getState) => {};
}

const { actions, reducer } = createSlice({
  name: 'login',
  initialState: {
    email: null,
    password: null,
  },
  reducers: {
    fetching: {
      prepare: (emailUser, passwordUser) => ({
        payload: { emailUser, passwordUser },
      }),
      reducer: (draft, action) => {
        setVoidUndefined(
          draft,
          action.payload.emailUser,
          action.payload.passwordUser
        );
        if (
          draft[action.payload.emailUser].status ||
          draft[action.payload.passwordUser].status === 'void'
        ) {
          draft[action.payload.emailUser].status = 'pending';
          draft[action.payload.passwordUser].status = 'pending';
          return;
        }
      },
    },
    /*     resolved,
    rejected, */
  },
});

export const { fetching } = actions;
export default reducer;
