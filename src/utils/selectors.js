const voidLogin = { status: 'void' };

export const selectLogin = (emailUser, passwordUser) => (state) => {
  return (state.login[emailUser] && state.login[passwordUser]) ?? voidLogin;
};
