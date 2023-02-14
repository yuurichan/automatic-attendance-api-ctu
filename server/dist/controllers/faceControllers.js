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
exports.getDescriptors = exports.saveLabledFaceDescriptors_guest = exports.saveLabledFaceDescriptors = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const saveLabledFaceDescriptors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        // Luu file json
        const pathFile = `${__dirname}/../descriptors/${data.label}.json`;
        fs_1.default.writeFileSync(pathFile, JSON.stringify(data));
        return res.json({ msg: "Lưu model thành công" });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: error.message });
    }
});
exports.saveLabledFaceDescriptors = saveLabledFaceDescriptors;
const saveLabledFaceDescriptors_guest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        // Luu file json
        const pathFile = `${__dirname}/../descriptors/${data.label}.json`;
        fs_1.default.writeFileSync(pathFile, JSON.stringify(data));
        return res.json({ msg: "Lưu model thành công" });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: error.message });
    }
});
exports.saveLabledFaceDescriptors_guest = saveLabledFaceDescriptors_guest;
const getDescriptors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentCodeList } = req.body;
        const dir = `${__dirname}/../descriptors`;
        const data = yield fs_1.default.readdirSync(dir)
            .filter(filename => {
            var file = path_1.default.basename(filename, path_1.default.extname(filename));
            return file === studentCodeList.find((studentCode) => {
                return studentCode.toLowerCase() === file.toLowerCase();
            });
        })
            .map(name => require(path_1.default.join(dir, name)));
        return res.json({ descriptors: data, msg: "Lấy các descriptors thành công" });
    }
    catch (error) {
        return res.status(500).json({ msg: error.message });
    }
});
exports.getDescriptors = getDescriptors;
