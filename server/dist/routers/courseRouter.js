"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middlewares/auth");
const courseControllers_1 = __importDefault(require("../controllers/courseControllers"));
const router = express_1.default.Router();
router.post('/create_course', auth_1.auth, courseControllers_1.default.createCourse);
router.get('/get_courses', auth_1.auth, courseControllers_1.default.getCourses);
router.get('/get_courses_student_guest', courseControllers_1.default.getCourses_guest);
router.delete('/course/:id', auth_1.auth, courseControllers_1.default.deleteCourse);
router.get('/course/:id', courseControllers_1.default.getcourseDetail);
router.post('/add_studens/:id', auth_1.auth, courseControllers_1.default.addManyStudents);
router.post('/add_student/:id', auth_1.auth, courseControllers_1.default.addOneStudent);
router.put('/update_course/:id', auth_1.auth, courseControllers_1.default.updateCourse);
router.get('/user_course/:id', auth_1.auth, courseControllers_1.default.getUserCourse);
exports.default = router;
