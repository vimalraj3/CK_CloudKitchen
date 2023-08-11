"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodedEmail = exports.encodedEmail = void 0;
var js_base64_1 = __importDefault(require("js-base64"));
// Encode the email
var encodedEmail = function (email) { return js_base64_1.default.encode(email); };
exports.encodedEmail = encodedEmail;
// Decode the encoded email
var decodedEmail = function (token) { return js_base64_1.default.decode(token); };
exports.decodedEmail = decodedEmail;
//# sourceMappingURL=encoder.js.map