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
var isAuth_1 = require("../middleware/isAuth");
var AppError_1 = require("../utils/AppError");
var user_model_1 = __importDefault(require("../models/user.model"));
var reviews_model_1 = __importDefault(require("../models/reviews.model"));
var food_model_1 = __importDefault(require("../models/food.model"));
// TODO  Search for a food
var ReviewController = /** @class */ (function () {
    function ReviewController() {
    }
    // @post('/:userId/:orderId')
    // @use(isAuth)
    // async addReview(req: Request, res: Response, next: NextFunction) {
    //   try {
    //     const reviews: { message: string; foodId: string; rating: string }[] =
    //       req.body.reviews
    //     // const { message, rating, foodId } = req.body
    //     if (!req.user) {
    //       next(new AppError(`Login to access this resource`, 404))
    //       return
    //     }
    //     // * Create or push review
    //     reviews.map(({ message, rating, foodId }) => {
    //       pushReview(
    //         {
    //           message,
    //           rating: parseInt(rating),
    //           user: req.user?._id!,
    //           verified: true,
    //           create: new Date(),
    //           update: new Date(),
    //         },
    //         foodId,
    //         next,
    //         res
    //       )
    //     })
    //     res.status(200).json({
    //       success: true,
    //       message: 'Thank you for your review',
    //     })
    //   } catch (error) {
    //     next(new AppError(`Something went wrong, try again later`, 500))
    //   }
    // }
    ReviewController.prototype.addAFoodReview = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, message, rating, _b, userId, foodId, existingReview, review, _c, user, food, error_1;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 5, , 6]);
                        _a = req.body, message = _a.message, rating = _a.rating;
                        _b = req.params, userId = _b.userId, foodId = _b.foodId;
                        if (!userId || !foodId) {
                            next(new AppError_1.AppError("Login to access this resource", 404));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, reviews_model_1.default.findOne({
                                user: userId,
                                food: foodId,
                            })];
                    case 1:
                        existingReview = _d.sent();
                        if (existingReview) {
                            next(new AppError_1.AppError('You already reviewed this food', 400));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, reviews_model_1.default.create({
                                message: message,
                                rating: rating,
                                user: userId,
                                food: foodId,
                            })];
                    case 2:
                        review = _d.sent();
                        return [4 /*yield*/, Promise.all([
                                user_model_1.default.findByIdAndUpdate(userId, { $push: { reviews: review._id } }),
                                food_model_1.default.findByIdAndUpdate(foodId, {
                                    $push: { reviews: review._id },
                                    $inc: { totalNumberOfRating: 1 },
                                }, { new: true }).populate('reviews'),
                            ])];
                    case 3:
                        _c = _d.sent(), user = _c[0], food = _c[1];
                        if (!food || !user) {
                            return [2 /*return*/, next(new AppError_1.AppError('Food not found', 404))];
                        }
                        if (!Array.isArray(food.reviews)) {
                            food.reviews = [];
                        }
                        food.totalRating = 0;
                        if (Array.isArray(food.reviews)) {
                            food.totalRating = food.reviews.reduce(function (sum, review) { return sum + review.rating; }, 0);
                        }
                        food.totalNumberOfRating = food.reviews.length;
                        food.rating = food.totalRating / Math.max(food.totalNumberOfRating, 1);
                        return [4 /*yield*/, food.save({ validateBeforeSave: false })];
                    case 4:
                        _d.sent();
                        res.status(200).json({
                            success: true,
                            message: 'Successfully add review',
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _d.sent();
                        console.log(error_1);
                        next(new AppError_1.AppError("Something went wrong, try again later", 500));
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ReviewController.prototype.deleteReview = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var reviewId, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        reviewId = req.params.reviewId;
                        if (!reviewId || !req.user)
                            return [2 /*return*/, next(new AppError_1.AppError('Something went wrong', 500))];
                        return [4 /*yield*/, reviews_model_1.default.findOneAndDelete({
                                _id: reviewId,
                                user: req.user._id,
                            })];
                    case 1:
                        _a.sent();
                        res.status(200).json({
                            success: true,
                            message: 'Successfully deleted the review',
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        next(new AppError_1.AppError('Something went wrong, try again later', 500));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ReviewController.prototype.getReviewsOfFood = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, reviews, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, reviews_model_1.default.findOne({ food: id }).lean()];
                    case 1:
                        reviews = _a.sent();
                        if (!reviews)
                            return [2 /*return*/, next(new AppError_1.AppError('Review not found', 404))];
                        res.status(200).json({
                            success: true,
                            reviews: reviews,
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        next(new AppError_1.AppError("Something went wrong, try again later", 500));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    __decorate([
        (0, decorators_1.post)('/:userId/:foodId'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ReviewController.prototype, "addAFoodReview", null);
    __decorate([
        (0, decorators_1.del)('/:reviewId'),
        (0, decorators_1.use)(isAuth_1.isAuth),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ReviewController.prototype, "deleteReview", null);
    __decorate([
        (0, decorators_1.get)('/:id'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ReviewController.prototype, "getReviewsOfFood", null);
    ReviewController = __decorate([
        (0, decorators_1.controller)('/review')
    ], ReviewController);
    return ReviewController;
}());
//? ==========================================================
//*                 Routes of Order Controllers
//? ==========================================================
/**
 * * post - order/checkout - Create a new order and set paid to it
 */
//# sourceMappingURL=ReviewController.js.map