import { Router } from "express";
import { register, login, sendEmailVerification, verifyEmail, sendResetEmail, resetTokenVerify, resetPassword } from "../Controllers/AuthController.js";
import VerifyToken from '../Helper/VerifyToken.js';

const router = Router();

// router.get("/unverified/:id",unVerified.controller);

// !register
router.post("/register", register.validator, register.controller);

// !login
router.post("/login", login.validator, login.controller);

// !send emil verification link
router.get("/send_verification_email", VerifyToken, sendEmailVerification.controller);

// !when open email verification link
router.get("/verify_email", verifyEmail.controller);

// !send password rest link
router.post("/send_reset_email", sendResetEmail.validator, sendResetEmail.controller);

// !when open reset password link
router.get("/reset_password", resetTokenVerify.controller);

// !when enter new password and click submit
router.put("/reset_password", resetPassword.validator, resetPassword.controller);

export default router;