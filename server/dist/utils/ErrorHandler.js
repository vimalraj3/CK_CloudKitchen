"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
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
var ErrorHandler = function (err, req, res, next) {
    var defaultError = {
        success: false,
        message: err.message ? err.message : 'Internal server error',
        statusCode: err.statusCode || 500,
    };
    if (process.env.NODE_ENV === 'development') {
        res.status(defaultError.statusCode).json(__assign(__assign({}, defaultError), { stack: err.stack }));
        return;
    }
    res.status(defaultError.statusCode).json(defaultError);
    return;
};
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map