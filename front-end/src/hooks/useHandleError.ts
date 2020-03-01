import Parse, {Error} from 'parse';
import {useCallback} from 'react';
import {navigate} from 'hookrouter';
import {useSnackbar} from 'notistack';
import {useCookies} from 'react-cookie';
import {parseLogoutAction} from '../actions';
import {useParseValues} from '../providers/ParseProvider';

export const useHandleError = (): ((reason: any) => Promise<any>) => {
  const [, dispatch] = useParseValues();
  const {enqueueSnackbar} = useSnackbar();
  const [parseState] = useParseValues();
  const [,,removeCookie] = useCookies(['roles']);
  
  const userJSON = JSON.stringify(parseState.user)
  
  return useCallback((error: Error) => {
    if (error) {
      switch (error.code) {
        case Error.INTERNAL_SERVER_ERROR:
          enqueueSnackbar('Opa! Ocorreu um erro inesperado. Tente novamente mais tarde.',{variant:'error'});
          break;
        case Error.EMAIL_TAKEN:
          enqueueSnackbar('e-mail já está sendo usado.',{variant: 'warning'});
          break;
        case Error.EMAIL_NOT_FOUND:
          enqueueSnackbar('e-mail não encontrado.',{variant: 'warning'});
          break;
        case Error.EMAIL_MISSING:
          enqueueSnackbar('e-mail não informado.',{variant: 'error'});
          break;
        case Error.PASSWORD_MISSING:
          enqueueSnackbar('Senha não foi informada.',{variant: 'error'});
          break;
        case Error.OPERATION_FORBIDDEN:
          removeCookie('roles',{path:'/'})
          break;
        case Error.CONNECTION_FAILED:
          if (parseState.user) {
            // Must be logged in to navigate
            navigate('/no-connection');
          }
          break;
        case Error.INVALID_SESSION_TOKEN:
          return Parse.User.logOut()
              .then(
                  () => {
                    dispatch(parseLogoutAction());
                  },
              );
        case Error.OBJECT_NOT_FOUND:
          switch (error.message) {
            case 'Invalid username/password.':
              enqueueSnackbar('Usuário e senha inválidos.', {variant: 'error'});
              break;
          }
          break;
      }
    }
    return Promise.resolve();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, enqueueSnackbar,userJSON]);
};
