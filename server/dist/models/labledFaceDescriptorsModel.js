"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const LabledFaceDescriptorScheme = new mongoose_1.default.Schema({
    // Ma so sinh vien
    label: {
        type: String,
        trim: true
    },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('labeldFaceDescriptors', LabledFaceDescriptorScheme);
