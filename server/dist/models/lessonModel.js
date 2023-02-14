"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LessonScheme = new mongoose_1.default.Schema({
    // Gio bat dau khoa hoc
    timeStart: {
        type: String,
        default: "",
        trim: true
    },
    // Gio ket thuc khoa hoc
    timeEnd: {
        type: String,
        default: "",
        trim: true
    },
    // Mo ta buoi hoc
    desc: {
        type: String,
        default: "",
        trim: true
    },
    // Mon hoc
    course: {
        ref: 'course',
        type: mongoose_1.default.Schema.Types.ObjectId
    },
    // Thu
    weekday: {
        type: String,
        trim: true,
        default: 'Thứ 2',
    },
    teacher: {
        ref: "user",
        type: mongoose_1.default.Types.ObjectId
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('lesson', LessonScheme);
