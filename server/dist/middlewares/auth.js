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
exports.authAdmin = exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("Authorization");
        if (!token)
            return res.status(400).json({ msg: "Ivalid Authentication." });
        const decode = jsonwebtoken_1.default.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
        if (!decode)
            return res.status(400).json({ msg: "Ivalid Authentication." });
        const user = yield userModel_1.default.findById(decode.id);
        if (!user)
            return res.status(400).json({ msg: "This account is not exist." });
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});
exports.auth = auth;
const authAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user) {
            return res.status(400).json({ msg: "Ivalid Authentication." });
        }
        // Check role
        if (req.user.role !== "admin")
            return res.status(400).json({ msg: "You are not admin." });
        next();
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});
exports.authAdmin = authAdmin;
