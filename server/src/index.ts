import dotenv from 'dotenv'
import express from 'express'

import path from 'path'

import { connect } from './database/db'
import session, { SessionOptions, CookieOptions } from 'express-session'
import MongoStore from 'connect-mongo'
import { env } from 'process'
import cors, { CorsOptions } from 'cors'
import bodyParser from 'body-parser'

import { ErrorHandler } from './utils/ErrorHandler'
import { AppRouter } from './AppRouter'

import './controllers/LoginController'
import './controllers/FoodController'
import './controllers/RootController'
import './controllers/RestaurantController'
import './controllers/OrderController'
import './controllers/CartController'
import './controllers/ReviewController'

const currentDir = process.cwd()

if (currentDir.endsWith('server')) {
  dotenv.config({ path: path.resolve(currentDir, './src/.env') })
} else {
  dotenv.config({ path: path.resolve(currentDir, './server/dist/.env') })
}

const app = express()
const corsOption: CorsOptions = {
  origin: env.CLI_URL,
  credentials: true,
}
const SECRET: string = process.env.COOKIE_SECRET
const DB_URL: string = process.env.DB_URL

let cookieOpt: CookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  secure: false,
  sameSite: 'strict',
}

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1)
  cookieOpt.secure = true
  cookieOpt.sameSite = 'none'
}

let sess: SessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: SECRET,
  store: new MongoStore({
    mongoUrl: DB_URL,
    ttl: 7 * 24 * 60 * 60,
  }),
  cookie: cookieOpt,
}

app.use(bodyParser.json())
app.use(session(sess))

app.use(cors(corsOption))

app.use('/api/', AppRouter.getInstance())
app.use(ErrorHandler)

process.on('uncaughtException', (err: Error) => {
  console.error('Uncaught Exception:', err.stack)
  process.exit(1)
})

process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('Unhandled Rejection:', reason)
  process.exit(1)
})

connect(DB_URL).then(() => {
  app.listen(env.PORT, () => {
    console.log(`Server running a ${process.env.SER_URL}:${env.PORT}`)
  })
})
