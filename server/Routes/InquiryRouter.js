import { Router } from "express";
import { getInquiry, addInquiry } from "../Controllers/InquiryController.js";
import VerifyToken from "../Helper/VerifyToken.js";

const router = Router();

router.get("/all", getInquiry.controller);

router.post('/add', VerifyToken, addInquiry.validator, addInquiry.controller);

export default router;