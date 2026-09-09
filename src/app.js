const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const apiLimiter = require('./common/middlewares/rateLimiter');
const winstonLogger = require('./common/logger');
const notFound = require('./common/middlewares/notFound');
const errorHandler = require('./common/middlewares/errorHandler');
const healthRouter = require('./modules/health/health.routes');

const app = express();
app.use(helmet());
app.use(cors());
app.use(logger('combined', { stream: { write: (msg) => winstonLogger.info(msg.trim()) } }));
app.use('/api', apiLimiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/', (req, res) => {
  res.json({ status: 'success', message: 'Welcome to my awsome project REST API', docs: 'https://docs.example.com', author: 'programmer magang' });
});
app.use('/api/v1/health', healthRouter);
const usersRouter = require('./modules/users/users.routes');
app.use('/api/v1/users', usersRouter);
const authRouter = require('./modules/auth/auth.routes');
app.use('/api/v1/auth', authRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
