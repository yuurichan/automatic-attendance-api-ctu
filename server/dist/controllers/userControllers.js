"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserController {
    confirmAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield userModel_1.default.findById(id);
                if (!user)
                    return res.status(400).json({ msg: "Người dùng không tồn tại." });
                yield userModel_1.default.findByIdAndUpdate(user._id, {
                    confirm: true
                });
                return res.json({ msg: "Cập nhập thành công." });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    getTeachers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teachers = yield userModel_1.default.find({
                    role: "teacher",
                    confirm: false
                });
                return res.json({ teachers });
            }
            catch (err) {
                return res.status(500).json({ msg: err.message });
            }
        });
    }
    updateUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user)
                return res.status(400).json({ msg: "Xác thực không hợp lệ" });
            try {
                const { name, avatar } = req.body;
                yield userModel_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a._id, { name, avatar });
                return res.json({ msg: "Cập nhật thông tin thành công" });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.user)
                return res.status(400).json({ msg: "Xác thực không hợp lệ" });
            try {
                const { password } = req.body;
                const passwordHash = yield bcrypt_1.default.hash(password, 12);
                yield userModel_1.default.findByIdAndUpdate({ _id: req.user._id }, {
                    password: passwordHash
                });
                return res.json({ msg: "Cập nhật mật khẩu thành công." });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
}
exports.default = new UserController;
