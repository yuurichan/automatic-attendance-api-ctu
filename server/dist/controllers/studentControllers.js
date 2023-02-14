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
const studentModel_1 = __importDefault(require("../models/studentModel"));
const attendanceDetailModel_1 = __importDefault(require("../models/attendanceDetailModel"));
class StudentControlles {
    updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, studentCode, gender, phone } = req.body;
                let student = yield studentModel_1.default.findById(id);
                if (!student)
                    return res.status(500).json({ msg: "Không tìm thấy học sinh" });
                yield studentModel_1.default.findByIdAndUpdate(id, {
                    name, studentCode, gender, phone
                }, { new: true });
                res.json({
                    msg: 'Cập nhật sinh viên thành công',
                    newStudent: student
                });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
    delteStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let student = yield studentModel_1.default.findById(id);
                if (!student)
                    return res.status(500).json({ msg: "Không tìm thấy học sinh" });
                yield studentModel_1.default.findByIdAndDelete(id);
                yield attendanceDetailModel_1.default.deleteMany({
                    student: student._id
                });
                res.json({
                    msg: 'Xóa sinh viên thành công',
                    student: student
                });
            }
            catch (error) {
                return res.status(500).json({ error: error.message });
            }
        });
    }
}
exports.default = new StudentControlles();
