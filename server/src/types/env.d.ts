export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL: string;
      ENV?: "test" | "dev" | "prod";
      COOKIE_SECRET: string;
      SER_URL: string;
      CLIENT_ID: string;
      CLI_URL: string;
      CLIENT_SECRET: string;
      SALT: string;
      CLOUD_NAME: string;
      CLOUD_KEY: string;
      CLOUD_SECRET: string;
      JWT_SECRET: string;
      MAILGUN_API_KEY:string;
      MAILGUN_URL:string;
      MAILGUN_DOMAIN:string;
    }
  }
}
