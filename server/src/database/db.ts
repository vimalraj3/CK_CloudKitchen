import mongoose, { ConnectOptions } from "mongoose";

const MONGO_OPTIONS: ConnectOptions = {
  maxPoolSize: 20,
  minPoolSize:1,  
};


export  const connect = async (DB_URL:string) => {
    await mongoose
      .connect(DB_URL, MONGO_OPTIONS)
      .then(() => {
        return console.info(`Successfully connected to database`);
      })
      .catch((error) => {
        console.error("Error connecting to database: ", error);
        return process.exit(1);
      });
  };

