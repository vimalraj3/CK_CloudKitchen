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
var decorators_1 = require("./decorators");
var bodyValidator_1 = require("./decorators/bodyValidator");
var isAuth_1 = require("../middleware/isAuth");
var AppError_1 = require("../utils/AppError");
var cart_model_1 = __importDefault(require("../models/cart.model"));
var order_model_1 = __importDefault(require("../models/order.model"));
var user_model_1 = __importDefault(require("../models/user.model"));
var razorpay_1 = __importDefault(require("razorpay"));
var crypto_1 = __importDefault(require("crypto"));
var Mailer_1 = require("../utils/Mailer");
// TODO  Search for a food
var razorpay = new razorpay_1.default({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECERT_KEY,
});
var OrderController = /** @class */ (function () {
    function OrderController() {
    }
    OrderController.prototype.order = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var cart, options, order, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(req.user, 'user ');
                        console.log('order ');
                        if (!req.user) {
                            next(new AppError_1.AppError('Login to checkout', 400));
                            return [2 /*return*/];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, cart_model_1.default.findById(req.user.cart)
                                .populate('foods.food')
                                .lean()];
                    case 2:
                        cart = _a.sent();
                        if (!cart || cart.totalPrice == 0) {
                            next(new AppError_1.AppError('Please add some foods to cart', 404));
                            return [2 /*return*/];
                        }
                        options = {
                            amount: Number(cart.totalPrice * 100),
                            currency: 'INR',
                            receipt: 'order_rcptid_11',
                        };
                        return [4 /*yield*/, razorpay.orders.create(options)];
                    case 3:
                        order = _a.sent();
                        res.status(200).json({
                            success: true,
                            order: order,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        res.status(500).json({
                            success: false,
                            message: 'Something went wrong',
                        });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.checkout = function (req, res, next) {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function () {
            var addressId, amount, _e, razorpay_payment_id, razorpay_order_id, razorpay_signature, hmac, generatedSignature, cartquery, userquery, _f, cart, user, foods, order, links_1, mail, userQueryPushOrder, cartQueryDelete, error_1;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 5, , 6]);
                        addressId = req.body.addressId;
                        console.log(addressId, 'addressId', 
                        // req.body.response.razorpay_order_id,
                        // req.body.response.razorpay_payment_id,
                        // req.body.response.razorpay_order_id,
                        // req.body.id.amount
                        req.body);
                        amount = req.body.amount / 100;
                        _e = req.body.response, razorpay_payment_id = _e.razorpay_payment_id, razorpay_order_id = _e.razorpay_order_id, razorpay_signature = _e.razorpay_signature;
                        console.log(addressId, 'addressId', razorpay_order_id, razorpay_payment_id, razorpay_order_id, amount);
                        hmac = crypto_1.default.createHmac('sha256', process.env.RAZORPAY_SECERT_KEY);
                        hmac.update(razorpay_order_id + '|' + razorpay_payment_id);
                        generatedSignature = hmac.digest('hex');
                        if (generatedSignature !== razorpay_signature) {
                            next(new AppError_1.AppError("Something went wrong, try again later", 500));
                            return [2 /*return*/];
                        }
                        if (!addressId) {
                            next(new AppError_1.AppError("Please provide an address", 400));
                            return [2 /*return*/];
                        }
                        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.cart)) {
                            console.log('no cart', (_b = req.user) === null || _b === void 0 ? void 0 : _b.cart);
                            next(new AppError_1.AppError("Login to access this resource", 400));
                            return [2 /*return*/];
                        }
                        cartquery = cart_model_1.default.findById(req.user.cart)
                            .populate('foods.food')
                            .lean();
                        userquery = user_model_1.default.findById(req.user._id).select('+orders +cart');
                        return [4 /*yield*/, Promise.all([cartquery, userquery])];
                    case 1:
                        _f = _g.sent(), cart = _f[0], user = _f[1];
                        if (!cart || !user) {
                            next(new AppError_1.AppError("Please login to checkout", 404));
                            return [2 /*return*/];
                        }
                        if (cart.totalPrice != amount) {
                            next(new AppError_1.AppError('Price mismatch', 501));
                            return [2 /*return*/];
                        }
                        foods = cart.foods;
                        return [4 /*yield*/, order_model_1.default.create({
                                user: (_c = req.user) === null || _c === void 0 ? void 0 : _c._id,
                                foods: foods,
                                totalPrice: cart.totalPrice,
                                address: addressId,
                            })];
                    case 2:
                        order = _g.sent();
                        links_1 = '';
                        foods.map(function (_a, i) {
                            var _b;
                            var food = _a.food;
                            links_1 += "".concat(i + 1, ". ").concat(process.env.CLI_URL, "/review/").concat((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, "/").concat(food._id, " \n");
                        });
                        console.log(links_1, 'links');
                        return [4 /*yield*/, (0, Mailer_1.sendEmail)(req.user.email, 'Request for food review', Mailer_1.EmailTemplate.review, {
                                userName: user.userName,
                                link: links_1,
                            })];
                    case 3:
                        mail = _g.sent();
                        (_d = user.orders) === null || _d === void 0 ? void 0 : _d.push(order.id);
                        user.cart = undefined;
                        userQueryPushOrder = user.save({
                            validateBeforeSave: false,
                        });
                        cartQueryDelete = cart_model_1.default.findByIdAndDelete(req.user.cart);
                        return [4 /*yield*/, Promise.all([userQueryPushOrder, cartQueryDelete])];
                    case 4:
                        _g.sent();
                        res.status(200).json({
                            success: true,
                            orders: order,
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _g.sent();
                        console.log(error_1);
                        next(new AppError_1.AppError("Something went wrong, try again later", 500));
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.getMyOrders = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var orders, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, order_model_1.default.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id })
                                .populate('foods.food')
                                .lean()];
                    case 1:
                        orders = _b.sent();
                        res.status(200).json({
                            success: true,
                            orders: orders,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        next(new AppError_1.AppError("Something went wrong, try again later", 500));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, decorators_1.post)('/request'),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], OrderController.prototype, "order", null);
    __decorate([
        (0, decorators_1.post)('/checkout'),
        (0, bodyValidator_1.bodyValidator)('addressId'),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], OrderController.prototype, "checkout", null);
    __decorate([
        (0, decorators_1.get)('/myorders'),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], OrderController.prototype, "getMyOrders", null);
    OrderController = __decorate([
        (0, decorators_1.controller)('/order')
    ], OrderController);
    return OrderController;
}());
//? ==========================================================
//*                 Routes of Order Controllers
//? ==========================================================
/**
 * * post - order/checkout - Create a new order and set paid to it
 */
//# sourceMappingURL=OrderController.js.map