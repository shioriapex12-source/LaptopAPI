var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

var indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const laptopRouter = require('./routes/laptop');

var app = express();

mongoose.connect('mongodb+srv://shioriapex12_db_user:skjok4sOtRynFTT9@enjs.jekmcny.mongodb.net/?appName=ENJS    ')
.then(() => console.log("Connected"))
.catch((err) => console.log(err));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/laptops', laptopRouter);
app.use('/api/users', usersRouter);

module.exports = app;
