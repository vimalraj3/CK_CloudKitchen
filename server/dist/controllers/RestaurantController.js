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
var decorators_1 = require("./decorators");
var AppError_1 = require("../utils/AppError");
var Multer_1 = require("../utils/Multer");
var Mailer_1 = require("../utils/Mailer");
var isAuth_1 = require("../middleware/isAuth");
var user_model_1 = __importDefault(require("../models/user.model"));
var mongoose_1 = require("mongoose");
var Cloudinary_1 = require("../utils/Cloudinary");
var encoder_1 = require("../utils/encoder");
var StringToDate_1 = require("../utils/StringToDate");
var reviews_model_1 = __importDefault(require("../models/reviews.model"));
/**
 * @class RestaurantController
 * @description RestaurantController class is responsible for handling all the requests related to Restaurant
 */
var RestaurantController = /** @class */ (function () {
    function RestaurantController() {
    }
    RestaurantController.prototype.addRestaurant = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var imgPath, body, ReqUser, restaurantName, restaurantDescription, restaurantAddress, restaurantCity, restaurantState, restaurantZip, restaurantPhone, open_1, close_1, restaurantRegion, priceRange, requiredFields, _i, requiredFields_1, field, secure_url, openTime, closeTime, restaurant, userRestaurantIdLinkRequest, _b, user, restaurantFiltered, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        imgPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                        body = req.body;
                        imgPath = req.file && req.file.path;
                        if (!imgPath || !body) {
                            next(new AppError_1.AppError('Please upload an image', 400));
                            return [2 /*return*/];
                        }
                        if (!req.user) {
                            return [2 /*return*/, next(new AppError_1.AppError('Please login to add a restaurant', 400))];
                        }
                        ReqUser = req.user;
                        if (ReqUser.restaurant) {
                            return [2 /*return*/, next(new AppError_1.AppError('You already list a restaurant', 404))];
                        }
                        restaurantName = body.restaurantName, restaurantDescription = body.restaurantDescription, restaurantAddress = body.restaurantAddress, restaurantCity = body.restaurantCity, restaurantState = body.restaurantState, restaurantZip = body.restaurantZip, restaurantPhone = body.restaurantPhone, open_1 = body.open, close_1 = body.close, restaurantRegion = body.restaurantRegion, priceRange = body.priceRange;
                        requiredFields = [
                            'restaurantName',
                            'restaurantDescription',
                            'restaurantAddress',
                            'restaurantCity',
                            'restaurantState',
                            'restaurantZip',
                            'restaurantPhone',
                            'open',
                            'close',
                            'restaurantRegion',
                            'priceRange',
                        ];
                        for (_i = 0, requiredFields_1 = requiredFields; _i < requiredFields_1.length; _i++) {
                            field = requiredFields_1[_i];
                            if (!(field in body)) {
                                return [2 /*return*/, next(new AppError_1.AppError("Field ".concat(field, " was missing"), 400))];
                            }
                        }
                        return [4 /*yield*/, (0, Cloudinary_1.uploadSingleImageCloudinary)(imgPath, next)];
                    case 1:
                        secure_url = _c.sent();
                        if (!secure_url)
                            return [2 /*return*/, next(new AppError_1.AppError('Something went wrong', 500))];
                        openTime = (0, StringToDate_1.stringToDate)(open_1);
                        closeTime = (0, StringToDate_1.stringToDate)(close_1);
                        return [4 /*yield*/, Restaurant.create({
                                user: ReqUser === null || ReqUser === void 0 ? void 0 : ReqUser._id.toString(),
                                restaurantName: restaurantName,
                                restaurantDescription: restaurantDescription,
                                restaurantImage: [secure_url],
                                restaurantAddress: restaurantAddress,
                                restaurantCity: restaurantCity,
                                restaurantState: restaurantState,
                                restaurantZip: restaurantZip,
                                restaurantPhone: restaurantPhone,
                                restaurantRegion: restaurantRegion,
                                restaurantHours: { open: openTime, close: closeTime },
                                verifyToken: (0, encoder_1.encodedEmail)(ReqUser === null || ReqUser === void 0 ? void 0 : ReqUser.email.toString()),
                                verified: false,
                                priceRange: priceRange,
                            })];
                    case 2:
                        restaurant = _c.sent();
                        (0, Mailer_1.sendEmail)(req.user.email, 'Verify your restaurant', Mailer_1.EmailTemplate.verification, {
                            userName: req.user.userName,
                            link: "".concat(process.env.CLI_URL, "/restaurant/verify/").concat(restaurant.verifyToken),
                        });
                        return [4 /*yield*/, user_model_1.default.findByIdAndUpdate(ReqUser._id, { restaurant: restaurant._id, role: 'admin' }, { runValidators: false })];
                    case 3:
                        userRestaurantIdLinkRequest = _c.sent();
                        _b = restaurant.toObject(), user = _b.user, restaurantFiltered = __rest(_b, ["user"]);
                        res.status(200).json({
                            message: 'Restaurant added successfully',
                            restaurant: restaurantFiltered,
                            success: true,
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _c.sent();
                        next(new AppError_1.AppError("Something went wrong", 500));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    RestaurantController.prototype.verifyRestaurant = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var token, email, user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        token = req.params.token;
                        email = (0, encoder_1.decodedEmail)(token);
                        return [4 /*yield*/, user_model_1.default.findOne({
                                email: email,
                            }).populate('restaurant')];
                    case 1:
                        user = _a.sent();
                        if (!user ||
                            !user.restaurant ||
                            user.restaurant instanceof mongoose_1.Types.ObjectId) {
                            return [2 /*return*/, next(new AppError_1.AppError("User not found", 400))];
                        }
                        user.restaurant.verified = true;
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        res.status(200).json({
                            success: true,
                            message: "verified successfully",
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_2 = _a.sent();
                        return [2 /*return*/, next(new AppError_1.AppError("Something went wrong", 500))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RestaurantController.prototype.getAllRestaurants = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, rating, priceRange, sortOption, searchQuery, filter, _b, minPrice, maxPrice, min, max, restaurantsQuery, restaurants, error_3;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _a = req.query, rating = _a.rating, priceRange = _a.priceRange, sortOption = _a.sortOption, searchQuery = _a.searchQuery;
                        filter = {};
                        if (rating) {
                            filter.rating = { $gte: parseFloat(rating) }; // Convert rating to a number and filter products with a rating greater than or equal to the specified value
                        }
                        if (priceRange) {
                            _b = priceRange.split('-'), minPrice = _b[0], maxPrice = _b[1];
                            min = parseFloat(minPrice);
                            max = parseFloat(maxPrice);
                            if (min == 0) {
                                filter.priceRange = {
                                    $lte: max,
                                };
                            }
                            else if (max == 0) {
                                filter.priceRange = {
                                    $gte: min,
                                };
                            }
                            else {
                                filter.priceRange = {
                                    $gte: min,
                                    $lte: max,
                                };
                            }
                        }
                        restaurantsQuery = Restaurant.find({});
                        if (searchQuery) {
                            restaurantsQuery = restaurantsQuery.find({
                                restaurantName: { $regex: "".concat(searchQuery), $options: 'i' },
                            });
                        }
                        if (filter) {
                            restaurantsQuery = restaurantsQuery.find(filter);
                        }
                        if (sortOption === 'price-low-to-high') {
                            restaurantsQuery = restaurantsQuery.sort({ price: 1 }); // Sort by ascending price
                        }
                        else if (sortOption === 'price-high-to-low') {
                            restaurantsQuery = restaurantsQuery.sort({ price: -1 }); // Sort by descending price
                        }
                        else if (sortOption === 'rating') {
                            restaurantsQuery = restaurantsQuery.sort({ rating: 1 }); // Sort by ascending rating
                        }
                        return [4 /*yield*/, restaurantsQuery.lean()];
                    case 1:
                        restaurants = _c.sent();
                        if (!restaurants)
                            return [2 /*return*/, next(new AppError_1.AppError('No restaurants found', 404))];
                        res.status(200).json({
                            success: true,
                            restaurants: restaurants,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _c.sent();
                        return [2 /*return*/, next(new AppError_1.AppError("Something went wrong", 500))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RestaurantController.prototype.getRestaurantById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, _a, reviews, data, foods, user, verifyToken, restaurant, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, Promise.all([
                                reviews_model_1.default.findOne({ restaurant: id }).populate('reviews.user').lean(),
                                Restaurant.findById(id).populate(['foods']).lean(),
                            ])];
                    case 1:
                        _a = _b.sent(), reviews = _a[0], data = _a[1];
                        if (!data || !reviews)
                            return [2 /*return*/, next(new AppError_1.AppError('No restaurant found', 404))];
                        foods = data.foods, user = data.user, verifyToken = data.verifyToken, restaurant = __rest(data, ["foods", "user", "verifyToken"]);
                        res.status(200).json({
                            success: true,
                            restaurant: restaurant,
                            food: foods,
                            reviews: reviews,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _b.sent();
                        return [2 /*return*/, next(new AppError_1.AppError("Something went wrong", 500))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RestaurantController.prototype.getRestaurantAdminById = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userId, data, user, restaurant, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
                        return [4 /*yield*/, Restaurant.findOne({ user: userId })
                                .populate('orders')
                                .lean()];
                    case 1:
                        data = _b.sent();
                        if (!data)
                            return [2 /*return*/, next(new AppError_1.AppError('No restaurant found', 404))];
                        user = data.user, restaurant = __rest(data, ["user"]);
                        res.status(200).json({
                            success: true,
                            restaurant: restaurant,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _b.sent();
                        return [2 /*return*/, next(new AppError_1.AppError("Something went wrong", 500))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RestaurantController.prototype.updateRestaurantById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var update, data, user, restaurant, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        update = req.body.update;
                        if (!update)
                            return [2 /*return*/, next(new AppError_1.AppError('Please provide update object', 400))];
                        if (!req.user)
                            return [2 /*return*/, next(new AppError_1.AppError("Login to access this resource", 401))];
                        return [4 /*yield*/, Restaurant.findOneAndUpdate({ user: req.user._id }, update, {
                                new: true,
                            }).lean()];
                    case 1:
                        data = _a.sent();
                        if (!data)
                            return [2 /*return*/, next(new AppError_1.AppError("No Restaurant found", 404))];
                        user = data.user, restaurant = __rest(data, ["user"]);
                        res.status(200).json({ success: true, restaurant: restaurant });
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        return [2 /*return*/, next(new AppError_1.AppError("Something went wrong", 500))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RestaurantController.prototype.deleteRestaurantById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, restaurant, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        if (!req.user)
                            return [2 /*return*/, next(new AppError_1.AppError("Login to access this resource", 401))];
                        return [4 /*yield*/, Restaurant.findOneAndDelete({
                                _id: id,
                                user: req.user._id,
                            }).lean()];
                    case 1:
                        restaurant = _a.sent();
                        return [4 /*yield*/, user_model_1.default.findByIdAndUpdate(req.user._id, { restaurant: null })];
                    case 2:
                        _a.sent();
                        if (!restaurant)
                            return [2 /*return*/, next(new AppError_1.AppError("No Restaurant found", 404))];
                        res.status(200).json({ success: true, message: 'successfully deleted' });
                        return [3 /*break*/, 4];
                    case 3:
                        error_7 = _a.sent();
                        return [2 /*return*/, next(new AppError_1.AppError("Something went wrong", 500))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, decorators_1.post)('/new'),
        (0, decorators_1.use)((0, Multer_1.uploaderSingle)('restaurantImage')),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], RestaurantController.prototype, "addRestaurant", null);
    __decorate([
        (0, decorators_1.post)('/verify/:token'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], RestaurantController.prototype, "verifyRestaurant", null);
    __decorate([
        (0, decorators_1.get)('/all'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], RestaurantController.prototype, "getAllRestaurants", null);
    __decorate([
        (0, decorators_1.get)('/:id'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], RestaurantController.prototype, "getRestaurantById", null);
    __decorate([
        (0, decorators_1.get)('/admin/byuserid'),
        (0, decorators_1.use)(isAuth_1.isAdmin),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], RestaurantController.prototype, "getRestaurantAdminById", null);
    __decorate([
        (0, decorators_1.patch)('/admin/update'),
        (0, decorators_1.use)(isAuth_1.isAdmin),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], RestaurantController.prototype, "updateRestaurantById", null);
    __decorate([
        (0, decorators_1.del)('/:id'),
        (0, decorators_1.use)(isAuth_1.isAdmin),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], RestaurantController.prototype, "deleteRestaurantById", null);
    RestaurantController = __decorate([
        (0, decorators_1.controller)('/restaurant')
    ], RestaurantController);
    return RestaurantController;
}());
//? ==========================================================
//*                 Routes of Restaurant Controllers
//? ==========================================================
/**
 * * post - restaurant/new - Create a new restaurant
 * *  get - restaurant/:id - info of particular restaurant
 * *  patch - restaurant/:id -  update a particular restaurant
 * *  delete - restaurant/:id -  delete a particular restaurant
 * *  get - restaurant/admin/:id - info of particular restaurant for admin dashboard
 * *  get - restaurant/all -  get all restaurant info
 */
//# sourceMappingURL=RestaurantController.js.map