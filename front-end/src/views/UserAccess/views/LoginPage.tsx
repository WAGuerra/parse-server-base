import React, {
  ChangeEvent,
  useState,
} from 'react';
import {
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
} from '@material-ui/core';
import {useTitle} from 'hookrouter';
import {RequestStatus} from '../../../enums/parse';
import {useLogin} from '../../../hooks/useLogin';
import {FormWrap} from '../../components/FormWrap';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      formContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: `${theme.spacing(15)}px 0`,
      },
      textField: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: 250,
      },
      title: {
        textAlign: 'center',
        marginBottom: theme.spacing(2),
      },
      logo: {
        marginBottom: theme.spacing(6),
      },
      actionContainer: {
        margin: `${theme.spacing(2)}px 0`,
      },
      wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
      },
      buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
      },
    }),
);

const Login: React.FC = () => {
  
  useTitle('Login');
  
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const logIn = useLogin();
  const [loginStatus, setLoginStatus] = useState<RequestStatus>();
  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  
  const handleSignIn = () => {
    setLoginStatus(RequestStatus.loading);
    logIn(username, password)
        .then(
            () => setLoginStatus(RequestStatus.success),
        );
  };
  const loggingIn = loginStatus === RequestStatus.loading;
  return (
      <FormWrap className={classes.formContainer}
                onSubmit={handleSignIn}>
        <Grid
            direction={'column'}
            container
            justify={'center'}
            alignItems={'center'}
        >
          <Grid item xs className={classes.logo}>
            <img src={'/assets/xxxhdpi/logo.png'} alt={'SunRa'}/>
          </Grid>
          <Grid item xs>
            <TextField
                id={'username'}
                label={'e-mail'}
                disabled={loggingIn}
                className={classes.textField}
                value={username}
                type={'text'}
                onChange={handleUsernameChange}
                autoFocus
                variant={'outlined'}
                autoComplete={'username email'}
            />
          </Grid>
          <Grid item xs>
            <TextField
                id={'password'}
                label={'senha'}
                disabled={loggingIn}
                className={classes.textField}
                value={password}
                type={'password'}
                onChange={handlePasswordChange}
                variant={'outlined'}
                autoComplete={'current-password'}
            />
          </Grid>
          <Grid item xs className={classes.actionContainer}>
            <div className={classes.wrapper}>
              <Button
                  variant={'outlined'}
                  type={'submit'}
                  color={'primary'}
                  disabled={loggingIn}
              >
                Entrar
              </Button>
              {(
                   loggingIn
               ) &&
               <CircularProgress size={24} className={classes.buttonProgress}/>
              }
            </div>
          </Grid>
        </Grid>
      </FormWrap>
  );
};

export default Login;
