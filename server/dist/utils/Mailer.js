"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = exports.EmailTemplate = void 0;
var form_data_1 = __importDefault(require("form-data"));
var mailgun_js_1 = __importDefault(require("mailgun.js"));
var mailgun = new mailgun_js_1.default(form_data_1.default);
var mg = mailgun.client({
    username: 'Cloud Kitchen',
    key: process.env.MAILGUN_API_KEY,
});
var EmailTemplate;
(function (EmailTemplate) {
    EmailTemplate["verification"] = "foodie";
    EmailTemplate["resetPassword"] = "resetpassword";
    EmailTemplate["review"] = "review";
})(EmailTemplate || (exports.EmailTemplate = EmailTemplate = {}));
var sendEmail = function (to, subject, template, Variables) { return __awaiter(void 0, void 0, void 0, function () {
    var defaultEmailVariables, defaultEmailConfig, sent;
    return __generator(this, function (_a) {
        defaultEmailVariables = {
            link: Variables.link,
            userName: Variables.userName,
            webName: 'Cloud Kitchen',
            supportEmail: "<support@".concat(process.env.MAILGUN_DOMAIN, ">"),
        };
        defaultEmailConfig = {
            from: "CK, ".concat(subject, " <verify@").concat(process.env.MAILGUN_DOMAIN, ">"),
            to: [to],
            subject: subject,
            template: template,
            'h:X-Mailgun-Variables': JSON.stringify(defaultEmailVariables),
            'h:Reply-To': 'reply-to@example.com',
        };
        sent = mg.messages
            .create(process.env.MAILGUN_DOMAIN, defaultEmailConfig)
            .then(function (msg) { return true; })
            .catch(function (err) { return false; });
        return [2 /*return*/, sent];
    });
}); };
exports.sendEmail = sendEmail;
//# sourceMappingURL=Mailer.js.map