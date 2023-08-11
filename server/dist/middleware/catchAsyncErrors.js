"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncErrors = void 0;
var catchAsyncErrors = function (func) { return function (req, res, next) {
    return Promise
        .resolve(func(req, res, next))
        .catch(next);
}; };
exports.catchAsyncErrors = catchAsyncErrors;
//# sourceMappingURL=catchAsyncErrors.js.map