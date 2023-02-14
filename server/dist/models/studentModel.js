"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const StudentScheme = new mongoose_1.default.Schema({
    // Ho ten sinh vien
    name: {
        type: String,
        trim: true,
        maxlength: 50
    },
    // Ma so sinh vien
    studentCode: {
        type: String,
        trim: true,
        maxlength: 50,
        // unique: true, // Duy nhat
    },
    // Gioi tinh
    gender: {
        type: String,
        default: "male", // 1: male, 2:female
    },
    phone: {
        type: String
    },
    course: {
        type: mongoose_1.default.Types.ObjectId,
        ref: "course"
    },
    avatar: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('student', StudentScheme);
