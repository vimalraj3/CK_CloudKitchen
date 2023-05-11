export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string
      NODE_ENV?: 'test' | 'development' | 'production'
      TEST_DB_URL: string
      COOKIE_SECRET: string
      SER_URL: string
      CLIENT_ID: string
      CLI_URL: string
      CLIENT_SECRET: string
      SALT: string
      CLOUDINARY_PRESET: string
      CLOUDINARY_KEY: string
      CLOUDINARY_SECRET: string
      CLOUDINARY_NAME: string
      JWT_SECRET: string
      MAILGUN_API_KEY: string
      MAILGUN_URL: string
      MAILGUN_DOMAIN: string
    }
  }
}
