"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkValidator = void 0;
var isEmail_1 = __importDefault(require("validator/lib/isEmail"));
var checkValidator = function (email, password, login, userName) {
    if (email !== "" && email && !(0, isEmail_1.default)(email)) {
        return false;
    }
    if (password === "" && password) {
        return false;
    }
    if (!login) {
        if (userName && userName.length == 0) {
            return false;
        }
    }
    return true;
};
exports.checkValidator = checkValidator;
//# sourceMappingURL=Validators.js.map