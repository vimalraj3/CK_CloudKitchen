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
exports.pushReview = void 0;
var reviews_model_1 = __importDefault(require("../models/reviews.model"));
var AppError_1 = require("./AppError");
var food_model_1 = __importDefault(require("../models/food.model"));
var user_model_1 = __importDefault(require("../models/user.model"));
// Function to push a new review into the reviews array
var pushReview = function (reviewData, foodId, next, res) {
    return new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
        var review, totalRating, totalNumberOfRating, foodRating, foodQuery, userquery, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, reviews_model_1.default.findOneAndUpdate({ food: foodId }, { $push: { reviews: reviewData } }, // Push the new review into the reviews array
                        { new: true } // Return the updated document
                        )];
                case 1:
                    review = _a.sent();
                    if (!review) {
                        next(new AppError_1.AppError('Something went worng', 500));
                        return [2 /*return*/];
                    }
                    totalRating = review.reviews.reduce(function (sum, review) { return sum + review.rating; }, 0);
                    totalNumberOfRating = review.reviews.length;
                    foodRating = totalRating / totalNumberOfRating;
                    foodQuery = food_model_1.default.findByIdAndUpdate(foodId, {
                        $push: { reviews: review._id },
                        $inc: { totalNumberOfRating: 1 },
                        $set: { rating: foodRating },
                    }, { new: true }).lean();
                    userquery = user_model_1.default.findByIdAndUpdate(reviewData.user, { $push: { reviews: review._id } } // Push the new review into the reviews array
                    ).lean();
                    return [4 /*yield*/, Promise.all([userquery, foodQuery])];
                case 2:
                    _a.sent();
                    res.status(200).json({
                        success: true,
                        message: 'Thank you for your review',
                    });
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Error adding review:', error_1);
                    next(new AppError_1.AppError('Something went wrong', 500));
                    reject(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); });
};
exports.pushReview = pushReview;
//# sourceMappingURL=pushReview.js.map