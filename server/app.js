const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const user = require('./middwares/user')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const router = require('./routes')
const app = express()

app.use(
  session({
    store: new MongoStore({
      url: 'mongodb://120.78.222.240:27017/jsError'
    }),
    secret: 'secret',
    name: 'session',
    proxy: false,
    resave: true,
    saveUninitialized: true
  })
)

global.mdb = require('./models')

app.all('*', function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'POST, GET, PUT, DELETE, OPTIONS'
  )
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(user)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// app.listen(8000, function(err) {
//   if (!err) {
//     console.log('成功启动：8000！')
//   }
// })

module.exports = app
