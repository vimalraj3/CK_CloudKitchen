"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
var path_1 = __importDefault(require("path"));
var decorators_1 = require("./decorators");
var user_model_1 = __importDefault(require("../models/user.model"));
var dotenv_1 = __importDefault(require("dotenv"));
var CreateUser_1 = require("../utils/CreateUser");
var bcrypt_1 = __importDefault(require("bcrypt"));
var Validators_1 = require("../middleware/Validators");
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), "./src/.env") });
var AppError_1 = require("../utils/AppError");
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController_1 = LoginController;
    // ? api->/auth/login | method->post | find user by email -> check password match -> if user send user, not user send error message
    LoginController.prototype.postLogin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, isVaildInput, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password;
                        isVaildInput = (0, Validators_1.checkValidator)(email, password, true);
                        if (!isVaildInput) {
                            res.status(400).json({
                                success: false,
                                message: "Invalid inputs",
                            });
                        }
                        return [4 /*yield*/, user_model_1.default.findOne({
                                email: email,
                            }).select("+password")];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            res.status(404).json({
                                success: false,
                                message: "User not found, please sign in",
                            });
                            return [2 /*return*/];
                        }
                        if (user.password) {
                            bcrypt_1.default.compare(password, user.password).then(function (isMatch) {
                                if (!isMatch) {
                                    next(new AppError_1.AppError("Invalid email or password", 401));
                                    return;
                                }
                                req.session.uid = user._id;
                                res.status(200).json({
                                    success: true,
                                    user: {
                                        name: user.userName,
                                        email: user.email,
                                        avatar: user.avatar,
                                        cart: user.cart,
                                        products: user.products,
                                    },
                                });
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.postSignup = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, userName, isVaildInput, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, email = _a.email, password = _a.password, userName = _a.userName;
                        console.log(LoginController_1.salt);
                        isVaildInput = (0, Validators_1.checkValidator)(email, password, false, userName);
                        if (!isVaildInput) {
                            res.status(400).json({
                                success: false,
                                message: "Invalid inputs",
                            });
                        }
                        return [4 /*yield*/, (0, CreateUser_1.createUser)(password, LoginController_1.salt, userName, email)];
                    case 1:
                        user = _b.sent();
                        if (user) {
                            req.session.uid = user._id;
                            res.status(200).json({
                                success: true,
                                user: {
                                    name: user.userName,
                                    email: user.email,
                                    cart: user.cart,
                                    products: user.products,
                                },
                            });
                        }
                        else {
                            req.session.uid = null;
                            res.status(200).json({
                                success: false,
                                message: "Unable to create user",
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.getLogout = function (req, res) {
        console.log("Logout");
        req.session.destroy(function (err) {
            if (!err) {
                res.status(201).json({
                    success: true,
                    message: "Logout successfully",
                });
                return;
            }
            res.status(400).json({
                success: false,
                message: "Logout failed",
            });
        });
    };
    LoginController.prototype.getUser = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var uid, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        uid = req.session.uid;
                        return [4 /*yield*/, user_model_1.default.findById(uid)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            res.status(401).json({
                                success: false,
                                message: "Please Login",
                            });
                            return [2 /*return*/];
                        }
                        res.status(201).json({
                            success: true,
                            user: user,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    var LoginController_1;
    LoginController.salt = parseInt(process.env.SALT) || 10;
    __decorate([
        (0, decorators_1.post)("/login"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "postLogin", null);
    __decorate([
        (0, decorators_1.post)("/signup"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "postSignup", null);
    __decorate([
        (0, decorators_1.get)("/logout"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLogout", null);
    __decorate([
        (0, decorators_1.get)("/getuser"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "getUser", null);
    LoginController = LoginController_1 = __decorate([
        (0, decorators_1.controller)("/auth")
    ], LoginController);
    return LoginController;
}());
