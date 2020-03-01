import {ParseState} from '../providers/ParseProvider';
import {
  Action,
  PARSE_LOGIN_ACT,
  PARSE_LOGOUT_ACT,
} from '../actions';

export const parseReducer = (
  state: ParseState, action: Action & any): ParseState => {
  switch (action.type) {
    case PARSE_LOGOUT_ACT:
      return {
        ...state,
        user: undefined,
      };
    case PARSE_LOGIN_ACT:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
};
