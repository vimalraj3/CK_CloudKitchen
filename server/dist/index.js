"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var db_1 = require("./database/db");
var passport_1 = __importDefault(require("passport"));
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var process_1 = require("process");
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var ErrorHandler_1 = require("./utils/ErrorHandler");
var AppRouter_1 = require("./AppRouter");
require("./middleware/passport.middleware");
require("./controllers/LoginController");
require("./controllers/FoodController");
require("./controllers/RootController");
require("./controllers/RestaurantController");
require("./controllers/OrderController");
require("./controllers/CartController");
require("./controllers/ReviewController");
// const currentDir = process.cwd()
// if (currentDir.endsWith('server')) {
//   dotenv.config({ path: path.resolve(currentDir, '/src/.env') })
// } else {
//   dotenv.config({ path: path.resolve(currentDir, './server/dist/.env') })
// }
// dotenv.config()
var currentDir = process.cwd();
if (currentDir.endsWith('server')) {
    dotenv_1.default.config({ path: path_1.default.resolve(currentDir, './src/.env') });
}
else {
    dotenv_1.default.config({ path: path_1.default.resolve(currentDir, './server/dist/.env') });
}
// console.log(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.SER_URL
// )
var app = (0, express_1.default)();
var corsOption = {
    origin: process_1.env.CLI_URL,
    credentials: true,
};
var SECRET = process.env.COOKIE_SECRET;
var DB_URL = process.env.DB_URL;
var cookieOpt = {
    maxAge: 3 * 24 * 60 * 60,
    sameSite: 'strict',
    secure: false,
};
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
    cookieOpt.sameSite = 'none';
    cookieOpt.secure = true;
}
var sess = {
    resave: false,
    saveUninitialized: false,
    secret: SECRET,
    store: new connect_mongo_1.default({
        mongoUrl: DB_URL,
        ttl: 3 * 24 * 60 * 60, // 3 days
    }),
    cookie: cookieOpt,
};
app.use(body_parser_1.default.json());
app.use((0, express_session_1.default)(sess));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((0, cors_1.default)(corsOption));
app.get('/api/auth/google', function (req, res, next) {
    console.log('Api get re');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
}, passport_1.default.authenticate('google', { scope: ['email', 'profile'] }));
app.get('/api/auth/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: "".concat(process_1.env.SER_URL, "/login"),
}), function (req, res) {
    res.redirect("".concat(process_1.env.SER_URL, "/"));
});
app.use('/api/', AppRouter_1.AppRouter.getInstance());
app.use(ErrorHandler_1.ErrorHandler);
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/dist')));
app.get('*', function (req, res) {
    return res.sendFile(path_1.default.join(__dirname, '../../client/dist/index.html'));
});
process.on('uncaughtException', function (err) {
    console.error('Uncaught Exception:', err.stack);
    process.exit(1);
});
process.on('unhandledRejection', function (reason, promise) {
    console.error('Unhandled Rejection:', reason);
    process.exit(1);
});
(0, db_1.connect)(DB_URL).then(function () {
    app.listen(process_1.env.PORT, function () {
        console.log("Server running at http://localhost:".concat(process_1.env.PORT));
    });
});
//# sourceMappingURL=index.js.map