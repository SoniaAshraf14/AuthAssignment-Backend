import express from "express";
import { signupUser, updateUsername, getUserById,getAllUsers, toggleUserStatus } from "../controller/userController.js";
import { validateSignup } from "../middleware/validateSignup.js";
import { uploadFields } from "../middleware/upload.js";
import {updateUserPhoto} from '../controller/userController.js'
import { isAuthenticated, isAdmin } from "../middleware/isAdmin.js";
const router = express.Router();

router.post("/signup", uploadFields, validateSignup, signupUser);
router.patch("/update-username/:userId", updateUsername);
router.get("/:userId", getUserById);
router.patch("/update-photo/:userId", uploadFields, updateUserPhoto);

router.get("/admin/users", isAuthenticated, isAdmin, getAllUsers);
router.put("/admin/users/:id/status", isAuthenticated, isAdmin, toggleUserStatus);
export default router;
