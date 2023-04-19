"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
var ErrorHandler = function (err, req, res, next) {
    if (err) {
        res.status(err.statusCode || 500).json({
            success: false,
            message: err.message,
            stack: err.stack,
        });
    }
    else {
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.ErrorHandler = ErrorHandler;
