import {useCallback} from 'react';
import Parse, {FullOptions} from 'parse';
import {parseLoginAction} from '../actions';
import {useParseValues} from '../providers/ParseProvider';
import {useHandleError} from './useHandleError';
import {useSnackbar} from 'notistack';

export const useLogin = (): Function => {
  const [, dispatch] = useParseValues();
  const handleError = useHandleError();
  const {enqueueSnackbar} = useSnackbar();
  
  return useCallback((
      username: string, password: string,
      options?: FullOptions,
  ): Promise<any> => {
    return Parse.User.logIn(username, password, options)
        .then(
            (user) => {
              dispatch(parseLoginAction(user));
            },
            async error => {
              if (error.code === 100) {
                enqueueSnackbar(
                    'Não foi possível fazer login. Verifique sua conexão.',
                    {variant: 'warning'},
                );
              }
              await handleError(error);
            },
        )
        .catch(handleError);
  }, [dispatch, handleError, enqueueSnackbar])
};
