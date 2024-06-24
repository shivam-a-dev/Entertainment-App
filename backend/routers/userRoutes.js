import express from "express";
import { getProfilePic, logOut, login, registerUser, uploadProfilePic } from "../controllers/userController.js";
import multer from "multer";
import { Aunthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.route("/register").post(registerUser);
router.route("/login").post(login)
router.route("/logout").post(logOut)
router.route("/profilePic").post(Aunthenticated ,upload.single("profilePic"), uploadProfilePic).get(Aunthenticated, getProfilePic);
export default router;
