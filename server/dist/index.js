"use strict";
// import { createRequire } from 'module'
// const require = createRequire(import.meta.url)
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const routers_1 = __importDefault(require("./routers"));
//import { connectDB } from "./config/dbConn";
const PORT = process.env.PORT || 5000;
// Connect to mongoDB
//connectDB();
require("./config/Database");
// middlewares
// built-in middleware to handle urlencoded data
app.use(express_1.default.urlencoded({ extended: false }));
// built-in middleware for json
app.use(express_1.default.json());
// middleware for cookies
app.use((0, cookie_parser_1.default)());
// cors
app.use((0, cors_1.default)());
// middleware for output colors
app.use((0, morgan_1.default)("dev"));
// Routers
app.use("/api", routers_1.default.authRouter);
app.use("/api", routers_1.default.userRouter);
app.use("/api", routers_1.default.courseRouter);
app.use("/api", routers_1.default.studentRouter);
app.use("/api", routers_1.default.lessonRouter);
app.use("/api", routers_1.default.rollCallSession);
app.use("/api", routers_1.default.attendanceDetail);
app.use("/api", routers_1.default.faceRouter);
// select all; returns 404.html if it can't find anything from the above mentioned
// technically this would return a succeess 200
// app.use('/') đa phần dùng cho middleware, ko chấp nhận regex
// app.all('*') nhận regex và áp dụng cho mọi http methods (get, post, put, delete), dùng cho routing
app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path_1.default.join(__dirname, 'views', '404.html')); // so we change 200 to 404
    }
    else if (req.accepts('json')) {
        res.json({ error: "404 Not Found" }); // so we change 200 to 404
    }
    else {
        res.type('txt').send("404 Not Found");
    }
});
// Mọi thứ nếu đi tới được mức này thì chỉ có return lỗi
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB');
    // IS always put at the end of server.js file
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
// App.listen for requests is only going to work ONLY IF we've successfully connected to
// the database
//console.log('test');
