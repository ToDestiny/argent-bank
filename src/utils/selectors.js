const voidUser = { status: 'void' };

export const selectUser = (userId) => (state) => {
  return state.user[userId] ?? voidUser;
};
