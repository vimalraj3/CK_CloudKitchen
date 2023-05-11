import { NextFunction, Request, Response } from 'express'

interface HasCode {
  statusCode: number
}

/**
 * Error handler middleware
 * @param err
 * @param req
 * @param res
 * @param next
 * @returns
 * @example
 * app.use(ErrorHandler);
 */
export const ErrorHandler = (
  err: Error & HasCode,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const defaultError = {
    success: false,
    message: err.message ? err.message : 'Internal server error',
    statusCode: err.statusCode || 500,
  }
  if (process.env.NODE_ENV === 'development') {
    console.log(err)

    res.status(defaultError.statusCode).json({
      ...defaultError,
      stack: err.stack,
    })
    return
  }
  res.status(defaultError.statusCode).json(defaultError)
  return
}
