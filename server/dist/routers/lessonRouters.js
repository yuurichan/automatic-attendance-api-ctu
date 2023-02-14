"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middlewares/auth");
const LessonControllers_1 = __importDefault(require("../controllers/LessonControllers"));
router.post('/lesson', auth_1.auth, LessonControllers_1.default.createLesson);
router.get('/lesson', auth_1.auth, LessonControllers_1.default.getLessonUser);
router.get('/lesson/:id', auth_1.auth, LessonControllers_1.default.getLesson);
router.put('/lesson/:id', auth_1.auth, LessonControllers_1.default.updateLesson);
router.delete('/lesson/:id', auth_1.auth, LessonControllers_1.default.deleteLesson);
exports.default = router;
