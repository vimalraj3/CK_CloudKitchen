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
var path_1 = __importDefault(require("path"));
var decorators_1 = require("./decorators");
var dotenv_1 = __importDefault(require("dotenv"));
var product_model_1 = __importDefault(require("../models/product.model"));
var multer_1 = __importDefault(require("multer"));
var Cloudinary_1 = require("../utils/Cloudinary");
var bodyValidator_1 = require("./decorators/bodyValidator");
var AppError_1 = require("../utils/AppError");
dotenv_1.default.config({ path: path_1.default.resolve(process.cwd(), "./src/.env") });
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
    },
});
var maxSize = 20 * 1000 * 1000;
var upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: maxSize,
    },
    fileFilter: function (req, file, cb) {
        console.log(file.mimetype);
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
        var extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: File upload only supports the following filetypes: " + filetypes));
    },
});
// TODO  testing Products| delete , update Products | multithearding
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    // ? api->/auth/login | method->post | find user by email -> check password match -> if user send user, not user send error message
    ProductController.prototype.getProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_model_1.default.find({})];
                    case 1:
                        products = _a.sent();
                        if (!products) {
                            res.status(404).json({
                                success: true,
                                message: "Unable to get products",
                            });
                            return [2 /*return*/];
                        }
                        res.status(404).json({
                            success: true,
                            products: products,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.addProduct = function (req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, title, state, price, description, open, close, user, imgPath;
            var _this = this;
            return __generator(this, function (_c) {
                _b = req.body, title = _b.title, state = _b.state, price = _b.price, description = _b.description, open = _b.open, close = _b.close;
                user = "";
                console.log(req.body);
                imgPath = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path;
                console.log(imgPath, "IMg dfurl");
                if (!imgPath) {
                    res.status(404).json({
                        success: false,
                        message: "Invalid input",
                    });
                    return [2 /*return*/];
                }
                (0, Cloudinary_1.uploadAndResizeImage)(imgPath)
                    .then(function (image) { return __awaiter(_this, void 0, void 0, function () {
                    var product;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, product_model_1.default.create({
                                    user: user,
                                    storeName: req.user.storeName,
                                    title: title,
                                    state: state,
                                    price: price,
                                    description: description,
                                    time: { open: open, close: close },
                                    image: image,
                                })];
                            case 1:
                                product = _a.sent();
                                res.status(200).json({
                                    success: true,
                                    product: product,
                                });
                                return [2 /*return*/];
                        }
                    });
                }); })
                    .catch(function (err) {
                    res.status(200).json({ success: false, message: err.message });
                });
                return [2 /*return*/];
            });
        });
    };
    ProductController.prototype.getProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_model_1.default.findById(req.params.id)];
                    case 1:
                        product = _a.sent();
                        console.log(req.params.id);
                        if (!product) {
                            next(new AppError_1.AppError("Unable to find the product", 500));
                            return [2 /*return*/];
                        }
                        res.status(200).json({
                            success: true,
                            product: product,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.deleteProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id;
            return __generator(this, function (_a) {
                id = req.params.id;
                product_model_1.default.findByIdAndDelete(id, function (err, product) {
                    if (!err) {
                        res.status(200).json({
                            success: true,
                            message: "Product ".concat(product === null || product === void 0 ? void 0 : product.title, " was deleted successfully"),
                        });
                        return;
                    }
                    res.status(500).json({
                        success: false,
                        message: "something went wrong",
                    });
                    return;
                });
                return [2 /*return*/];
            });
        });
    };
    ProductController.prototype.updateProduct = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, update;
            return __generator(this, function (_a) {
                id = req.params.id;
                update = req.body.update;
                product_model_1.default.findByIdAndUpdate(id, update, function (err, product) {
                    if (!err) {
                        res.status(200).json({
                            success: true,
                            message: "Product ".concat(product === null || product === void 0 ? void 0 : product.title, " was updated successfully"),
                            product: product,
                        });
                        return;
                    }
                    res.status(500).json({
                        success: false,
                        message: "something went wrong",
                    });
                    return;
                });
                return [2 /*return*/];
            });
        });
    };
    __decorate([
        (0, decorators_1.get)("/getallproducts"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], ProductController.prototype, "getProducts", null);
    __decorate([
        (0, decorators_1.post)("/addproduct"),
        (0, decorators_1.use)(upload.single("image"))
        // @use(ProductController.upload.single("image"))
        // @use(isAuth)
        // @use(FormdataToJson)
        ,
        (0, bodyValidator_1.bodyValidator)("state", "price", "description", "open", "close", "title"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object]),
        __metadata("design:returntype", Promise)
    ], ProductController.prototype, "addProduct", null);
    __decorate([
        (0, decorators_1.get)("/product/:id"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ProductController.prototype, "getProduct", null);
    __decorate([
        (0, decorators_1.del)("/product/:id"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ProductController.prototype, "deleteProduct", null);
    __decorate([
        (0, decorators_1.patch)("/product/:id"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object, Object, Function]),
        __metadata("design:returntype", Promise)
    ], ProductController.prototype, "updateProduct", null);
    ProductController = __decorate([
        (0, decorators_1.controller)("/products")
    ], ProductController);
    return ProductController;
}());
