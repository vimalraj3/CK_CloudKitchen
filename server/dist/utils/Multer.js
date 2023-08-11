"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploaderMultiple = exports.uploaderSingle = void 0;
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var whitelist = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
var dirPath = './src/uploads';
var maxSize = 3 * 1024 * 1024;
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        if (!fs_1.default.existsSync(dirPath)) {
            // Create the directory if it doesn't exist
            fs_1.default.mkdirSync(dirPath);
        }
        cb(null, dirPath);
    },
    filename: function (req, file, cb) {
        cb(null, new Date().getTime() + path_1.default.extname(file.originalname));
    },
});
var upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: maxSize,
    },
    fileFilter: function (req, file, cb) {
        if (!whitelist.includes(file.mimetype)) {
            return cb(new Error('file is not allowed'));
        }
        cb(null, true);
    },
});
var uploaderSingle = function (fieldName) { return upload.single(fieldName); };
exports.uploaderSingle = uploaderSingle;
exports.uploaderMultiple = upload.array('images', 5);
//# sourceMappingURL=Multer.js.map