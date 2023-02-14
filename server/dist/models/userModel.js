"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userScheme = new mongoose_1.default.Schema({
    account: {
        type: String,
        required: [true, "Please add your account"],
        trim: true,
        maxlength: [50, "Your account is up to 50 chars long."],
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    name: {
        type: String,
        required: true,
        maxlength: [50, "Your name is up to 50 chars long."],
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/dxnfxl89q/image/upload/v1639402088/samples/user_baooau.png",
    },
    role: {
        type: String,
        default: "teacher", // admin || teacher
    },
    confirm: {
        type: Boolean,
        default: false, // Not confirm
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("user", userScheme);
