"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authControllers_1 = __importDefault(require("../controllers/authControllers"));
router.post("/register", authControllers_1.default.register);
router.post("/login", authControllers_1.default.login);
router.get("/refresh_token", authControllers_1.default.refreshToken);
router.get("/logout", authControllers_1.default.logout);
exports.default = router;
