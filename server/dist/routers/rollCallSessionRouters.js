"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = require("../middlewares/auth");
const rollCallSessionControllers_1 = __importDefault(require("../controllers/rollCallSessionControllers"));
router.post('/roll_call_session', auth_1.auth, rollCallSessionControllers_1.default.createRollCallSession);
router.get('/roll_call_session/:id', auth_1.auth, rollCallSessionControllers_1.default.getRollCallSessionDetail);
router.get('/roll_call_session_user/:id', auth_1.auth, rollCallSessionControllers_1.default.getRollCallSessionUser);
router.put('/roll_call_session/:id', auth_1.auth, rollCallSessionControllers_1.default.updateRollCallSession);
exports.default = router;
