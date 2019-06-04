const Koa = require('koa');
const app = new Koa();

app.use(require('koa-static')('public'));
app.use(require('koa-bodyparser')());

const Router = require('koa-router');
const router = new Router();

let users = []

router.get('/subscribe', async (ctx, next) => {
  ctx.body = await new Promise((resolve, reject) => users.push(resolve))
})

router.post('/publish', async (ctx, next) => {
  const { message } = ctx.request.body
  if (!message) ctx.throw(400)
  users.map((resolve) => resolve(message))
  users = []
  ctx.body = 'sent'
});

app.use(router.routes());

module.exports = app;
