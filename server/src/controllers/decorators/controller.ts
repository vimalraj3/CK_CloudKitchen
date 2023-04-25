import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { NextFunction, Request, Response } from "express";
import isEmail from "validator/lib/isEmail";
import { AppError } from "../../utils/AppError";

/*
================================================
this function refers the root prefix of path 
eg:- 
/auth/login 
this function refers the root prefix in our case *\/auth\/* is root prefix😊
================================================
*/

export function bodyValidators(keys: string[]): any {
  return function (req: Request, res: Response, next: NextFunction) {
    console.log("hi form bodyVaildators", req.body);

    if (!req.body) {
      console.log(req.body, "not");
      return next(new AppError(`Invalid input data`, 400));
    }

    // flag variable
    let isValid: boolean = true;
    for (let key of keys) {
      // checking email is valid or not
      if (key === "email" && !isEmail(req.body[key])) {
        isValid = false;
        break;
      }
      console.log(req.body[key], key, "iterate body");

      // checking required data is present or not
      if (!req.body[key]) {
        isValid = false;
        break;
      }
    }

    // is not valid redirect to app error handler otherwise api handler
    if (!isValid) {
      return next(new AppError(`Invalid input`, 400));
    } else {
      next();
    }
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    // assign sub path and they respective middlewares and api handler
    for (let key in target.prototype) {
      // main api or route handler
      const routeHandler = target.prototype[key];

      // gets value of sub path
      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );

      // gets method of sub path
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      // gets middlewares of sub path
      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

      // gets required body props is args of bodyValidator is sub function use to pass props to bodyValidators core function
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKeys.validator, target.prototype, key) ||
        [];

      const validator = bodyValidators(requiredBodyProps);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
