"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var RestaurantSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantName: { type: String, required: true },
    restaurantDescription: { type: String, required: true },
    restaurantImage: { type: [String], required: true },
    restaurantAddress: { type: String, required: true },
    restaurantCity: { type: String, required: true },
    restaurantRegion: { type: String, required: true },
    restaurantState: { type: String, required: true },
    restaurantZip: { type: String, required: true },
    restaurantPhone: { type: String, required: true },
    restaurantHours: {
        open: { type: Date, required: true },
        close: { type: Date, required: true },
    },
    foods: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Food',
            required: true,
        },
    ],
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    verified: { type: Boolean, default: false, required: true },
    verifyToken: { type: String, required: false },
    orders: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Order' }],
    reviews: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Review' }],
    priceRange: { type: Number, default: 0 },
    totalNumberOfRating: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    rating: { type: Number, required: true, default: 0 },
});
// RestaurantSchema.pre('save', function (next) {
//   const restaurant = this as HydratedDocument<IRestaurant>
//   if (restaurant.rating && restaurant.totalNumberOfRating) {
//     restaurant.averageRating =
//       restaurant.rating / restaurant.totalNumberOfRating
//   }
//   next()
// })
/**
 * Restaurant model for the restaurant schema
 */
var Restaurant = mongoose_1.default.model('Restaurant', RestaurantSchema);
exports.default = Restaurant;
//# sourceMappingURL=Restaurant.model.js.map