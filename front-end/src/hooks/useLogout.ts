import {useCallback} from 'react';
import Parse from 'parse';
import {parseLogoutAction} from '../actions';
import {useParseValues} from '../providers/ParseProvider';

export const useLogout = (): Function => {
  const [,dispatch] = useParseValues();
  
  return useCallback(()=>{
    Parse.User.logOut()
        .finally(
            ()=>{
              dispatch(parseLogoutAction())
            }
        )
  },[dispatch]);
};
