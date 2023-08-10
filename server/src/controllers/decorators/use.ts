import 'reflect-metadata'
import { MetadataKeys } from './MetadataKeys'
import { RequestHandler } from 'express'

/**
 * Use decorators enable us to pass express RequestHandler i.e. middleware.
 * @param  {Function} MiddlewareFunction
 * @returns {Function} Decorators function
 */
export function use(
  middleware: RequestHandler
): (target: any, key: string, desc: PropertyDescriptor) => void {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    const middlewares =
      Reflect.getMetadata(MetadataKeys.middleware, target, key) || []

    middlewares.push(middleware)

    Reflect.defineMetadata(
      MetadataKeys.middleware,
      [...middlewares],
      target,
      key
    )
  }
}
