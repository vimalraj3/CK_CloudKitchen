import { NextFunction, Request, Response } from "express";
import formidable from "formidable";
import { AppError } from "../utils/AppError";

export const FormdataToJson = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const form = formidable({ multiples: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    req.body = { ...fields };
    next();
  });
};
