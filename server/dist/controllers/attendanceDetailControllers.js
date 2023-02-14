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
const attendanceDetailModel_1 = __importDefault(require("../models/attendanceDetailModel"));
class AttentdanceControllers {
    updateAttendanceDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { absent, note } = req.body;
                const attendanceDetail = yield attendanceDetailModel_1.default.findByIdAndUpdate(id, {
                    absent, note
                });
                return res.json({ msg: "Cập nhật thành công", attendanceDetail });
            }
            catch (error) {
                return res.status(500).json({ msg: error.message });
            }
        });
    }
}
exports.default = new AttentdanceControllers;
