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
var AppError_1 = require("../utils/AppError");
var food_model_1 = __importDefault(require("../models/food.model"));
var cart_model_1 = __importDefault(require("../models/cart.model"));
var user_model_1 = __importDefault(require("../models/user.model"));
var isAuth_1 = require("../middleware/isAuth");
// TODO  Search for a food
var OrderController = /** @class */ (function () {
    function OrderController() {
    }
    OrderController.prototype.addCart = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, foodId_1, quantity, _c, user, cart, food, isExist, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 8, , 9]);
                        _b = req.body, foodId_1 = _b.foodId, quantity = _b.quantity;
                        console.log(req.body);
                        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
                            next(new AppError_1.AppError("Login to access this resource", 404));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, Promise.all([
                                user_model_1.default.findById(req.user._id),
                                cart_model_1.default.findOne({ user: req.user._id }),
                                food_model_1.default.findById(foodId_1),
                            ])];
                    case 1:
                        _c = _d.sent(), user = _c[0], cart = _c[1], food = _c[2];
                        if (!user) {
                            next(new AppError_1.AppError("User not found", 404));
                            return [2 /*return*/];
                        }
                        if (!food) {
                            next(new AppError_1.AppError("Food not found", 404));
                            return [2 /*return*/];
                        }
                        if (!!cart) return [3 /*break*/, 4];
                        return [4 /*yield*/, cart_model_1.default.create({
                                user: req.user._id,
                                foods: [{ food: foodId_1, quantity: quantity }],
                                totalPrice: (food === null || food === void 0 ? void 0 : food.price) * quantity,
                            })];
                    case 2:
                        cart = _d.sent();
                        user.cart = cart._id;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _d.sent();
                        return [3 /*break*/, 6];
                    case 4:
                        isExist = cart.foods.findIndex(function (val) { return val.food.toString() === foodId_1; });
                        if (isExist !== -1) {
                            return [2 /*return*/, next(new AppError_1.AppError('Food already added to your cart', 500))];
                        }
                        cart.foods.push({ food: foodId_1, quantity: quantity });
                        cart.totalPrice += (food === null || food === void 0 ? void 0 : food.price) * quantity;
                        return [4 /*yield*/, cart.save()];
                    case 5:
                        _d.sent();
                        _d.label = 6;
                    case 6: return [4 /*yield*/, cart.populate('foods.food')];
                    case 7:
                        _d.sent();
                        res.status(200).json({
                            success: true,
                            cart: cart,
                            message: 'Food added to cart successfully',
                        });
                        return [3 /*break*/, 9];
                    case 8:
                        error_1 = _d.sent();
                        console.log(error_1);
                        next(new AppError_1.AppError("Something went wrong, try again later", 500));
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.clearAndAddToCart = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, foodId, quantity, food, cart, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        _b = req.body, foodId = _b.foodId, quantity = _b.quantity;
                        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
                            next(new AppError_1.AppError("Login to access this resource", 404));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, food_model_1.default.findById(foodId)];
                    case 1:
                        food = _c.sent();
                        if (!food) {
                            next(new AppError_1.AppError("Food not found", 404));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, cart_model_1.default.findOneAndUpdate({ user: req.user._id }, {
                                foods: [{ food: foodId, quantity: quantity }],
                                totalPrice: (food === null || food === void 0 ? void 0 : food.price) * quantity,
                            })];
                    case 2:
                        cart = _c.sent();
                        if (!cart) {
                            next(new AppError_1.AppError("Cart not found", 404));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, cart.populate(['foods.food', 'restaurantId'])];
                    case 3:
                        _c.sent();
                        res.status(200).json({
                            success: true,
                            cart: cart,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _c.sent();
                        next(new AppError_1.AppError("Something went wrong, try again later", 500));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.clear = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var cart, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
                            next(new AppError_1.AppError("Login to access this resource", 404));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, cart_model_1.default.findOne({
                                user: req.user._id,
                            })];
                    case 1:
                        cart = _b.sent();
                        if (!cart)
                            return [2 /*return*/, next(new AppError_1.AppError('Cart not found', 404))];
                        res.status(200).json({
                            success: true,
                            cart: cart,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _b.sent();
                        next(new AppError_1.AppError("Something went wrong, try again later", 500));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.getCart = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var cart, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
                            next(new AppError_1.AppError("Login to access this resource", 401));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, cart_model_1.default.findOne({
                                user: req.user._id,
                            })
                                .populate('foods.food')
                                .lean()];
                    case 1:
                        cart = _b.sent();
                        if (!cart || cart.foods.length == 0) {
                            return [2 /*return*/, next(new AppError_1.AppError("\uD83D\uDED2 Your cart is empty", 404))];
                        }
                        res.status(200).json({
                            success: true,
                            cart: cart,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        console.log(error_4);
                        next(new AppError_1.AppError("Something went wrong, try again later", 500));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.setQuantity = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, foodId_2, quantity, cart, index, price, error_5;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _b = req.body, foodId_2 = _b.foodId, quantity = _b.quantity;
                        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
                            next(new AppError_1.AppError("Login to access this resource", 404));
                            return [2 /*return*/];
                        }
                        if (quantity <= 0) {
                            return [2 /*return*/, next(new AppError_1.AppError("invalid quantity", 401))];
                        }
                        return [4 /*yield*/, cart_model_1.default.findOne({
                                user: req.user._id,
                            }).populate('foods.food')];
                    case 1:
                        cart = _c.sent();
                        if (!(cart === null || cart === void 0 ? void 0 : cart.populated('foods.food')))
                            return [2 /*return*/, next(new AppError_1.AppError('something went wrong', 500))];
                        if (!cart) {
                            return [2 /*return*/, next(new AppError_1.AppError("Cart not found", 400))];
                        }
                        index = cart.foods.findIndex(function (val) {
                            return val._id.toString() === foodId_2;
                        });
                        if (index == -1)
                            return [2 /*return*/, next(new AppError_1.AppError("Food doesn't exist in your cart", 404))];
                        cart.foods[index].quantity = quantity;
                        price = cart.foods.reduce(function (total, foodCart) {
                            return total + foodCart.food.price * foodCart.quantity;
                        }, 0);
                        cart.totalPrice = price;
                        return [4 /*yield*/, cart.save()];
                    case 2:
                        _c.sent();
                        res.status(200).json({
                            success: true,
                            cart: cart,
                            message: 'successfully set quantity',
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_5 = _c.sent();
                        next(new AppError_1.AppError("Something went wrong, try again later", 500));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    OrderController.prototype.delFood = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id_1, cart, deletedFoodPrice_1, deletedFoodQuantity_1, foods, error_6;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 5, , 6]);
                        id_1 = req.params.id;
                        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id)) {
                            next(new AppError_1.AppError("Login to access this resource", 404));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, cart_model_1.default.findOne({
                                user: req.user._id,
                            }).populate('foods.food')];
                    case 1:
                        cart = _b.sent();
                        if (!cart) {
                            return [2 /*return*/, next(new AppError_1.AppError("Cart not found", 400))];
                        }
                        deletedFoodQuantity_1 = 0;
                        foods = cart.foods.filter(function (val) {
                            if (val._id.toString() === id_1) {
                                deletedFoodPrice_1 = val.food.price;
                                deletedFoodQuantity_1 = val.quantity;
                            }
                            return val._id.toString() !== id_1;
                        });
                        if (!(foods.length == 0)) return [3 /*break*/, 3];
                        cart.foods = [];
                        return [4 /*yield*/, cart.save({
                                validateBeforeSave: false,
                            })];
                    case 2:
                        _b.sent();
                        res.status(200).json({
                            success: true,
                            cart: cart,
                            message: "Cart is empty",
                        });
                        return [2 /*return*/];
                    case 3:
                        // * check price and quantity exists
                        if (!deletedFoodPrice_1 || !deletedFoodQuantity_1) {
                            return [2 /*return*/, next(new AppError_1.AppError('Food not found', 404))];
                        }
                        // * sets values
                        cart.totalPrice -= deletedFoodPrice_1 * deletedFoodQuantity_1;
                        cart.foods = foods;
                        return [4 /*yield*/, cart.save({
                                validateBeforeSave: false,
                            })];
                    case 4:
                        _b.sent();
                        res.status(200).json({
                            success: true,
                            cart: cart,
                            message: "Food removed from cart",
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_6 = _b.sent();
                        next(new AppError_1.AppError("Something went wrong, try again later", 500));
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, decorators_1.post)('/add'),
        (0, bodyValidator_1.bodyValidator)('foodId', 'quantity'),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], OrderController.prototype, "addCart", null);
    __decorate([
        (0, decorators_1.post)('/clearandaddtocart'),
        (0, bodyValidator_1.bodyValidator)('foodId', 'quantity'),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], OrderController.prototype, "clearAndAddToCart", null);
    __decorate([
        (0, decorators_1.post)('/clear'),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], OrderController.prototype, "clear", null);
    __decorate([
        (0, decorators_1.get)('/get'),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], OrderController.prototype, "getCart", null);
    __decorate([
        (0, decorators_1.patch)('/setquantity'),
        (0, bodyValidator_1.bodyValidator)('foodId', 'quantity'),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], OrderController.prototype, "setQuantity", null);
    __decorate([
        (0, decorators_1.del)('/delfood/:id'),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], OrderController.prototype, "delFood", null);
    OrderController = __decorate([
        (0, decorators_1.controller)('/cart')
    ], OrderController);
    return OrderController;
}());
//? ==========================================================
//*                 Routes of Cart Controllers
//? ==========================================================
/**
 * * get - cart/get - null - returns the user cart
 * * post - cart/add - foodId , quantity, restaurantId - Create a new or update a cart
 * * patch - cart/setquantity - foodId , quantity  - set quantity to foods
 * * delete - cart/delfood/:id - null  -  delete the cart food if exist
 */
//# sourceMappingURL=CartController.js.map