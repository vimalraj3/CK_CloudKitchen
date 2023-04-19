import "reflect-metadata";
import { AppRouter } from "../../AppRouter";
import { Methods } from "./Methods";
import { MetadataKeys } from "./MetadataKeys";
import { NextFunction, Request, RequestHandler, Response } from "express";
import isEmail from "validator/lib/isEmail";
import { AppError } from "../../utils/AppError";
import { json } from "body-parser";
import multer from "multer";
const upload = multer();

export function bodyValidators(keys: string[]): any {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!req.body) {
      return next(new AppError(`Invalid input data`, 400));
    }

    console.log(req.body);

    let isValid: boolean = true;
    for (let key of keys) {
      if (!req.body[key]) {
        console.log(req.body[key], key);
        isValid = false;
        break;
      }
    }

    console.log(isValid, "isvalid");

    if (!isValid) {
      return next(new AppError(`Invalid input daf`, 400));
    } else {
      next();
    }
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];

      const path = Reflect.getMetadata(
        MetadataKeys.path,
        target.prototype,
        key
      );

      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        target.prototype,
        key
      );

      const middlewares =
        Reflect.getMetadata(MetadataKeys.middleware, target.prototype, key) ||
        [];

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
