import {
  useEffect,
  useState,
} from 'react';
import {RequestStatus} from '../enums/parse';
import {makeCancelable} from '../helpers/Promise';
import {useHandleError} from './useHandleError';
import Parse from 'parse';
import {useCookies} from 'react-cookie';

export const useHasRole = (role: string): [boolean, RequestStatus] => {
  const [hasRole, setHasRole] = useState<boolean>(false);
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.loading);
  const handleError = useHandleError();
  const [{roles}, setCookie] = useCookies(['roles']);
  
  useEffect(() => {
    if (roles.includes(role)) {
      setHasRole(true);
      return;
    }
    
    setStatus(RequestStatus.loading);
    const [promise, cancel] = makeCancelable(Parse.Cloud.run(
      'hasRole',
      {role},
    ));
    promise
      .then(
        (doesHasRole) => {
          // setHasRole(doesHasRole);
          if (doesHasRole) {
            setCookie('roles', [...roles, role], {path: '/'});
          }
          setStatus(RequestStatus.success);
        },
        async (error) => {
          setHasRole(false);
          setStatus(RequestStatus.fail);
          await handleError(error);
        },
      )
      .catch(async (error) => {
        setHasRole(false);
        setStatus(RequestStatus.fail);
        await handleError(error);
      });
    return () => {
      cancel();
    };
  }, [role, handleError, roles,setCookie]);
  
  return [hasRole, status];
};
