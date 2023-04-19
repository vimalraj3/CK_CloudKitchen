"use strict";
// import { NextFunction, Request } from "express";
// import { ErrorHandler } from "../utils/ErrorHandler";
// module.exports = (
//   err: any,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   err.statusCode = err.statusCode || 500;
//   if (process.env.NODE_ENV == "development") {
//     let message:string = err.message;
//     let error = new Error(message);
//     if (err.name == "ValidationError") {
//       message = Object.values(err.errors).map((value) => value.message);
//       error = new Error(message);
//       err.statusCode = 400;
//     }
//     if (err.name == "CastError") {
//       message = `Resource not found: ${err.path}`;
//       error = new Error(message);
//       err.statusCode = 400;
//     }
//     if (err.code == 11000) {
//       let message = `Duplicate ${Object.keys(err.keyValue)} error`;
//       err.statusCode = 400;
//       error = new Error(message);
//     }
//     if (err.name == "JSONWebTokenError") {
//       let message = "JSON Web Token is invaild. try again";
//       err.statusCode = 400;
//       error = new Error(message);
//     }
//     if (err.name == "TokenExpiredError") {
//       let message = "JSON Web Token is expired. try again";
//       err.statusCode = 400;
//       error = new Error(message);
//     }
//     res.status(err.statusCode).json({
//       success: false,
//       message: error.message,
//       stack: err.stack,
//       error: err,
//     });
//   }
//   if (process.env.NODE_ENV == "production") {
//     let message = err.message;
//     let error = new Error(message);
//     if (err.name == "ValidationError") {
//       message = Object.values(err.errors).map((value) => value.message);
//       error = new Error(message);
//       err.statusCode = 400;
//     }
//     if (err.name == "CastError") {
//       message = `Resource not found: ${err.path}`;
//       error = new Error(message);
//       err.statusCode = 400;
//     }
//     if (err.code == 11000) {
//       let message = `Duplicate ${Object.keys(err.keyValue)} error`;
//       err.statusCode = 400;
//       error = new Error(message);
//     }
//     if (err.name == "JSONWebTokenError") {
//       let message = "JSON Web Token is invaild. try again";
//       err.statusCode = 400;
//       error = new Error(message);
//     }
//     if (err.name == "TokenExpiredError") {
//       let message = "JSON Web Token is expired. try again";
//       err.statusCode = 400;
//       error = new Error(message);
//     }
//     res.status(err.statusCode).json({
//       success: false,
//       message: error.message || "Internal server error",
//     });
//   }
// };
