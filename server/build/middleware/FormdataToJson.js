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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormdataToJson = void 0;
var formidable_1 = __importDefault(require("formidable"));
var FormdataToJson = function (req, res, next) {
    var form = (0, formidable_1.default)({ multiples: true });
    form.parse(req, function (err, fields, files) {
        if (err) {
            next(err);
            return;
        }
        req.body = __assign({}, fields);
        next();
    });
};
exports.FormdataToJson = FormdataToJson;
