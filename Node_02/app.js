var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// index.js와 user.js를 bean으로 설정하는 역할
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var myRouter = require('./controllers/myController');

var app = express();

// middle wares(자바의 dependency와 같음)
// view engine setup
// __dirname : system변수로서 현재 프로젝트의 root(../../Node02) directory
// path.join : java의 file객체와 같으며 path.join(__dirname, 'views')는 다음과 같이 작동된다.
// ../../Node_02/views/ 라는 형식으로 디렉토리 정보를 생성
// *.ejs(view)파일들이 저장될 폴더를 지정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

// 만약에 json형태의 데이터들이 있으면
// 자동 parsing을 수행해달라
app.use(express.json());

// url encoding을 처리하는 부분
app.use(express.urlencoded({ extended: false }));

// session과 관련된 미들웨어
app.use(cookieParser());

// static files: web에서 이미지, css, js 등을 request받으면 controller에서 관여하지 말고 그냥 보내라
// (아무 가공도 하지 말고 response해라)
// spring의 resources폴더와 같은 역할
// img src="" : web에서 이미지를 요청한다.
// link href="" : web에서 css 파일을 요청한다.
// script src="" : web에서 js 파일을 요청한다.
app.use(express.static(path.join(__dirname, 'public')));

// localhost:3000/라고 요청을 하면 indexRouter에게 보내라(mapping)
app.use('/', indexRouter);
// localhost:3000/users 라고 요청을 하면 usersRouter에게 보내라(mapping)
app.use('/users', usersRouter);

// localhost:3000/hello 라고 요청을 하면 myRouter(./controllers/myController.js)에게 요청을 전달하라
app.use('/hello', myRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 이렇게 해줘야 www에 선언된 app 객체 사용이 가능함.
module.exports = app;
