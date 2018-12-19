
var express = require('express');
var jade = require('jade');
var cookieParser = require('cookies-parser');
var createError = require('http-errors');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var book = require('./routes/book');
var auth = require('./routes/auth')
var mongoose = require('mongoose');
mongoose.Promise =  require('bluebird');
mongoose.connect('mongodb://localhost:27017/adminportaldb', {
    useNewUrlParser: true,
    promiseLibrary: require('bluebird')
})
.then(() => console.log('connection is successful'))
.catch((err) => console.log(err));





var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine',jade);
app.engine('jade', require('jade').__express); 
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'bulid')));

app.use('/api/book', book);
//app.use('/api/auth', auth);



app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
   res.render('error');
});

module.exports = app;
