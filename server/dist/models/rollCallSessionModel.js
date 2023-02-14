"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RollCallSessionScheme = new mongoose_1.default.Schema({
    // Chi tiet diem danh
    attendanceDetails: [
        {
            ref: "attendaceDetail",
            type: mongoose_1.default.Types.ObjectId
        },
    ],
    // Buoi hoc
    lesson: {
        ref: "lesson",
        type: mongoose_1.default.Types.ObjectId
    },
    // Giao vien diem danh
    teacher: {
        ref: "user",
        type: mongoose_1.default.Types.ObjectId
    },
    // Nhan xet ve buoi hoc
    comment: {
        type: String,
        default: "",
        trim: true,
        maxlength: [500, "Tên nhận xét dài nhất 500 ký tự"],
    },
    end: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        default: Date().toString()
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('rollCallSession', RollCallSessionScheme);
