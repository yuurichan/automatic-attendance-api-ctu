"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Router
const authRouters_1 = __importDefault(require("./authRouters"));
const userRouters_1 = __importDefault(require("./userRouters"));
const courseRouter_1 = __importDefault(require("./courseRouter"));
const studentRouters_1 = __importDefault(require("./studentRouters"));
const lessonRouters_1 = __importDefault(require("./lessonRouters"));
const rollCallSessionRouters_1 = __importDefault(require("./rollCallSessionRouters"));
const attendanceDetailRoters_1 = __importDefault(require("./attendanceDetailRoters"));
const faceRouters_1 = __importDefault(require("./faceRouters"));
const routers = {
    authRouter: authRouters_1.default,
    userRouter: userRouters_1.default,
    courseRouter: courseRouter_1.default,
    studentRouter: studentRouters_1.default,
    lessonRouter: lessonRouters_1.default,
    rollCallSession: rollCallSessionRouters_1.default,
    attendanceDetail: attendanceDetailRoters_1.default,
    faceRouter: faceRouters_1.default
};
exports.default = routers;
