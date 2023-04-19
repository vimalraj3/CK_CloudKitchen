import { NextFunction, Request, Response } from "express";

interface HasCode {
  statusCode: number;
}

export const ErrorHandler = (
  err: Error & HasCode,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
