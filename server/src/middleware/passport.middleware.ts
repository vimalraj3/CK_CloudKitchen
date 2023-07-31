import passport from 'passport'
import {
  Strategy as GoogleStrategy,
  StrategyOptions,
  Profile,
  VerifyCallback,
} from 'passport-google-oauth20'
import User from '../models/user.model'
import path from 'path'

import dotenv from 'dotenv'

// dotenv.config()
const currentDir = process.cwd()
console.log(currentDir)

if (currentDir.endsWith('server')) {
  dotenv.config({ path: path.resolve(currentDir, './src/.env') })
} else {
  dotenv.config({ path: path.resolve(currentDir, './server/dist/.env') })
}

console.log(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.SER_URL
)

const options: StrategyOptions = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET || '',
  callbackURL: `${process.env.SER_URL}/api/auth/google/callback`,
}

const CreateUser = async ({
  email,
  userName,
  googleId,
  avatar,
}: any): Promise<any> => {
  const user = User.create({
    email,
    userName,
    googleId,
    avatar,
  })
    .then((data: any) => {
      return data
    })
    .catch((error: Error) => {
      console.log('Error', error)

      return
    })
  return user
}

// * set the cookie session
passport.serializeUser(function (user: any, cb: any) {
  cb(null, user._id)
})

// * decode the cookie session
passport.deserializeUser(async function (user: any, cb: any) {
  const userInfo = await User.findById(user)
  return cb(null, userInfo)
})

// * find or create a user
passport.use(
  new GoogleStrategy(
    options,
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      cb: VerifyCallback
    ) => {
      const { id } = profile
      const user = await User.findOne({ googleId: id })
      if (user) {
        return cb(null, user)
      }
      const { name, email, picture } = profile._json
      const newUser: any = await CreateUser({
        email,
        userName: name,
        googleId: id,
        avatar: picture,
      })
      return cb(null, newUser)
    }
  )
)
