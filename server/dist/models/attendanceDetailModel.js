"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AttendanceDetailScheme = new mongoose_1.default.Schema({
    student: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'student'
    },
    note: {
        type: String,
        trim: true,
        default: ""
    },
    date: {
        type: String,
        default: new Date().toString()
    },
    absent: {
        type: Boolean,
        default: true
    },
    isAttendance: {
        type: Boolean,
        default: false
    },
    rollCallSession: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'rollCallSession'
    }
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('attendaceDetail', AttendanceDetailScheme);
