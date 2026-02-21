import e from "express";
import { register,login, getProfile } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authentication.js";

const router = e.Router();

router.post('/register',register);
router.post('/login',login);
router.post('/profile',authenticate,getProfile);



export default router;