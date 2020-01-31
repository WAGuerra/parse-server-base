import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import logger from 'morgan';
import path from 'path';
import dashboard from './parseServer/dashboard';
import parseServer from './parseServer/index';
import indexRouter from './routes/index';

const mountPath = process.env.PARSE_MOUNT || '/api';

const app = express();

// Use helmet for security as suggested by
// https://expressjs.com/en/advanced/best-practice-security.html
app.use(helmet());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Parse Dashboard
app.use('/server-dashboard', dashboard);

//Parse Server
app.use(mountPath, parseServer);

// ROUTES
//app.use('/users', usersRouter);

/**
 * Must be on the end of the routes table
 */
app.use('/', indexRouter);

export default app;
