import {SnackbarProvider} from 'notistack';
import React from 'react';
import {CookiesProvider} from 'react-cookie';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core';
import theme from './Theme';

/*
Parse Initialization
 */
//initializeApi();

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={2} anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}>
        <CookiesProvider>
          <App/>
        </CookiesProvider>
      </SnackbarProvider>
    </ThemeProvider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
