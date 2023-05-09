import 'reflect-metadata';
import { MetadataKeys } from './MetadataKeys';

/**
 * bodyValidator decorator is use to validate the body of request
 * @export root decorator
 * @param {string[]} keys required props of body
 * @returns  {Function} decorator function
 * @example ```@bodyValidator('email','password')```
 */

export function bodyValidator(...keys: string[]) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
  };
}
