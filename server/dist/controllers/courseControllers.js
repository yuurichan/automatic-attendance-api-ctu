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
const courseModel_1 = __importDefault(require("../models/courseModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const lessonModel_1 = __importDefault(require("../models/lessonModel"));
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    paginating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 4;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this.query;
    }
}
class CourseController {
    createCourse(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, credit, yearStart, yearEnd, courseCode, semester, description, students } = req.body;
                // Tao mon hoc moi
                const newCourse = new courseModel_1.default({
                    name, semester, credit, yearStart, yearEnd, courseCode, description,
                    teacher: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id
                });
                // Luu vao data base
                yield newCourse.save();
                const studentsArrayObject = students.map((student) => {
                    return {
                        name: student.name,
                        studentCode: student.studentCode,
                        gender: student.gender,
                        course: newCourse._id,
                        avatar: student.gender === 'male' ? "https://res.cloudinary.com/dxnfxl89q/image/upload/v1648222975/nienluannganh/student-male-avatar_oywxdt.png" : "https://res.cloudinary.com/dxnfxl89q/image/upload/v1648222975/nienluannganh/student-female-avatar_zyezln.png"
                    };
                });
                const studentArray = yield studentModel_1.default.insertMany(studentsArrayObject);
                yield courseModel_1.default.findByIdAndUpdate(newCourse._id, {
                    students: studentArray.map(student => student._id)
                }, { new: true });
                // Them mon hoc vao model cua user
                yield userModel_1.default.findOneAndUpdate({ _id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id }, {
                    $push: { courses: newCourse._id }
                }, {
                    new: true
                });
                return res.json({
                    msg: "Tạo khoá học thành công", newCourse: Object.assign({ teacher: req.user }, newCourse._doc)
                });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    getCourses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield courseModel_1.default.find({}).sort("-createdAt")
                    .populate("teacher").populate("students");
                return res.json({ courses, length: courses.length });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    // Only allows guests to grab the id list of the courses
    // does not include other infos like teachers, students, course names, etc.
    getCourses_guest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const courses = yield courseModel_1.default.find({}, { projection: { _id: 1 } }).sort("-createdAt");
                return res.json({ courses });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    getcourseDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const course = yield courseModel_1.default.findById(id).populate("teacher", ["name", "email", "avatar", "role", 'account']).populate("students");
                if (!course)
                    return res.status(404).json({ msg: "Không tìm thấy khoá học" });
                return res.json({ course });
            }
            catch (error) {
                if (error.valueType === "string")
                    return res.status(500).json({ msg: "ID buổi học không hợp lệ" });
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    deleteCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let course = yield courseModel_1.default.findById(id);
                if (!course)
                    return res.status(404).json({ msg: "Không tìm thấy môn học" });
                const lesson = yield lessonModel_1.default.find({ course: course._id });
                if (lesson.length !== 0) {
                    return res.status(400).json({ msg: "Hãy xoá các buổi học liên quan!" });
                }
                const arrayId = course.students.map((student) => {
                    return `${new mongoose_1.default.Types.ObjectId(student._id)}`;
                });
                // Xoa cac sinh vien co trong lop hoc
                yield studentModel_1.default.deleteMany({
                    _id: {
                        $in: arrayId
                    }
                });
                yield courseModel_1.default.findByIdAndDelete(id);
                return res.json({ msg: "Xoá môn học thành công" });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    updateCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, credit, yearStart, yearEnd, courseCode, semester, description, students } = req.body;
                let course = yield courseModel_1.default.findById(id);
                if (!course)
                    return res.status(404).json({ msg: "Không tìm thấy môn học" });
                const studentsArrayObject = students.map((student) => {
                    return {
                        name: student.name,
                        studentCode: student.studentCode,
                        gender: student.gender,
                        course: id,
                        avatar: student.gender === 'male' ? "https://res.cloudinary.com/dxnfxl89q/image/upload/v1648222975/nienluannganh/student-male-avatar_oywxdt.png" : "https://res.cloudinary.com/dxnfxl89q/image/upload/v1648222975/nienluannganh/student-female-avatar_zyezln.png"
                    };
                });
                const studentArray = yield studentModel_1.default.insertMany(studentsArrayObject);
                course = yield courseModel_1.default.findByIdAndUpdate(id, {
                    name, semester, credit, yearStart, yearEnd, courseCode, description, students: course.students.concat(studentArray.map(student => student._id))
                }, { new: true }).populate(['students']);
                return res.json({ msg: "Cập nhật môn học thành công", course: Object.assign({}, course === null || course === void 0 ? void 0 : course._doc), studentArray });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    getUserCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const queryString = req.query;
                const query = new APIfeatures(courseModel_1.default.find({ teacher: id }), queryString).paginating();
                const courses = yield query.sort("-createdAt").populate("teacher");
                const length = yield courseModel_1.default.find({ teacher: id }).countDocuments();
                return res.json({
                    msg: "Lấy danh sách môn học thành công",
                    courses,
                    result: courses.length,
                    total: length
                });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    addOneStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { student } = req.body;
                const course = yield courseModel_1.default.findById(id);
                if (!course) {
                    return res.status(404).json({ msg: "Không tìm thấy môn học" });
                }
                let newStudent = new studentModel_1.default({
                    student
                });
                newStudent = yield newStudent.save();
                yield courseModel_1.default.findByIdAndUpdate(id, {
                    students: course.students.push(newStudent)
                });
                return res.json({ msg: "Thêm sinh viên thành công", newStudent });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
    addManyStudents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { students } = req.body;
                const course = yield courseModel_1.default.findById(id);
                if (!course) {
                    return res.status(404).json({ msg: "Không tìm thấy môn học" });
                }
                const studentsArrayObject = students.map((student) => {
                    return {
                        name: student.name,
                        studentCode: student.studentCode,
                    };
                });
                const studentArray = yield studentModel_1.default.insertMany(studentsArrayObject);
                yield courseModel_1.default.findByIdAndUpdate(id, {
                    students: course.students.concat(studentArray)
                });
                return res.json({ msg: "Thêm sinh viên thành công", studentArray });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
}
exports.default = new CourseController;
