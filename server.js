const Koa = require('koa')
const serve = require('koa-static')
const bodyParser = require('koa-bodyparser')
const webpush = require('web-push')
const Router = require('koa-66');

const router = new Router();

const app = new Koa()
// const router = require('./route/webpush')
const port = process.env.PORT || 9000

let subscriptions = []

const vapidKeys = {}; // webpush.generateVAPIDKeys();
vapidKeys.publicKey = 'BKg6NKx2kAuiC8vvR1_Lw1-1yltG3GnR9uNGWFM7znFqtJdxfEdva1vynYyyu97s5orzt8L278fcSISyJWdpmvc';
vapidKeys.privateKey = 'RYwDE7QHozAGi0ybaf6ouHH_Hm93afcIURMNCnDo1kg';
console.log('Public key  ', vapidKeys.publicKey);
console.log('Private key  ', vapidKeys.privateKey);
webpush.setVapidDetails('https://samarjits.com', vapidKeys.publicKey, vapidKeys.privateKey)

router.get('/v1/webpush', async(ctx, next) => {
  ctx.body = {
    total: subscriptions
  }
})

router.get('/v1/webpush/.keys', async(ctx, next) => {
  ctx.body = vapidKeys.publicKey
})


router.post('/v1/webpush', async (ctx, next) => {
  try {
    // const result = await validate(ctx.request.body)
    subscriptions = subscriptions.concat([ctx.request.body])
    ctx.body = {
      message: 'successfully subscribed',
      applicationServerKey: vapidKeys.publicKey
    }
  } catch (err) {
    ctx.body = {
      error: 400,
      message: err.message
    }
  }
})

router.delete('/v1/webpush', async (ctx, next) => {
  subscriptions = subscriptions.filter((subscription) => {
    return subscription.endpoint !== ctx.request.body.endpoint
  })
  ctx.body = {
    message: 'successfully unsubscribed from notification server'
  }
})

router.post('/v1/webpush/send', async (ctx, next) => {
  const { body, title } = ctx.request.body
  const payload = {
    title,
    body,
    icon: 'icon',
    badge: 'badge'
  }
  const subscriptionsPromise = subscriptions.map((subscription) => {
    return webpush.sendNotification(subscription, JSON.stringify(payload))
  })
  try {
    await Promise.all(subscriptionsPromise)
    ctx.body = {
      message: `Sent push notification to ${subscriptions.length} subscriber(s)`
    }
  } catch (err) {
    ctx.body = {
      error: 400,
      message: err.message
    }
  }
  next();
})

app
  // .use(serve('public'))
  .use(bodyParser())
  .use(router.routes())
  // .use(router.allowedMethods())

app.listen(port)
console.log(`listening to port *:${port}. press ctrl + c to cancel`)