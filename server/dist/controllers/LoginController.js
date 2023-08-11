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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
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
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), './src/.env') });
// TODO testing login signup | Products | multithearding
var AppError_1 = require("../utils/AppError");
var bodyValidator_1 = require("./decorators/bodyValidator");
var Mailer_1 = require("../utils/Mailer");
var encoder_1 = require("../utils/encoder");
var isAuth_1 = require("../middleware/isAuth");
var decorators_2 = require("./decorators");
var address_model_1 = __importDefault(require("../models/address.model"));
var LoginController = /** @class */ (function () {
    function LoginController() {
    }
    LoginController_1 = LoginController;
    // ? api->/auth/login | method->post | find user by email -> check password match -> if user send user, not user send error message
    LoginController.prototype.postLogin = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user_1, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, email = _a.email, password = _a.password;
                        return [4 /*yield*/, user_model_1.default.findOne({
                                email: email,
                            }).select('+password')
                            // .lean()
                        ];
                    case 1:
                        user_1 = _b.sent();
                        // .lean()
                        if (!user_1) {
                            res.status(404).json({
                                success: false,
                                message: "User not found, please sign in",
                            });
                            return [2 /*return*/];
                        }
                        if (user_1.password) {
                            bcrypt_1.default.compare(password, user_1.password).then(function (isMatch) {
                                if (!isMatch) {
                                    next(new AppError_1.AppError("Invalid email or password", 401));
                                    return;
                                }
                                req.session.uid = user_1._id.toString();
                                delete user_1['password'];
                                res.status(200).json({
                                    success: true,
                                    user: user_1,
                                });
                                return;
                            });
                        }
                        else {
                            next(new AppError_1.AppError("Invalid email or password", 401));
                            return [2 /*return*/];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        next(new AppError_1.AppError("Something went wrong", 500));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.postSignup = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, userExist, sent, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        email = req.body.email;
                        return [4 /*yield*/, user_model_1.default.findOne({ email: email }).lean()];
                    case 1:
                        userExist = _a.sent();
                        if (userExist) {
                            next(new AppError_1.AppError("User already exist", 400));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, (0, Mailer_1.sendEmail)(email, 'CK, Password Reset', Mailer_1.EmailTemplate.resetPassword, {
                                link: "".concat(process.env.CLIENT_URL, "/signup/verify/").concat((0, encoder_1.encodedEmail)(email)),
                                userName: 'Valued user',
                            })];
                    case 2:
                        sent = _a.sent();
                        if (sent) {
                            res.status(201).json({
                                success: true,
                                message: "Email sent to ".concat(email, " for verification."),
                            });
                            return [2 /*return*/];
                        }
                        next(new AppError_1.AppError("Something went wrong", 500));
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        next(new AppError_1.AppError("Unable to create user", 500));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.postSetPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var password, token, email, userName, user;
            return __generator(this, function (_a) {
                try {
                    password = req.body.password;
                    token = req.params.token;
                    email = (0, encoder_1.decodedEmail)(token);
                    userName = email.split('@')[0];
                    user = (0, CreateUser_1.createUser)(password, LoginController_1.salt, userName, email);
                    if (!user) {
                        return [2 /*return*/, next(new AppError_1.AppError("Unable to create a user", 500))];
                    }
                    res.status(200).json({
                        success: true,
                        user: user,
                    });
                }
                catch (error) {
                    next(new AppError_1.AppError("Unable to create user", 500));
                }
                return [2 /*return*/];
            });
        });
    };
    LoginController.prototype.postForgotPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, userExist, sent, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        email = req.body.email;
                        return [4 /*yield*/, user_model_1.default.findOne({ email: email }).lean()];
                    case 1:
                        userExist = _a.sent();
                        if (!userExist) {
                            next(new AppError_1.AppError("User not found", 404));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, (0, Mailer_1.sendEmail)(email, 'CK, Password Reset', Mailer_1.EmailTemplate.resetPassword, {
                                link: "".concat(process.env.CLI_URL, "/resetpassword/").concat((0, encoder_1.encodedEmail)(email)),
                                userName: userExist.userName,
                            })];
                    case 2:
                        sent = _a.sent();
                        if (sent) {
                            res.status(201).json({
                                success: true,
                                message: "Email sent to ".concat(email, " for password reset."),
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        next(new AppError_1.AppError("Something went wrong", 500));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.postResetPassword = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var password, token, email, user, hashPassword, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        password = req.body.password;
                        token = req.params.token;
                        email = (0, encoder_1.decodedEmail)(token);
                        return [4 /*yield*/, user_model_1.default.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            next(new AppError_1.AppError("User not found", 404));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(password, LoginController_1.salt)];
                    case 2:
                        hashPassword = _a.sent();
                        user.password = hashPassword;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        res.status(201).json({
                            success: true,
                            user: user,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        next(new AppError_1.AppError("Something went wrong", 500));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.getLogout = function (req, res) {
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
    LoginController.prototype.getUser = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var session, id, user, _id, __v, createdAt, filteredUser, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        session = req.session;
                        id = (session === null || session === void 0 ? void 0 : session.uid) || ((_a = session.passport) === null || _a === void 0 ? void 0 : _a.user);
                        if (!id) {
                            next(new AppError_1.AppError("welcome back, Please login", 400));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, user_model_1.default.findById(id).lean()];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            res.status(403).json({
                                success: false,
                                message: "user not found",
                            });
                            return [2 /*return*/];
                        }
                        _id = user._id, __v = user.__v, createdAt = user.createdAt, filteredUser = __rest(user, ["_id", "__v", "createdAt"]);
                        res.status(201).json({
                            success: true,
                            user: filteredUser,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _b.sent();
                        next(new AppError_1.AppError('Something went wrong', 500));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.verifyEmail = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, email;
            return __generator(this, function (_a) {
                try {
                    token = req.params.token;
                    email = (0, encoder_1.encodedEmail)(token);
                    if (!email) {
                        next(new AppError_1.AppError("Invalid token", 401));
                        return [2 /*return*/];
                    }
                    user_model_1.default.findOneAndUpdate({ email: email }, { verified: true }, { runValidators: false });
                    res.status(200).json({
                        success: true,
                        message: "Email verified successfully.",
                    });
                }
                catch (error) { }
                return [2 /*return*/];
            });
        });
    };
    LoginController.prototype.postAddress = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, houseNo_1, addressName_1, streetName_1, city_1, state_1, zipCode_1, area_1, user, givenAddress, isAddressExist, addressFound_1, filter, update, options, updatedUserAddress, newUserAddress, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _a = req.body, houseNo_1 = _a.houseNo, addressName_1 = _a.addressName, streetName_1 = _a.streetName, city_1 = _a.city, state_1 = _a.state, zipCode_1 = _a.zipCode, area_1 = _a.area;
                        user = req.user;
                        givenAddress = {
                            houseNo: houseNo_1,
                            addressName: addressName_1,
                            streetName: streetName_1,
                            city: city_1,
                            state: state_1,
                            zipCode: zipCode_1,
                            area: area_1,
                        };
                        return [4 /*yield*/, address_model_1.default.findOne({
                                user: user._id,
                            })];
                    case 1:
                        isAddressExist = _b.sent();
                        if (!isAddressExist) return [3 /*break*/, 4];
                        addressFound_1 = false;
                        isAddressExist.address.forEach(function (addr, i) {
                            if (houseNo_1 == addr.houseNo &&
                                addressName_1 == addr.addressName &&
                                streetName_1 == addr.streetName &&
                                city_1 == addr.city &&
                                state_1 == addr.state &&
                                zipCode_1 == addr.zipCode &&
                                area_1 == addr.area) {
                                addressFound_1 = true;
                            }
                        });
                        if (!addressFound_1) return [3 /*break*/, 2];
                        // * return already address was added in user address
                        return [2 /*return*/, res.status(400).json({
                                success: false,
                                message: 'Address exists',
                                address: isAddressExist.address,
                            })];
                    case 2:
                        filter = { user: user._id };
                        update = { $push: { address: givenAddress } };
                        options = { new: true, upsert: true };
                        return [4 /*yield*/, address_model_1.default.findOneAndUpdate(filter, update, options)];
                    case 3:
                        updatedUserAddress = _b.sent();
                        if (!updatedUserAddress)
                            return [2 /*return*/, next(new AppError_1.AppError('Something went wrong ', 500))];
                        return [2 /*return*/, res.status(200).json({
                                success: true,
                                address: updatedUserAddress.address,
                            })];
                    case 4: return [4 /*yield*/, address_model_1.default.create({
                            user: user._id,
                            address: [givenAddress],
                        })];
                    case 5:
                        newUserAddress = _b.sent();
                        res.status(200).json({
                            success: true,
                            address: newUserAddress.address,
                        });
                        return [3 /*break*/, 7];
                    case 6:
                        error_6 = _b.sent();
                        next(new AppError_1.AppError("Something went wrong", 500));
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.getAddress = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userId, address, error_7;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                        return [4 /*yield*/, address_model_1.default.findOne({ user: userId }).lean()];
                    case 1:
                        address = _b.sent();
                        if (!address) {
                            return [2 /*return*/, res.status(200).json({
                                    success: false,
                                    message: 'Please add address',
                                    address: [],
                                })];
                        }
                        res.status(200).json({
                            success: true,
                            address: address.address,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _b.sent();
                        next(new AppError_1.AppError('Something went wrong', 500));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.delAddress = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userId, userAddress, addressId_1, newAddress, error_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                        return [4 /*yield*/, address_model_1.default.findById(userId)];
                    case 1:
                        userAddress = _b.sent();
                        if (!userAddress) {
                            return [2 /*return*/, next(new AppError_1.AppError('Address not found', 404))];
                        }
                        addressId_1 = req.params.id;
                        newAddress = userAddress.address.filter(function (addr) { return addr._id && addr._id.toString() != addressId_1; });
                        userAddress.address = newAddress;
                        return [4 /*yield*/, userAddress.save()];
                    case 2:
                        _b.sent();
                        res.status(200).json({
                            success: true,
                            address: userAddress.address,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_8 = _b.sent();
                        next(new AppError_1.AppError('Something went wrong', 500));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    LoginController.prototype.updateAddress = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userId, update_1, addressId_2, userAddress, updatedAddress, error_9;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                        update_1 = req.body.update;
                        addressId_2 = req.params.id;
                        return [4 /*yield*/, address_model_1.default.findOne({ user: userId })];
                    case 1:
                        userAddress = _b.sent();
                        if (!userAddress) {
                            return [2 /*return*/, next(new AppError_1.AppError('Address not found', 404))];
                        }
                        updatedAddress = userAddress.address.map(function (addr) {
                            var _a;
                            if (addr && ((_a = addr._id) === null || _a === void 0 ? void 0 : _a.toString()) === addressId_2) {
                                addr = update_1;
                            }
                            return addr;
                        });
                        userAddress.address = updatedAddress;
                        return [4 /*yield*/, userAddress.save({ validateBeforeSave: false })];
                    case 2:
                        _b.sent();
                        res.status(200).json({
                            success: true,
                            address: userAddress.address,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_9 = _b.sent();
                        next(new AppError_1.AppError('Something went wrong', 500));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var LoginController_1;
    LoginController.salt = parseInt(process.env.SALT) || 10;
    __decorate([
        (0, decorators_1.post)('/login'),
        (0, bodyValidator_1.bodyValidator)('email', 'password'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "postLogin", null);
    __decorate([
        (0, decorators_1.post)('/signup'),
        (0, bodyValidator_1.bodyValidator)('email'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "postSignup", null);
    __decorate([
        (0, decorators_1.post)('/setpassword/:token'),
        (0, bodyValidator_1.bodyValidator)('password'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "postSetPassword", null);
    __decorate([
        (0, decorators_1.post)('/forgotpassword'),
        (0, bodyValidator_1.bodyValidator)('email'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "postForgotPassword", null);
    __decorate([
        (0, decorators_1.patch)('/resetpassword/:token'),
        (0, bodyValidator_1.bodyValidator)('password'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "postResetPassword", null);
    __decorate([
        (0, decorators_1.post)('/logout'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", void 0)
    ], LoginController.prototype, "getLogout", null);
    __decorate([
        (0, decorators_1.get)('/getuser'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "getUser", null);
    __decorate([
        (0, decorators_1.post)('/verify/:token'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "verifyEmail", null);
    __decorate([
        (0, decorators_1.post)('/address'),
        (0, bodyValidator_1.bodyValidator)('houseNo', 'addressName', 'streetName', 'city', 'state', 'zipCode', 'area'),
        (0, decorators_2.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "postAddress", null);
    __decorate([
        (0, decorators_1.get)('/address'),
        (0, decorators_2.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "getAddress", null);
    __decorate([
        (0, decorators_1.del)('/address/:id'),
        (0, decorators_2.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "delAddress", null);
    __decorate([
        (0, decorators_1.patch)('/address/:id'),
        (0, decorators_2.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], LoginController.prototype, "updateAddress", null);
    LoginController = LoginController_1 = __decorate([
        (0, decorators_1.controller)('/auth')
    ], LoginController);
    return LoginController;
}());
// * TODO test address routes
//# sourceMappingURL=LoginController.js.map