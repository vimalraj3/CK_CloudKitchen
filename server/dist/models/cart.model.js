"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var CartSchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    foods: [
        {
            food: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Food',
                required: true,
            },
            quantity: { type: Number, default: 1, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
});
var Cart = mongoose_1.default.model('Cart', CartSchema);
exports.default = Cart;
//# sourceMappingURL=cart.model.js.map