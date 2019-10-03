const bodyParser = require('body-parser');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const pagesRoutes = require('./routes/_');
const apiRoutes = require('./routes/api/_');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'scss'),
  dest: path.join(__dirname, '..', 'public', 'stylesheets'),
  indentedSyntax: false, // true = .sass and false = .scss
  outputStyle: 'compressed',
  prefix: '/stylesheets',
  sourceMap: true
}));
app.use(express.static('public'));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

// pages routes
for (const path in pagesRoutes) {
  app.use(`/${path !== 'index' ? path : ''}`, pagesRoutes[path]);
}

// api routes
for (const key in apiRoutes) {
  app.use(`/api/${key}`, apiRoutes[key]);
}

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
  res.render('error');
});

module.exports = app;
