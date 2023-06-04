import { Request, Response, NextFunction } from 'express'
import logger from './logger'

export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now()

  res.on('finish', () => {
    const responseTime = Date.now() - start
    const logMessage = `[${req.method}] ${req.originalUrl} - ${res.statusCode} ${responseTime}ms`
    logger.info(logMessage)
  })

  next()
}
