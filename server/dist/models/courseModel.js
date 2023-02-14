"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CourseScheme = new mongoose_1.default.Schema({
    // Ten mon hoc
    name: {
        type: String,
        default: "",
        required: true,
        minlength: [5, "Tên môn học có ít nhất 5 ký tự"],
        maxlength: [200, "Tên môn học dài nhất 200 ký tự"],
        trim: true
    },
    // Giao vien chu nhiem
    teacher: { type: mongoose_1.default.Types.ObjectId, ref: 'user' },
    // Hoc ki gom: 1, 2, 3,...
    semester: {
        type: String,
    },
    // Ngay bat dau
    yearStart: {
        type: String
    },
    // Ngay ket thuc
    yearEnd: {
        type: String
    },
    // So tin chi
    credit: {
        type: Number,
        require: true
    },
    // Ma hoc phan
    courseCode: {
        type: String,
        default: '',
    },
    students: [
        {
            ref: "student",
            type: mongoose_1.default.Types.ObjectId
        }
    ],
    // Mo ta mon hoc
    description: {
        type: String,
        default: '',
        maxlength: [500, "Mô tả môn học dài nhất 500 ký tự"],
        trim: true
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('course', CourseScheme);
