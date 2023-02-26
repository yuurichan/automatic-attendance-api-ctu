import express from 'express'
import { wake_up_call } from '../controllers/wakeUpCallControllers';

import { auth } from '../middlewares/auth'

const router = express.Router();

router.get('/wake_up_call', wake_up_call);
router.get('/wake_up_call_auth', auth, wake_up_call);

export default router;