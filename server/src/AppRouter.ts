import express from "express";

export class AppRouter {
  private static instance: express.Router;
  /*
    return the instance of express.Router 
  */
  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router();
    }

    return AppRouter.instance;
  }
}
