"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bodyValidator = void 0;
require("reflect-metadata");
var MetadataKeys_1 = require("./MetadataKeys");
/**
 * bodyValidator decorator is use to validate the body of request
 * @export root decorator
 * @param {string[]} keys required props of body
 * @returns  {Function} decorator function
 * @example ```@bodyValidator('email','password')```
 */
function bodyValidator() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (target, key, desc) {
        Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.validator, keys, target, key);
    };
}
exports.bodyValidator = bodyValidator;
//# sourceMappingURL=bodyValidator.js.map