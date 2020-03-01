import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React from 'react';
import './App.css';
import {ParseProvider, ParseState} from './providers/ParseProvider';
import {parseReducer} from './reducers/parseReducer';
import RootRouter from './routes/RootRouter';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        backgroundColor: theme.palette.background.default,
        minHeight: '100vh',
      },
    }),
);

const App: React.FC = () => {
  const classes = useStyles();
  //TODO adicionar snackbar de aceite de cookies
  const parseInitialState: ParseState = {
    user: Parse.User.current(),
    roles: [],
  };

  return (
      <ParseProvider reducer={parseReducer} initialState={parseInitialState}>
        <div className={classes.root}>
          <RootRouter/>
        </div>
      </ParseProvider>
  );
};

export default App;
