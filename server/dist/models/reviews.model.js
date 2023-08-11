"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSchema = void 0;
var mongoose_1 = __importStar(require("mongoose"));
exports.ReviewSchema = new mongoose_1.Schema({
    food: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Food',
        required: true,
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    rating: { type: Number, default: 0, required: true },
    create: { type: Date, default: Date.now(), required: true },
    update: { type: Date, default: Date.now(), required: true },
    verified: { type: Boolean, required: true, default: false },
});
var Review = mongoose_1.default.model('Review', exports.ReviewSchema);
exports.default = Review;
// TODO Review controller
//# sourceMappingURL=reviews.model.js.map