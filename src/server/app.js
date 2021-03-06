import apiRoutes from '@routes/api';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import createError from 'http-errors';
import express from 'express';
import logger from 'morgan';
import pagesRoutes from '@routes/pages';
import path from 'path';
import sassMiddleware from 'node-sass-middleware';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, '..', 'scss'),
  dest: path.join(__dirname, '..', '..', 'public', 'stylesheets'),
  indentedSyntax: false, // true = .sass and false = .scss
  outputStyle: 'compressed',
  prefix: '/stylesheets',
  sourceMap: true,
}));
app.use('/javascript', express.static(path.join(__dirname, '..', '..', 'public', 'javascript')));
app.use('/stylesheets', express.static(path.join(__dirname, '..', '..', 'public', 'stylesheets')));
app.use('/images', express.static(path.join(__dirname, '..', '..', 'public', 'images')));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// pages routes
Object.entries(pagesRoutes).forEach((entry) => {
  app.use(`/${entry[0] !== 'home' ? entry[0] : ''}`, entry[1]);
});

// api routes
Object.entries(apiRoutes).forEach((entry) => {
  app.use(`/api/${entry[0]}`, entry[1]);
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: res.locals.message,
    error: res.locals.error,
  }).end();
});

module.exports = app;
