require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const cors = require("cors");
const { authenticate } = require("./lib/auth");

// const multer = require('multer');
// const fs = require("fs");
// const directoryPath = path.join(__dirname, "/public/uploads");

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const bookingRouter = require('./routes/booking');
const pumpsRouter = require('./routes/pumps');
const { db } = require("./config");

const app = express();
mongoose.connect(db, { useNewUrlParser: true,useCreateIndex: true, useUnifiedTopology: true  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
//app.use('/profile',authenticate);
app.use('/profile',express.static(path.join(__dirname, 'uploads')));
app.use(cors());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/booking', bookingRouter);
app.use('/api/pumps', pumpsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
