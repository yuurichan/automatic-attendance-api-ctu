"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const faceControllers_1 = require("../controllers/faceControllers");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post('/face_api', auth_1.auth, faceControllers_1.saveLabledFaceDescriptors);
router.post('/face_api_guest', faceControllers_1.saveLabledFaceDescriptors_guest);
router.post('/face_api_descriptors', auth_1.auth, faceControllers_1.getDescriptors);
exports.default = router;
