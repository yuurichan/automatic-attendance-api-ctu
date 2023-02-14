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
const rollCallSessionModel_1 = __importDefault(require("../models/rollCallSessionModel"));
const attendanceDetailModel_1 = __importDefault(require("../models/attendanceDetailModel"));
class RollCallSessionControllers {
    createRollCallSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { lesson, comment, newDate } = req.body;
                const studentsArrayObject = lesson.course.students.map((student) => {
                    return {
                        //date: new Date().toString(),
                        date: newDate,
                        note: "",
                        student: student._id
                    };
                });
                const newAttendanceDetail = yield attendanceDetailModel_1.default.insertMany(studentsArrayObject);
                const newAttendanceDetailId = newAttendanceDetail.map(attendanceDetail => attendanceDetail._id);
                let newRollCallSession = new rollCallSessionModel_1.default({
                    lesson,
                    comment,
                    createdAt: newDate,
                    course: lesson.course,
                    teacher: req.user,
                    attendanceDetails: newAttendanceDetailId
                });
                newRollCallSession = yield newRollCallSession.save();
                // // Cap nhat lai chi tiet diem danh
                yield attendanceDetailModel_1.default.updateMany({ _id: { $in: newAttendanceDetailId } }, {
                    $set: {
                        rollCallSession: new mongoose_1.default.Types.ObjectId(newRollCallSession._id)
                    }
                });
                return res.json({
                    msg: "Tạo buổi điểm danh thành công",
                    newRollCallSession: newRollCallSession._doc
                });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    getRollCallSessionDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const rollCallSession = yield rollCallSessionModel_1.default.findById(id)
                    .populate({
                    path: 'attendanceDetails',
                    populate: [
                        {
                            path: "student"
                        }
                    ]
                })
                    .populate({
                    path: 'lesson',
                    populate: {
                        path: 'course',
                    }
                })
                    .populate("teacher", '-password');
                return res.json({ rollCallSession });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    getRollCallSessionUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const rollCallSessions = yield rollCallSessionModel_1.default.find({ teacher: new mongoose_1.default.Types.ObjectId(id) })
                    .populate({
                    path: 'attendanceDetails',
                    populate: [
                        {
                            path: "student"
                        }
                    ]
                })
                    .populate({
                    path: 'lesson',
                    populate: {
                        path: 'course',
                    }
                })
                    .populate("teacher", '-password').sort('-createdAt');
                return res.json({ rollCallSessions });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    updateRollCallSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { end, attendanceDetails, lesson, teacher, comment } = req.body;
                const rollCallSession = yield rollCallSessionModel_1.default.findByIdAndUpdate(id, {
                    end, attendanceDetails, lesson, teacher, comment
                }).populate({
                    path: 'attendanceDetails',
                    populate: [
                        {
                            path: "student"
                        }
                    ]
                })
                    .populate({
                    path: 'lesson',
                    populate: {
                        path: 'course',
                    }
                })
                    .populate("teacher", '-password');
                return res.json({ msg: "Chỉnh sửa thành công", rollCallSession: rollCallSession._doc });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
}
exports.default = new RollCallSessionControllers();
