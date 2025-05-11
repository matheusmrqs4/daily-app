import { Router } from "express";
import { registerUser, loginUser, getUserProfile, logoutUser } from "../controllers/Authentication/userController";
import { authMiddleware } from '../middlewares/authMiddleware'

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authMiddleware, logoutUser);
router.get('/profile', authMiddleware, getUserProfile);

export default router;