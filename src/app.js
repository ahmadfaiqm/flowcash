const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const notFound = require('./common/middlewares/notFound');
const errorHandler = require('./common/middlewares/errorHandler');
const healthRouter = require('./modules/health/health.routes');

const app = express();
app.use(helmet());
app.use(cors());
app.use(logger('dev'));
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
app.use(notFound);
app.use(errorHandler);

module.exports = app;
