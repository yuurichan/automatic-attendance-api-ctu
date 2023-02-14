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
const mongoose_1 = __importDefault(require("mongoose"));
const lessonModel_1 = __importDefault(require("../models/lessonModel"));
const rollCallSessionModel_1 = __importDefault(require("../models/rollCallSessionModel"));
const attendanceDetailModel_1 = __importDefault(require("../models/attendanceDetailModel"));
const rollCallSessionModel_2 = __importDefault(require("../models/rollCallSessionModel"));
class LessonController {
    getLessonUser(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const lessons = yield lessonModel_1.default.find({ teacher: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }).sort('-createdAt')
                    .populate({
                    path: 'course',
                    populate: {
                        path: 'students'
                    }
                })
                    .populate("teacher", '-password');
                return res.json({
                    lessons
                });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    createLesson(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { timeStart, timeEnd, desc, course_id, weekday } = req.body;
                const newLesson = new lessonModel_1.default({
                    timeStart, timeEnd, desc, course: course_id, weekday,
                    teacher: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id
                });
                yield newLesson.save();
                return res.json({
                    msg: "Tạo buổi học thành công",
                    newLesson: newLesson._doc
                });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    updateLesson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { timeStart, timeEnd, desc, course_id, weekday } = req.body;
                const newLesson = yield lessonModel_1.default.findByIdAndUpdate(id, {
                    timeStart, timeEnd, desc, course: course_id, weekday
                });
                return res.json({
                    msg: "Cập nhật thành công",
                    newLesson: newLesson._doc
                });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    deleteLesson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                // Xoa buoi hoc
                const lesson = yield lessonModel_1.default.findByIdAndDelete(id).populate('course');
                // Xoa cac buoi diem danh lien quan toi buoi hoc
                let rollCallSessions = yield rollCallSessionModel_2.default.find({ lesson: lesson._id });
                yield rollCallSessionModel_2.default.deleteMany({ lesson: lesson._id });
                // Xoa cac chi tiet diem danh
                yield attendanceDetailModel_1.default.deleteMany({
                    rollCallSession: {
                        $in: rollCallSessions.map((item) => item._id)
                    }
                });
                return res.json({
                    msg: "Xóa buổi học thành công"
                });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    getLesson(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const lesson = yield lessonModel_1.default.findById(id)
                    .populate({
                    path: 'course',
                    populate: {
                        path: 'students'
                    }
                })
                    .populate("teacher", '-password');
                const rollCallSessions = yield rollCallSessionModel_1.default.find({
                    lesson: new mongoose_1.default.Types.ObjectId(id)
                })
                    .populate("lesson")
                    .populate([
                    {
                        path: "attendanceDetails",
                        populate: {
                            path: 'student'
                        }
                    }
                ]);
                return res.json({ lesson, rollCallSessions });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
}
exports.default = new LessonController();
