"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var PaymentSchema = new mongoose_1.default.Schema({
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
    date: { type: Date, default: Date.now(), required: true },
    paid: { type: Boolean, required: true, default: false },
    totalPrice: { type: Number, required: true },
});
var Payment = mongoose_1.default.model('Payment', PaymentSchema);
exports.default = Payment;
//# sourceMappingURL=payment.model.js.map