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
var Cloudinary_1 = require("../utils/Cloudinary");
var bodyValidator_1 = require("./decorators/bodyValidator");
var isAuth_1 = require("../middleware/isAuth");
var AppError_1 = require("../utils/AppError");
var Multer_1 = require("../utils/Multer");
var food_model_1 = __importDefault(require("../models/food.model"));
var StringToDate_1 = require("../utils/StringToDate");
// TODO  Search for a food
var FoodController = /** @class */ (function () {
    function FoodController() {
    }
    FoodController.prototype.addProduct = function (req, res, next) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, price, description, open_1, close_1, title, category, file, filePath, image, openTiming, closeTiming, foodData, food, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 3, , 4]);
                        _c = req.body, price = _c.price, description = _c.description, open_1 = _c.open, close_1 = _c.close, title = _c.title, category = _c.category;
                        file = req.file;
                        filePath = file.path;
                        if (!filePath)
                            return [2 /*return*/, next(new AppError_1.AppError('Please upload an image', 400))
                                // ? upload the images to cloudinary
                            ];
                        return [4 /*yield*/, (0, Cloudinary_1.uploadSingleImageCloudinary)(filePath, next)];
                    case 1:
                        image = _d.sent();
                        if (!image)
                            return [2 /*return*/, next(new AppError_1.AppError('Unable to upload image', 400))];
                        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a._id))
                            return [2 /*return*/, next(new AppError_1.AppError('Please login to add a product', 400))];
                        openTiming = (0, StringToDate_1.stringToDate)(open_1);
                        closeTiming = (0, StringToDate_1.stringToDate)(close_1);
                        foodData = {
                            user: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id,
                            title: title,
                            price: price,
                            time: { open: openTiming, close: closeTiming },
                            image: [image],
                            category: category,
                            description: description,
                        };
                        return [4 /*yield*/, food_model_1.default.create(foodData)];
                    case 2:
                        food = _d.sent();
                        if (!food)
                            return [2 /*return*/, next(new AppError_1.AppError('Unable to add Product', 500))];
                        res.status(200).json({
                            success: true,
                            food: food,
                        });
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _d.sent();
                        next(new AppError_1.AppError("Unable to add Product", 500));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FoodController.prototype.getAllRestaurants = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, rating, price, sortOption, searchQuery, filter, _b, minPrice, maxPrice, min, max, foodsQuery, foods, error_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, , 3]);
                        _a = req.query, rating = _a.rating, price = _a.price, sortOption = _a.sortOption, searchQuery = _a.searchQuery;
                        filter = {};
                        if (rating) {
                            filter.rating = { $gte: parseFloat(rating) };
                        }
                        if (price) {
                            _b = price.split('-'), minPrice = _b[0], maxPrice = _b[1];
                            min = parseFloat(minPrice);
                            max = parseFloat(maxPrice);
                            if (min == 0) {
                                filter.price = {
                                    $lte: max,
                                };
                            }
                            else if (max == 0) {
                                filter.price = {
                                    $gte: min,
                                };
                            }
                            else {
                                filter.price = {
                                    $gte: min,
                                    $lte: max,
                                };
                            }
                        }
                        foodsQuery = food_model_1.default.find({});
                        if (searchQuery) {
                            foodsQuery = foodsQuery.find({
                                title: { $regex: "".concat(searchQuery), $options: 'i' },
                            });
                        }
                        if (filter) {
                            foodsQuery = foodsQuery.find(filter);
                        }
                        if (sortOption === 'price-low-to-high') {
                            foodsQuery = foodsQuery.sort({ price: 1 }); // Sort by ascending price
                        }
                        else if (sortOption === 'price-high-to-low') {
                            foodsQuery = foodsQuery.sort({ price: -1 }); // Sort by descending price
                        }
                        else if (sortOption === 'rating') {
                            foodsQuery = foodsQuery.sort({ rating: 1 }); // Sort by ascending rating
                        }
                        return [4 /*yield*/, foodsQuery.lean()];
                    case 1:
                        foods = _c.sent();
                        if (!foods)
                            return [2 /*return*/, next(new AppError_1.AppError('No foods found', 404))];
                        res.status(200).json({
                            success: true,
                            foods: foods,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _c.sent();
                        return [2 /*return*/, next(new AppError_1.AppError("Something went wrong", 500))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // * get food by id
    FoodController.prototype.getProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var food, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!req.params.id) {
                            next(new AppError_1.AppError("Please provide a food id", 400));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, food_model_1.default.findById(req.params.id)
                                .populate({
                                path: 'reviews',
                                populate: {
                                    path: 'user',
                                    select: 'userName avatar',
                                },
                            })
                                .lean()];
                    case 1:
                        food = _a.sent();
                        if (!food) {
                            next(new AppError_1.AppError("Food not found", 404));
                            return [2 /*return*/];
                        }
                        res.status(200).json({
                            success: true,
                            food: food,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        return [2 /*return*/, next(new AppError_1.AppError("Something went wrong", 500))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // * delete food by id
    FoodController.prototype.deleteProduct = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, food, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, food_model_1.default.findOneAndUpdate({
                                _id: id,
                                user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
                            })];
                    case 1:
                        food = _b.sent();
                        if (!food)
                            return [2 /*return*/, next(new AppError_1.AppError("Unable to Delete", 500))];
                        return [2 /*return*/, res.status(200).json({
                                success: true,
                                message: "Food: ".concat(food === null || food === void 0 ? void 0 : food.title, " was deleted successfully"),
                            })];
                    case 2:
                        error_4 = _b.sent();
                        return [2 /*return*/, next(new AppError_1.AppError("Something went wrong", 500))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // * update food by id
    FoodController.prototype.updateProduct = function (req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, update, food, error_5;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        update = req.body.update;
                        return [4 /*yield*/, food_model_1.default.findOneAndUpdate({ _id: id, user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }, update)];
                    case 1:
                        food = _b.sent();
                        if (!food)
                            return [2 /*return*/, next(new AppError_1.AppError("Unable to update product", 500))];
                        return [2 /*return*/, res.status(200).json({
                                success: true,
                                message: "Product ".concat(food === null || food === void 0 ? void 0 : food.title, " was updated successfully"),
                                food: food,
                            })];
                    case 2:
                        error_5 = _b.sent();
                        return [2 /*return*/, next(new AppError_1.AppError("Something went wrong, try again later", 500))];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, decorators_1.post)('/new'),
        (0, bodyValidator_1.bodyValidator)('price', 'open', 'close', 'title', 'category', 'description'),
        (0, decorators_1.use)((0, Multer_1.uploaderSingle)('image')),
        (0, decorators_1.use)(isAuth_1.isAdmin),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], FoodController.prototype, "addProduct", null);
    __decorate([
        (0, decorators_1.get)('/all'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], FoodController.prototype, "getAllRestaurants", null);
    __decorate([
        (0, decorators_1.get)('/:id'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], FoodController.prototype, "getProduct", null);
    __decorate([
        (0, decorators_1.del)('/:id'),
        (0, decorators_1.use)(isAuth_1.isAdmin),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], FoodController.prototype, "deleteProduct", null);
    __decorate([
        (0, decorators_1.patch)('/:id'),
        (0, bodyValidator_1.bodyValidator)('update'),
        (0, decorators_1.use)(isAuth_1.isAdmin),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], FoodController.prototype, "updateProduct", null);
    FoodController = __decorate([
        (0, decorators_1.controller)('/food')
    ], FoodController);
    return FoodController;
}());
//# sourceMappingURL=FoodController.js.map