import { Router } from "express";
import { updateUser, findUser, findAllUsers, deleteUser, dashboard } from "../Controllers/UserController.js";
import VerifyToken from '../Helper/VerifyToken.js';

const router = Router();

router.get("/findall", findAllUsers.controller);
router.get("/dashboard",VerifyToken,dashboard.controller);

router.get("/:id", findUser.controller);
router.put("/:id", VerifyToken, updateUser.controller);
router.delete("/:id", VerifyToken, deleteUser.validator, deleteUser.controller);

export default router;