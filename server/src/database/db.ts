import mongoose, { ConnectOptions } from "mongoose";

export  const connect = async (DB_URL:string) => {
    await mongoose
      .connect(DB_URL)
      .then(() => {
        return console.info(`Successfully connected to database`);
      })
      .catch((error) => {
        console.error("Error connecting to database: ", error);
        return process.exit(1);
      });
  };

