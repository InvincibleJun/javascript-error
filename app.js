const Koa = require("koa");
const serve = require("koa-static");
const bodyParser = require('koa-bodyparser')
const jsErrorMiddleware = require('./middleware/js-error');

const app = new Koa();

app.use(bodyParser())

app.use(serve("./public"));

app.use(jsErrorMiddleware)

app.use(async ctx => {
  ctx.body = "Hello World";
});

app.listen(5000);
