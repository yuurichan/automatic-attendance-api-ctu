"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const auth_1 = require("../middlewares/auth");
router.put("/confirm/:id", auth_1.auth, auth_1.authAdmin, userControllers_1.default.confirmAccount);
router.get('/teachers', auth_1.auth, auth_1.authAdmin, userControllers_1.default.getTeachers);
router.put("/update_user", auth_1.auth, userControllers_1.default.updateUser);
router.put('/reset_password', auth_1.auth, userControllers_1.default.resetPassword);
exports.default = router;
