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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken_1 = require("../config/generateToken");
// Controller
class AuthController {
    // Đăng kí
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, account, password } = req.body;
                const user = yield userModel_1.default.findOne({ account });
                if (user)
                    return res.status(409).json({ msg: "Username is already in use." }); // Conflict
                const passwordHasd = yield bcrypt_1.default.hash(password, 12);
                const newUser = new userModel_1.default({
                    name,
                    account,
                    password: passwordHasd,
                });
                yield newUser.save();
                return res.status(201).json({
                    msg: "Đăng kí thành công! Đợi admin duyệt tài khoản của bạn.",
                });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    // Đăng nhập
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { account, password } = req.body;
                const user = yield userModel_1.default.findOne({ account });
                // Find user
                if (!user)
                    return res.status(400).json({ msg: "Tài khoản không tồn tại." });
                // Compare password
                const isMatch = yield bcrypt_1.default.compare(password, user.password);
                if (!isMatch)
                    return res.status(400).json({ msg: "Sai mật khẩu." });
                // Check account is confirm
                if (!user.confirm) {
                    return res.status(401).json({ msg: "Tài khoản chưa được duyệt." });
                }
                const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
                const refresh_token = (0, generateToken_1.generateRefreshToken)({ id: user._id });
                //  SET COOKIE
                res.cookie("refreshToken", refresh_token, {
                    path: "/api/refresh_token",
                    httpOnly: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
                });
                return res.json({
                    msg: "Đăng nhập thành công",
                    user,
                    access_token,
                });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    // Refresh Token -> {User, Access Token}
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = req.cookies.refreshToken;
                if (!refreshToken)
                    return res.status(400).json({ msg: "Please login now." });
                const decode = yield jsonwebtoken_1.default.verify(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`);
                if (!decode)
                    return res.status(400).json({ msg: "Please login now." });
                const user = yield userModel_1.default.findById(decode.id);
                if (!user)
                    return res.status(400).json({ msg: "This account does not exist." });
                const access_token = (0, generateToken_1.generateAccessToken)({ id: user._id });
                return res.json({
                    user,
                    access_token
                });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    // Đăng xuất
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("refreshToken");
                return res.json({ msg: "Đăng xuất thành công." });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
}
exports.default = new AuthController();
