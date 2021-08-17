const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require("./passport-setup");
const session = require("express-session");

const authCheck = require("./middleware/authCheck")

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const devicesRouter = require('./routes/devices');
const uploadRouter = require('./routes/upload');
const authRouter = require('./routes/auth');

const connectToMongo = require("./db")

connectToMongo()

const app = express();

// General middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session middleware
app.use(session({
  secret: 'my-super-secret-session-key',
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))

// Passport middleware -- must be after express session(line 35)
app.use(passport.initialize());
app.use(passport.session());

// routers
app.use('/', indexRouter);
app.use("/auth", authRouter);
app.use('/users', authCheck, usersRouter);
app.use('/devices', authCheck, devicesRouter);
app.use('/uploads', authCheck, uploadRouter);

// Error handling
// if all routers have failed to catch this request, or error has occured, show 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler -- when an error occures, this is the general error handler that will happen after all the other middlewares and routers (in the end of the request cycle)
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: "Requested resource does not exists" });
});

module.exports = app;
