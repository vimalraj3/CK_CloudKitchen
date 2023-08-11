"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = exports.bodyValidators = void 0;
require("reflect-metadata");
var AppRouter_1 = require("../../AppRouter");
var MetadataKeys_1 = require("./MetadataKeys");
var isEmail_1 = __importDefault(require("validator/lib/isEmail"));
var AppError_1 = require("../../utils/AppError");
/*
================================================
this function refers the root prefix of path
eg:-
/auth/login
this function refers the root prefix in our case *\/auth\/* is root prefix😊
================================================
*/
/**
 * bodyValidators decorator is use to validate the body of request
 * @export root decorator
 * @param {string[]} keys required props of body
 * @returns  {Function} decorator function
 */
function bodyValidators(keys) {
    return function (req, res, next) {
        if (!req.body) {
            return next(new AppError_1.AppError("Invalid input data", 400));
        }
        // flag variable
        var isValid = true;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            // checking email is valid or not
            if (key === 'email' && !(0, isEmail_1.default)(req.body[key])) {
                isValid = false;
                break;
            }
            // checking required data is present or not
            if (!req.body[key]) {
                isValid = false;
                break;
            }
        }
        // is not valid redirect to app error handler otherwise api handler
        if (!isValid) {
            return next(new AppError_1.AppError("Invalid input", 400));
        }
        else {
            next();
        }
    };
}
exports.bodyValidators = bodyValidators;
/**
 * controller decorator is use to assign sub path and they respective middlewares and api handler
 * @export controller decorator
 * @param {string} routePrefix root path of api
 * @returns  {Function}
 */
function controller(routePrefix) {
    return function (target) {
        var router = AppRouter_1.AppRouter.getInstance();
        // assign sub path and they respective middlewares and api handler
        for (var key in target.prototype) {
            // main api or route handler
            var routeHandler = target.prototype[key];
            // gets value of sub path
            var path = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.path, target.prototype, key);
            // gets method of sub path
            var method = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.method, target.prototype, key);
            // gets middlewares of sub path
            var middlewares = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.middleware, target.prototype, key) ||
                [];
            // gets required body props is args of bodyValidator is sub function use to pass props to bodyValidators core function
            var requiredBodyProps = Reflect.getMetadata(MetadataKeys_1.MetadataKeys.validator, target.prototype, key) || [];
            var validator_1 = bodyValidators(requiredBodyProps);
            if (path) {
                router[method].apply(router, __spreadArray(__spreadArray(["".concat(routePrefix).concat(path)], middlewares, false), [validator_1,
                    routeHandler], false));
            }
        }
    };
}
exports.controller = controller;
//# sourceMappingURL=controller.js.map