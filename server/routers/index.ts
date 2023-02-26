// Router
import authRouter from "./authRouters";
import userRouter from './userRouters';
import courseRouter from './courseRouter'
import studentRouter from './studentRouters'
import lessonRouter from './lessonRouters'
import rollCallSession from './rollCallSessionRouters'
import attendanceDetail  from './attendanceDetailRoters'
import faceRouter from './faceRouters'
import wakeUpRouter from './wakeUpCallRouters'


const routers = {
    authRouter,
    userRouter,
    courseRouter,
    studentRouter,
    lessonRouter,
    rollCallSession,
    attendanceDetail,
    faceRouter,
    wakeUpRouter
};
export default routers;
