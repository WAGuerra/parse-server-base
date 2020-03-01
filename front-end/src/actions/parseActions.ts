import Parse from 'parse';

export const PARSE_LOGOUT_ACT = 'PARSE_LOGOUT_ACT';
export const parseLogoutAction = () => (
  {
    type: PARSE_LOGOUT_ACT,
  }
);

export const PARSE_LOGIN_ACT = 'PARSE_LOGIN_ACT';
export const parseLoginAction = (user: Parse.User) => (
  {
    type: PARSE_LOGIN_ACT,
    user,
  }
);
